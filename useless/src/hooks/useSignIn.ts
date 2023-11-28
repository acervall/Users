// useSignIn.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signIn } from 'api/auth'
import { User } from 'utils/types'

export function useSignIn() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: signInMutation } = useMutation<User, unknown, { email: string; password: string }, unknown>(
    ({ email, password }: { email: string; password: string }) => signIn(email, password),
    {
      onSuccess: (data: User) => {
        queryClient.setQueryData(['user'], data)
        navigate('/')
      },
      onError: (error: unknown) => {
        console.error(error)
      },
    },
  )

  return signInMutation
}
