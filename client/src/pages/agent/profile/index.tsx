import { Typography } from '@mui/material'
import { useOne } from '@refinedev/core'
import { useParams } from 'react-router-dom'
import { Profile } from '../../../components'

const AgentProfile = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  })
  const agentProfile = data?.data ?? {}

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error</Typography>

  return (
    <Profile
      type="Agent"
      name={agentProfile.name}
      email={agentProfile.email}
      avatar={agentProfile.avatar}
      properties={agentProfile.allProperties}
    />
  )
}

export default AgentProfile
