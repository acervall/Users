import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return response.data
}

const PostsList: React.FC = () => {
  const { isLoading, isError, error, data } = useQuery<Post[], Error>('posts', fetchPosts, {
    cacheTime: 5 * 60 * 1000, // Cache data for 5 minutes
    staleTime: 1 * 60 * 1000, // Data is considered stale after 1 minute
    refetchOnWindowFocus: true, // Refetch data when the window regains focus
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export default PostsList
