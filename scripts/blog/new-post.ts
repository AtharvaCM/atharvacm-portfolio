import { createBlogDraft } from "../../src/lib/blog-authoring";

type ParsedArgs = {
  title?: string;
  slug?: string;
  excerpt?: string;
  tags?: string[];
  publishedAt?: string;
  featured?: boolean;
  notes?: string;
};

function parseArgs(argv: string[]): ParsedArgs {
  const args: ParsedArgs = {};
  const positionals: string[] = [];

  for (const token of argv) {
    if (token.startsWith("--slug=")) {
      args.slug = token.slice("--slug=".length);
      continue;
    }

    if (token.startsWith("--excerpt=")) {
      args.excerpt = token.slice("--excerpt=".length);
      continue;
    }

    if (token.startsWith("--tags=")) {
      args.tags = token
        .slice("--tags=".length)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      continue;
    }

    if (token.startsWith("--publishedAt=")) {
      args.publishedAt = token.slice("--publishedAt=".length);
      continue;
    }

    if (token === "--featured") {
      args.featured = true;
      continue;
    }

    if (token.startsWith("--notes=")) {
      args.notes = token.slice("--notes=".length);
      continue;
    }

    positionals.push(token);
  }

  args.title = positionals.join(" ").trim() || undefined;
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.title) {
    console.error(
      'Usage: npm run blog:new -- "Post title" [--slug=my-slug] [--tags=Next.js,Performance] [--excerpt=...] [--publishedAt=ISO_DATE]'
    );
    process.exit(1);
  }

  const result = await createBlogDraft(args as { title: string });

  console.log(`Created draft: ${result.filePath}`);
  console.log(`Preview path: ${result.previewPath}`);
  console.log("The post is marked draft: true and will stay hidden until preview mode is enabled or draft is removed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
