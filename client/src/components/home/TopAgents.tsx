import { Box, Divider, Stack, Typography } from '@mui/material'
import { useGetIdentity } from '@refinedev/core'
import { useNavigate } from 'react-router-dom'

const TopAgents = ({ agents }: { agents: any }) => {
  const { data: currentUser }: any = useGetIdentity()
  const navigate = useNavigate()

  const generateLink = (id: any, email: any) => {
    if (currentUser.email === email) return navigate('/my-profile')
    return navigate(`/agents/show/${id}`)
  }

  const topAgents = [
    ...agents
      .sort(
        (
          a: { allProperties: string | any[] },
          b: { allProperties: string | any[] }
        ) => b.allProperties.length - a.allProperties.length
      )
      .slice(0, 3),
  ]

  return (
    <Box
      component="div"
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize="18px" fontWeight={600} color="#11142d">
        Top Agents
      </Typography>
      <Stack mt={2} gap={2}>
        {topAgents.map(
          ({ _id: id, name, email, avatar, allProperties }, index) => (
            <>
              <Box
                component="div"
                onClick={() => generateLink(id, email)}
                key={id}
                sx={{ display: 'flex', width: '100%', cursor: 'pointer' }}
              >
                <img
                  src={avatar}
                  alt="user"
                  width={40}
                  height={40}
                  style={{
                    borderRadius: 8,
                    objectFit: 'cover',
                  }}
                />
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box>
                    <Typography
                      sx={{
                        textTransform: 'uppercase',
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#fffff',
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography fontSize={12} color="#808191">
                      {email}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize={14} fontWeight={600}>
                      {allProperties.length} properties
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              {index < 2 && <Divider sx={{ borderColor: '#3275d7' }} />}
            </>
          )
        )}
      </Stack>
    </Box>
  )
}

export default TopAgents
