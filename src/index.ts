import { GitHubClient } from "./github/githubClient.js"
import { parseDiff } from "./diff/diffParser.js"
import { createChunks } from "./diff/chunkManager.js"
import { OllamaProvider } from "./llm/ollamaProvider.js"
import { ReviewEngine } from "./review/reviewEngine.js"

async function run() {
  const token = process.env.GITHUB_TOKEN!

  const owner = "tejanagach"
  const repo = "ai-pr-review-bot"
  const pull_number = 2

  const github = new GitHubClient(token)

  console.log("PR bot")

  const diff = await github.getPullRequestDiff(owner, repo, pull_number)

  const parsed = parseDiff(diff)

  const chunks = createChunks(parsed)

  const provider = new OllamaProvider()

  const engine = new ReviewEngine(provider)

  const reviews = await engine.reviewChunks(chunks)

  const reviewText = reviews
    .map((r) => `### File: ${r.file}\n${r.review}`)
    .join("\n\n")

  await github.postPRComment(owner, repo, pull_number, reviewText)

  console.log("Review posted to PR")
}

run()