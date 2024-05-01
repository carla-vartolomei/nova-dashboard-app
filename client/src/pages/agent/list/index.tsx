import React from 'react'
import { useList } from '@refinedev/core'
import { Box, Typography } from '@mui/material'
import { AgentCard } from '../../../components'

const Agents = () => {
  const { data, isLoading, isError } = useList({ resource: 'users' })
  const allAgents = data?.data ?? []

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error</Typography>

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Agents List
      </Typography>
      <Box
        mt="20px"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: '#fcfcfc',
        }}
      >
        {allAgents.map(({ _id: id, name, email, avatar, allProperties }) => (
          <AgentCard
            key={id}
            id={id}
            name={name}
            email={email}
            avatar={avatar}
            noOfProperties={allProperties.length}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Agents
