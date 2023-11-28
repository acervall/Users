import { useMutation, useQueryClient, MutationOptions, UseMutateFunction } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../api/auth'
import { User } from 'utils/types'

type IUseSignUp = UseMutateFunction<
  User,
  unknown,
  {
    email: string
    password: string
  },
  unknown
>

export function useSignUp(): IUseSignUp {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: signUpMutation } = useMutation<User, unknown, { email: string; password: string }, unknown>(
    ({ email, password }) => signUp(email, password), //Type '({ email, password }: { email: any; password: any; }) => Promise<User>' has no properties in common with type 'UseMutationOptions<User, unknown, { email: string; password: string; }, unknown>'.ts(2559) (alias) signUp(email: string, password: string): Promise<User> import signUp
    {
      onSuccess: (data: User) => {
        queryClient.setQueryData(['user'], data)
        navigate('/')
      },
      onError: (error) => {
        console.error(error)
      },
    } as MutationOptions<User, unknown, { email: string; password: string }, unknown>, // Type assertion to resolve type issues
  )

  return signUpMutation
}
