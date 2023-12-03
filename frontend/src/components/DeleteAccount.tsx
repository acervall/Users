import { DeleteUser } from '../api/user'
import { UserId } from '../utils/types'
import { useQueryClient } from '@tanstack/react-query'
import useUser from '../hooks/useUser'
import { useContext } from 'react'
import Context from '../constants/Context'
import { SubmitButton } from '../assets/StyledComponents/FormComponents'

const DeleteAccount = () => {
  const queryClient = useQueryClient()
  const { setAccessToken } = useContext(Context)
  const { data: user } = useUser()

  if (user) {
    const handleClick = async () => {
      DeleteUser({ id: user.id } as UserId, queryClient, setAccessToken)
    }

    return (
      <SubmitButton backgroundColor="#b30f0f" backgroundColorHover="#c30808" onClick={handleClick}>
        Delete
      </SubmitButton>
    )
  }
}

export default DeleteAccount
