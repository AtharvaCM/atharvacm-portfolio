import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  buildPreviewEnableUrl,
  createBlogDraft,
  getBlogSection,
  publishBlogPost,
  readBlogPostSource,
  rewriteBlogPostSection,
  rewriteBlogSectionSource,
  reviewBlogPost,
  suggestInternalLinksForPost,
  updateBlogPostSource,
  validateBlogFiles
} from "../src/lib/blog-authoring";
import { getAllBlogPosts } from "../src/lib/content";

const server = new McpServer({
  name: "atharvacm-portfolio-blog",
  version: "0.1.0"
});

const metadataSuggestionSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()).min(1).max(6),
  slug: z.string()
});

const outlineSchema = z.object({
  workingTitle: z.string(),
  audience: z.string(),
  summary: z.string(),
  sections: z.array(
    z.object({
      heading: z.string(),
      bullets: z.array(z.string()).min(1)
    })
  )
});

const aiReviewSchema = z.object({
  strengths: z.array(z.string()),
  risks: z.array(z.string()),
  edits: z.array(z.string())
});

const rewrittenSectionSchema = z.object({
  body: z.string()
});

const STYLE_GUIDE = `
# Portfolio Blog Workflow

- Write in MDX with the same frontmatter schema used by the site.
- Optimize for concrete engineering decisions, tradeoffs, and practical examples.
- Prefer short excerpts and specific tags over vague category names.
- Drafts should stay hidden until reviewed and intentionally published.
- When updating a post, preserve the slug-to-filename match.
`.trim();

server.registerResource(
  "blog-style-guide",
  "blog://style-guide",
  {
    title: "Portfolio Blog Style Guide",
    description: "Authoring rules and workflow for blog posts in this repository.",
    mimeType: "text/markdown"
  },
  async () => ({
    contents: [
      {
        uri: "blog://style-guide",
        text: STYLE_GUIDE
      }
    ]
  })
);

server.registerPrompt(
  "write-blog-post",
  {
    title: "Write Blog Post",
    description: "Generate a portfolio blog post draft that fits this repo's MDX structure.",
    argsSchema: {
      topic: z.string().describe("The subject of the article."),
      angle: z.string().optional().describe("The specific point of view or hook."),
      notes: z.string().optional().describe("Raw notes, bullets, or material to turn into a post.")
    }
  },
  async ({ topic, angle, notes }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: [
            "Write an MDX draft for this portfolio blog.",
            `Topic: ${topic}`,
            angle ? `Angle: ${angle}` : "",
            notes ? `Notes:\n${notes}` : "",
            "",
            "Use the repository's style guide and keep the draft specific, opinionated, and implementation-aware."
          ]
            .filter(Boolean)
            .join("\n")
        }
      }
    ]
  })
);

