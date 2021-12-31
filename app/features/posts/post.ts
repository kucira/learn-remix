import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import invariant from 'tiny-invariant'
import { marked } from 'marked'

export type Post = {
  slug: string
  title: string
  markdown?: string
}

export type PostMarkdownAttributes = {
  title: string
}

function isValidPostAttributes(
  attributes: any,
): attributes is PostMarkdownAttributes {
  return attributes?.title
}

const pathPosts = path.join(__dirname, '..', 'posts')

export const getPosts = async () => {
  const dir = await fs.readdir(pathPosts)
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(pathPosts, filename))
      const { attributes }: any = parseFrontMatter(file.toString())

      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`,
      )

      return {
        slug: filename.replace(/\.md$/, ''),
        title: attributes.title,
      }
    }),
  )
}

export const getPost = async (slug: string) => {
  const filepath = path.join(pathPosts, slug + '.md')
  const file = await fs.readFile(filepath)
  const { attributes, body } = parseFrontMatter(file.toString())
  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`,
  )
  const html = marked(body)
  return { slug, html, title: attributes.title }
}

type NewPost = {
  title: string
  slug: string
  markdown: string
}

export const createPost = async (post: NewPost) => {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`
  await fs.writeFile(path.join(pathPosts, post.slug + '.md'), md)
  return getPost(post.slug)
}
