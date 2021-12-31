import { useLoaderData, Link } from 'remix'
import { getPosts, Post } from '~/features/posts/post'

export const loader = () => {
  return getPosts()
}

export default function Posts() {
  const posts = useLoaderData<Post[]>()
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
