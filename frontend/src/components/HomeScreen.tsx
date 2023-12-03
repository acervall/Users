import LogoutButton from './LogoutButton'
import { useNavigate } from 'react-router-dom'
import { SubmitButton } from '../assets/StyledComponents/FormComponents'

const HomeScreen = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
    navigate(`/profile`)
  }

  return (
    <>
      <h1>Home Screen</h1>
      <p>Home screen content... TBD</p>
      <SubmitButton onClick={handleClick}>Profile</SubmitButton>
      <LogoutButton />
    </>
  )
}

export default HomeScreen
