import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { publishBlogPost } from "../../src/lib/blog-authoring";

const execFileAsync = promisify(execFile);

type ParsedArgs = {
  slug?: string;
  publishedAt?: string;
  featured?: boolean;
  branch?: string;
  commit?: boolean;
  pr?: boolean;
  base?: string;
  title?: string;
  body?: string;
};

function parseArgs(argv: string[]): ParsedArgs {
  const args: ParsedArgs = {};
  const positionals: string[] = [];

  for (const token of argv) {
    if (token.startsWith("--publishedAt=")) {
      args.publishedAt = token.slice("--publishedAt=".length);
      continue;
    }

    if (token === "--featured") {
      args.featured = true;
      continue;
    }

    if (token.startsWith("--branch=")) {
      args.branch = token.slice("--branch=".length);
      continue;
    }

    if (token === "--commit") {
      args.commit = true;
      continue;
    }

    if (token === "--pr") {
      args.pr = true;
      continue;
    }

    if (token.startsWith("--base=")) {
      args.base = token.slice("--base=".length);
      continue;
    }

    if (token.startsWith("--title=")) {
      args.title = token.slice("--title=".length);
      continue;
    }

    if (token.startsWith("--body=")) {
      args.body = token.slice("--body=".length);
      continue;
    }

    positionals.push(token);
  }

  args.slug = positionals[0];
  return args;
}

async function run(cmd: string, args: string[]) {
  await execFileAsync(cmd, args, { cwd: process.cwd() });
}

async function ensureBranch(branch: string) {
  try {
    await run("git", ["rev-parse", "--verify", branch]);
    await run("git", ["switch", branch]);
  } catch {
    await run("git", ["switch", "-c", branch]);
  }
}

async function maybeRunGitWorkflow(args: ParsedArgs, filePath: string, slug: string) {
  const branch = args.branch ?? (args.commit || args.pr ? `publish/${slug}` : undefined);

  if (branch) {
    await ensureBranch(branch);
  }

  if (args.commit || args.pr) {
    await run("git", ["add", filePath]);
    await run("git", ["commit", "-m", args.title ?? `Publish blog post: ${slug}`]);
  }

  if (args.pr) {
    if (!branch) {
      throw new Error("A branch is required to open a pull request.");
    }

    await run("gh", [
      "pr",
      "create",
      "--base",
      args.base ?? "main",
      "--head",
      branch,
      "--title",
      args.title ?? `Publish blog post: ${slug}`,
      "--body",
      args.body ?? `Publishes \`${slug}\` from draft to the live blog.`
    ]);
  }

  return { branch };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.slug) {
    console.error(
      'Usage: npm run blog:publish -- <slug> [--publishedAt=ISO_DATE] [--featured] [--branch=publish/my-post] [--commit] [--pr]'
    );
    process.exit(1);
  }

  const result = await publishBlogPost({
    slug: args.slug,
    publishedAt: args.publishedAt,
    featured: args.featured
  });
  const gitResult = await maybeRunGitWorkflow(args, result.filePath, result.slug);

  console.log(`Published post: ${result.filePath}`);
  console.log(`Public path: ${result.previewPath}`);
  console.log(`publishedAt: ${result.publishedAt}`);
  console.log(`updatedAt: ${result.updatedAt}`);

  if (gitResult.branch) {
    console.log(`Branch: ${gitResult.branch}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
