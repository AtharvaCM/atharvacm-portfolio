import { validateBlogFiles } from "../../src/lib/blog-authoring";

async function main() {
  const slug = process.argv[2];
  const result = await validateBlogFiles(slug);

  for (const entry of result.entries) {
    const header = entry.slug ? `${entry.file} (${entry.slug})` : entry.file;
    console.log(`\n${header}`);

    if (entry.issues.length === 0) {
      console.log("  ok");
      continue;
    }

    for (const issue of entry.issues) {
      console.log(`  ${issue.level}: ${issue.message}`);
    }
  }

  console.log(`\nValidation summary: ${result.errorCount} error(s), ${result.warningCount} warning(s).`);

  if (!result.ok) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
