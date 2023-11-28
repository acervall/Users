import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUser } from 'api/auth'
import { User } from 'utils/types'

interface IUseUser {
  user: User | null
}

export function useUser(): IUseUser {
  const { data: user } = useQuery<User | null>(['user'], async (): Promise<User | null> => getUser(user), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onError: () => {
      // Handle error, remove user data or perform any other action
    },
  })

  useEffect(() => {
    // Save or remove user data in local storage based on user changes
  }, [user])

  return {
    user: user ?? null,
  }
}
export function useUser(): IUseUser {
  const { data: user } = useQuery<User | null>([QUERY_KEY.user], async () => getUser(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onError: () => {
      // Handle error, remove user data or perform any other action
    },
  })

  useEffect(() => {
    if (!user) removeUser()
    else saveUser(user)
  }, [user])

  return {
    user: user ?? null,
  }
}
