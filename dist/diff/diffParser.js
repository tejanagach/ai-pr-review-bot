export function parseDiff(diff) {
    const lines = diff.split("\n");
    const files = [];
    let currentFile = null;
    for (const line of lines) {
        if (line.startsWith("diff --git")) {
            const fileMatch = line.match(/b\/(.+)$/);
            if (fileMatch) {
                currentFile = {
                    file: fileMatch[1],
                    additions: [],
                    deletions: []
                };
                files.push(currentFile);
            }
        }
        if (!currentFile)
            continue;
        if (line.startsWith("+") && !line.startsWith("+++")) {
            currentFile.additions.push(line.substring(1));
        }
        if (line.startsWith("-") && !line.startsWith("---")) {
            currentFile.deletions.push(line.substring(1));
        }
    }
    return files;
}
