import AuthForm from '../helpers/AuthForm'
import { EditUser } from '../api/user'
import { User, Field, SubmitButtonInterface } from '../utils/types'
import { useQueryClient } from '@tanstack/react-query'
import useUser from '../hooks/useUser'

const EditProfile = () => {
  const queryClient = useQueryClient()
  const { data: user, isLoading, error } = useUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (user) {
    const fields: Field[] = [
      {
        typeKey: 'id',
        value: user.id,
      },
      {
        label: 'Username',
        typeKey: 'username',
        value: user.username,
        type: 'text',
        required: true,
      },
      { label: 'Email', typeKey: 'email', value: user.email, type: 'email', required: true },
      {
        label: 'password',
        typeKey: 'password',
        value: user.password,
        type: 'password',
        required: true,
      },
      {
        label: 'first name',
        typeKey: 'first_name',
        value: user.first_name,
        type: 'text',
        required: false,
      },
      {
        label: 'last name',
        typeKey: 'last_name',
        value: user.last_name,
        type: 'text',
        required: false,
      },
    ]

    const submitButton: SubmitButtonInterface<User> = {
      label: 'Save changes',
      type: 'submit',
      func: (values) => EditUser(values as User, queryClient),
    }

    return (
      <div>
        <h1>Edit Profile</h1>
        <p>Edit you user information</p>
        <AuthForm<User> fields={fields} submitButton={submitButton} />
      </div>
    )
  }
}

export default EditProfile
