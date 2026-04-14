import { GitHubClient } from "./github/githubClient.js";
import { parseDiff } from "./diff/diffParser.js";
import { createChunks } from "./diff/chunkManager.js";
import { OllamaProvider } from "./llm/ollamaProvider.js";
import { ReviewEngine } from "./review/reviewEngine.js";
import * as core from "@actions/core";
import * as github from "@actions/github";
async function run() {
    const token = core.getInput("github_token");
    const context = github.context;
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const pull_number = context.payload.pull_request?.number;
    const githubClient = new GitHubClient(token);
    console.log("Fetching PR diff...");
    const diff = await githubClient.getPullRequestDiff(owner, repo, pull_number);
    const parsed = parseDiff(diff);
    const chunks = createChunks(parsed);
    const provider = new OllamaProvider();
    const engine = new ReviewEngine(provider);
    const reviews = await engine.reviewChunks(chunks);
    const reviewText = reviews
        .map((r) => `### File: ${r.file}\n${r.review}`)
        .join("\n\n");
    await githubClient.postPRComment(owner, repo, pull_number, reviewText);
    console.log("Review posted to PR");
}
run();