async function sampleJson<T>(prompt: string, schema: z.ZodSchema<T>, maxTokens = 900) {
  try {
    const response = await server.server.createMessage({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: prompt
          }
        }
      ],
      maxTokens
    });

    if (response.content.type !== "text") {
      throw new Error("Sampling response was not plain text.");
    }

    const parsed = JSON.parse(response.content.text) as unknown;
    return schema.parse(parsed);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Sampling failed: ${error.message}. Use this tool from an MCP client that supports sampling/createMessage.`
        : "Sampling failed. Use this tool from an MCP client that supports sampling/createMessage."
    );
  }
}

server.registerTool(
  "list_posts",
  {
    description: "List all blog posts, including drafts and scheduled posts.",
    outputSchema: {
      posts: z.array(
        z.object({
          title: z.string(),
          slug: z.string(),
          publishedAt: z.string(),
          tags: z.array(z.string()),
          featured: z.boolean(),
          draft: z.boolean()
        })
      )
    }
  },
  async () => {
    const posts = await getAllBlogPosts({ includeUnpublished: true });
    const structuredContent = {
      posts: posts.map((post) => ({
        title: post.title,
        slug: post.slug,
        publishedAt: post.publishedAt,
        tags: post.tags,
        featured: post.featured,
        draft: post.draft
      }))
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(structuredContent, null, 2)
        }
      ],
      structuredContent
    };
  }
);

server.registerTool(
  "review_post",
  {
    description:
      "Review a blog post for publish readiness. Always returns deterministic repo checks and can add an editorial AI review when sampling is available.",
    inputSchema: {
      slug: z.string().describe("The blog post slug to review."),
      useSampling: z
        .boolean()
        .optional()
        .describe("When true, also request an editorial review through MCP sampling if the client supports it.")
    }
  },
  async ({ slug, useSampling = true }) => {
    const source = await readBlogPostSource(slug);
    const review = await reviewBlogPost(slug);
    let aiReview: z.infer<typeof aiReviewSchema> | null = null;
    let aiReviewNote: string | undefined;

    if (useSampling) {
      try {
        aiReview = await sampleJson(
          [
            "Return JSON only.",
            "Review this technical portfolio blog post before publication.",
            "Focus on clarity, specificity, argument strength, and whether it reads like senior engineering writing rather than filler.",
            "",
            "Return:",
            '- strengths: what is already working',
            '- risks: what feels weak, generic, missing, or unconvincing',
            '- edits: the highest-leverage edits before publishing',
            "",
            'JSON shape: {"strengths":["..."],"risks":["..."],"edits":["..."]}',
            "",
            "Post source:",
            source
          ].join("\n"),
          aiReviewSchema,
          1200
        );
      } catch (error) {
        aiReviewNote =
          error instanceof Error
            ? error.message
            : "Editorial AI review unavailable because sampling could not be completed.";
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              review,
              aiReview,
              aiReviewNote
            },
            null,
            2
          )
        }
      ]
    };
  }
);

server.registerTool(
  "link_suggestions",
  {
    description: "Suggest internal blog or project links for a post using deterministic repo matching.",
    inputSchema: {
      slug: z.string().describe("The blog post slug to analyze."),
      limit: z.number().int().positive().max(10).optional().describe("Maximum number of suggestions to return.")
    }
  },
  async ({ slug, limit = 5 }) => {
    const suggestions = await suggestInternalLinksForPost(slug, limit);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ suggestions }, null, 2)
        }
      ]
    };
  }
);

server.registerTool(
  "suggest_metadata",
  {
    description: "Suggest a title, excerpt, tags, and slug for a blog post using MCP sampling.",
    inputSchema: {
      topic: z.string().describe("The main topic."),
      angle: z.string().optional().describe("The article's specific point of view."),
      notes: z.string().optional().describe("Raw notes, bullets, or source material.")
    },
    outputSchema: {
      title: z.string(),
      excerpt: z.string(),
      tags: z.array(z.string()),
      slug: z.string()
    }
  },
  async ({ topic, angle, notes }) => {
    const structuredContent = await sampleJson(
      [
        "Return JSON only.",
        "Suggest blog metadata for a technical portfolio article.",
        `Topic: ${topic}`,
        angle ? `Angle: ${angle}` : "",
        notes ? `Notes:\n${notes}` : "",
        "",
        "Rules:",
        "- title: sharp, specific, not clickbait",
        "- excerpt: one sentence, under 180 characters",
        "- tags: 3 to 5 tags",
        "- slug: lowercase hyphenated",
        "",
        'JSON shape: {"title":"...","excerpt":"...","tags":["..."],"slug":"..."}'
      ]
        .filter(Boolean)
        .join("\n"),
      metadataSuggestionSchema
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(structuredContent, null, 2)
        }
      ],
      structuredContent
    };
  }
);

server.registerTool(
  "outline_post",
  {
    description: "Generate a practical article outline using MCP sampling.",
    inputSchema: {
      topic: z.string().describe("The article topic."),
      angle: z.string().optional().describe("The argument or point of view."),
      audience: z.string().optional().describe("The intended reader."),
      notes: z.string().optional().describe("Raw notes, bullets, or source material.")
    },
    outputSchema: {
      workingTitle: z.string(),
      audience: z.string(),
      summary: z.string(),
      sections: z.array(
        z.object({
          heading: z.string(),
          bullets: z.array(z.string())
        })
      )
    }
  },
  async ({ topic, angle, audience, notes }) => {
    const structuredContent = await sampleJson(
      [
        "Return JSON only.",
        "Create a practical outline for a technical portfolio blog post.",
        `Topic: ${topic}`,
        angle ? `Angle: ${angle}` : "",
        audience ? `Audience: ${audience}` : "",
        notes ? `Notes:\n${notes}` : "",
        "",
        "Rules:",
        "- Prefer 4 to 6 sections",
        "- Each section should have concrete bullets, not vague placeholders",
        "- Bias toward engineering tradeoffs, examples, and implementation detail",
        "",
        'JSON shape: {"workingTitle":"...","audience":"...","summary":"...","sections":[{"heading":"...","bullets":["..."]}]}'
      ]
        .filter(Boolean)
        .join("\n"),
      outlineSchema,
      1200
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(structuredContent, null, 2)
        }
      ],
      structuredContent
    };
  }
);

server.registerTool(
  "read_post",
  {
    description: "Read the raw MDX source for a blog post.",
    inputSchema: {
      slug: z.string().describe("The blog post slug and filename without .mdx.")
    }
  },
  async ({ slug }) => {
    const source = await readBlogPostSource(slug);
    return {
      content: [
        {
          type: "text",
          text: source
        }
      ]
    };
  }
);

server.registerTool(
  "rewrite_post_section",
  {
    description:
      "Rewrite a named section in a blog post using MCP sampling. Can return a proposed rewrite or apply it directly to the file.",
    inputSchema: {
      slug: z.string().describe("The blog post slug."),
      heading: z.string().describe("The exact section heading to rewrite, without markdown hashes."),
      instruction: z.string().describe("What should change in the rewrite."),
      apply: z
        .boolean()
        .optional()
        .describe("When true, write the rewritten section back into the MDX file.")
    }
  },
  async ({ slug, heading, instruction, apply = false }) => {
    const source = await readBlogPostSource(slug);
    const section = getBlogSection(source, heading);

    if (!section) {
      throw new Error(`Section "${heading}" was not found in ${slug}.`);
    }

    const sampled = await sampleJson(
      [
        "Return JSON only.",
        "Rewrite the body of one markdown section from a technical portfolio blog post.",
        `Section heading: ${section.heading}`,
        `Rewrite instruction: ${instruction}`,
        "",
        "Rules:",
        "- Return only the section body, not the heading",
        "- Keep markdown formatting where useful",
        "- Preserve specificity and implementation detail",
        "- Avoid filler, clichés, and generic advice",
        "",
        'JSON shape: {"body":"..."}',
        "",
        "Current section body:",
        section.body
      ].join("\n"),
      rewrittenSectionSchema,
      1200
    );

    const proposedSource = rewriteBlogSectionSource(source, heading, sampled.body);

    if (apply) {
      const result = await rewriteBlogPostSection(slug, heading, sampled.body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                applied: true,
                result,
                rewrittenBody: sampled.body
              },
              null,
              2
            )
          }
        ]
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              applied: false,
              heading,
              rewrittenBody: sampled.body,
              proposedSource
            },
            null,
            2
          )
        }
      ]
    };
  }
);

server.registerTool(
  "create_draft",
  {
    description: "Create a new blog draft file in src/content/blog with draft: true.",
    inputSchema: {
      title: z.string().describe("Post title."),
      slug: z.string().optional().describe("Optional slug. Defaults to a slugified title."),
      excerpt: z.string().optional().describe("Card/feed excerpt."),
      tags: z.array(z.string()).optional().describe("Tags for the frontmatter."),
      publishedAt: z.string().optional().describe("Optional ISO publish timestamp."),
      featured: z.boolean().optional().describe("Whether the post should be featured."),
      notes: z.string().optional().describe("Starter notes to include in the body.")
    }
  },
  async (input) => {
    const result = await createBlogDraft(input);
    const previewUrl = buildPreviewEnableUrl(result.slug);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              slug: result.slug,
              filePath: result.filePath,
              previewPath: result.previewPath,
              previewUrl
            },
            null,
            2
          )
        }
      ]
    };
  }
);

server.registerTool(
  "update_post_source",
  {
    description: "Overwrite an existing blog post source after validating its frontmatter.",
    inputSchema: {
      slug: z.string().describe("The existing file slug."),
      source: z.string().describe("Complete MDX source to write.")
    }
  },
  async ({ slug, source }) => {
    const result = await updateBlogPostSource(slug, source);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

server.registerTool(
  "publish_post",
  {
    description: "Flip a post out of draft mode and stamp updatedAt for publishing.",
    inputSchema: {
      slug: z.string().describe("The blog post slug to publish."),
      publishedAt: z.string().optional().describe("Optional ISO publish timestamp."),
      featured: z.boolean().optional().describe("Optionally set featured during publish.")
    }
  },
  async ({ slug, publishedAt, featured }) => {
    const result = await publishBlogPost({
      slug,
      publishedAt,
      featured
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

server.registerTool(
  "validate_posts",
  {
    description: "Validate one blog post or the entire blog collection.",
    inputSchema: {
      slug: z.string().optional().describe("Optional slug to validate a single file.")
    }
  },
  async ({ slug }) => {
    const result = await validateBlogFiles(slug);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Portfolio blog MCP server is running on stdio.");
}

main().catch((error) => {
  console.error("Failed to start portfolio blog MCP server:", error);
  process.exit(1);
});
