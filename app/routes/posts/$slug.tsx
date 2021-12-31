import { LoaderFunction, useLoaderData } from 'remix'
import { getPost } from '~/features/posts/post'
import invariant from 'tiny-invariant'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected params.slug')
  const post = await getPost(params.slug)
  return post
}

export default function PostSlug() {
  const post = useLoaderData()
  return <div dangerouslySetInnerHTML={{ __html: post.html }} />
}
