import { Octokit } from "@octokit/rest"

export class GitHubClient {
  private octokit: Octokit

  constructor(token: string) {
    this.octokit = new Octokit({
      auth: token
    })
  }

  async getPullRequestDiff(
    owner: string,
    repo: string,
    pull_number: number
  ): Promise<string> {
    const response = await this.octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner,
        repo,
        pull_number,
        headers: {
          accept: "application/vnd.github.v3.diff"
        }
      }
    )

    return response.data as unknown as string
  }

  async postPRComment(
    owner: string,
    repo: string,
    pull_number: number,
    body: string
  ) {
    await this.octokit.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body
    })
  }
}