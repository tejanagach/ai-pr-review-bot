import { Octokit } from "@octokit/rest";
export class GitHubClient {
    octokit;
    constructor(token) {
        this.octokit = new Octokit({
            auth: token
        });
    }
    async getPullRequestDiff(owner, repo, pull_number) {
        const response = await this.octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}", {
            owner,
            repo,
            pull_number,
            headers: {
                accept: "application/vnd.github.v3.diff"
            }
        });
        return response.data;
    }
    async postPRComment(owner, repo, pull_number, body) {
        await this.octokit.issues.createComment({
            owner,
            repo,
            issue_number: pull_number,
            body
        });
    }
}
