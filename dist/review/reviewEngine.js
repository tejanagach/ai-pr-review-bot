export class ReviewEngine {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async reviewChunks(chunks) {
        const promises = chunks.map(async (chunk) => {
            const prompt = this.buildPrompt(chunk);
            const response = await this.provider.generateReview({
                prompt
            });
            return {
                file: chunk.file,
                review: response.content
            };
        });
        return Promise.all(promises);
    }
    buildPrompt(chunk) {
        return `
You are a senior software engineer reviewing a pull request.

Analyze the following code diff and provide feedback on:
- bugs
- security issues
- performance improvements
- readability improvements

File: ${chunk.file}

Diff:
${chunk.content}

Provide a concise professional code review.
`;
    }
}
