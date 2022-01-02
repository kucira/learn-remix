import {
  Form,
  redirect,
  useActionData,
  useTransition,
  useLoaderData,
} from 'remix'
import type { ActionFunction, LoaderFunction } from 'remix'
import { createPost, getPost } from '~/features/posts/post'
import invariant from 'tiny-invariant'
import { useEffect } from 'react'

type PostError = {
  title?: boolean
  slug?: boolean
  markdown?: boolean
}

export const loader: LoaderFunction = async ({ params }: any) => {
  const post = getPost(params.slug)
  return post
}

export const action: ActionFunction = async ({ request }: any) => {
  await new Promise((res) => setTimeout(res, 1000))

  const formData = await request.formData()
  const title = formData.get('title')
  const slug = formData.get('slug')
  const markdown = formData.get('markdown')

  console.log(slug, 'slug')

  const errors: PostError = {}
  if (!title) errors.title = true
  if (!slug) errors.slug = true
  if (!markdown) errors.markdown = true

  if (Object.keys(errors).length) {
    return errors
  }

  invariant(typeof title === 'string')
  invariant(typeof slug === 'string')
  invariant(typeof markdown === 'string')
  await createPost({ title, slug, markdown })
  return redirect('/admin')
}

export default function NewPost() {
  const errors = useActionData()
  const transition = useTransition()
  const post = useLoaderData()

  useEffect(() => {
    const titleEl: any = document.getElementById('title')
    const slugEl: any = document.getElementById('slug')
    const markdownEl: any = document.getElementById('markdown')

    titleEl.value = post.title
    slugEl.value = post.slug
    markdownEl.value = post.html
  }, [post])
  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title ? <em>Title is required</em> : null}
          <input type="text" name="title" id="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug ? <em>Slug is required</em> : null}
          <input type="text" name="slug" id="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>
        {errors?.markdown ? <em>Markdown is required</em> : null}
        <br />
        <textarea id="markdown" rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? 'Creating...' : 'Create Post'}
        </button>
      </p>
    </Form>
  )
}
