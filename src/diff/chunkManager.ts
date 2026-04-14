import { FileDiff } from "./diffParser.js"

export interface DiffChunk {
  file: string
  content: string
}

export function createChunks(
  diffs: FileDiff[],
  maxLines = 40
): DiffChunk[] {
  const chunks: DiffChunk[] = []

  for (const diff of diffs) {
    const combined = [
      ...diff.additions.map((l) => `+ ${l}`),
      ...diff.deletions.map((l) => `- ${l}`)
    ]

    for (let i = 0; i < combined.length; i += maxLines) {
      const slice = combined.slice(i, i + maxLines)

      chunks.push({
        file: diff.file,
        content: slice.join("\n")
      })
    }
  }

  return chunks
}