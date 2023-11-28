interface User {
  id: number
  name: string
  email: string
}

interface Post {
  id: number
  title: string
  body: string
  authorId: number
}

const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  return response.json()
}

const fetchUserPosts = async (userId: number): Promise<Post[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  return response.json()
}

const UserPosts = ({ userId }: { userId: number }) => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery<User, Error>(['user', userId], () => fetchUser(userId))

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
  } = useQuery<Post[], Error, Post[], [string, number]>(['userPosts', userId], () => fetchUserPosts(userId), {
    select: (data) => data.filter((post) => post.authorId === userId),
  })

  if (isUserLoading || isPostsLoading) return <div>Loading...</div>

  if (isUserError || isPostsError) return <div>Error: {userError?.message ?? postsError?.message}</div>

  return (
    <div>
      <h1>{user.name}'s Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
