export function createChunks(diffs, maxLines = 40) {
    const chunks = [];
    for (const diff of diffs) {
        const combined = [
            ...diff.additions.map((l) => `+ ${l}`),
            ...diff.deletions.map((l) => `- ${l}`)
        ];
        for (let i = 0; i < combined.length; i += maxLines) {
            const slice = combined.slice(i, i + maxLines);
            chunks.push({
                file: diff.file,
                content: slice.join("\n")
            });
        }
    }
    return chunks;
}
