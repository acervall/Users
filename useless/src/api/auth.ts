import { User } from 'utils/types'

export async function signUp(email: string, password: string): Promise<User> {
  // Implement signUp logic
  const user: User = { accessToken: password, user: { email: email, id: 5 } }
  return user
}

export async function signIn(email: string, password: string): Promise<User> {
  // Implement signIn logic
  const user: User = { accessToken: password, user: { email: email, id: 5 } }
  return user
}
