import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { QUERY_KEY } from '../constants/queryKeys'

type IUseSignOut = () => void

export function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const onSignOut = () => {
    queryClient.setQueryData(['user'], null)
    navigate('/auth/sign-in')
  }

  return onSignOut
}
