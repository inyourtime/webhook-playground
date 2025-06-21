import { readdir } from 'node:fs/promises'
import path from 'node:path'
import fp from 'fastify-plugin'

type LoaderOptions = {
  dir: string
}

async function buildTrees(dir: string) {
  let files: string[] = []
  const dirEntries = await readdir(dir, { withFileTypes: true })

  for (const entry of dirEntries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const subFiles = await buildTrees(fullPath)
      files = files.concat(subFiles)
    } else if (entry.isFile()) {
      files.push(fullPath)
    }
  }

  return files
}

export default fp<LoaderOptions>(async function pluginLoader(fastify, opts) {
  const files = await buildTrees(opts.dir)

  for (const file of files) {
    const fileExports = await import(file)
    fastify.register(fileExports.default, fileExports.options || {})
  }
})
