import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'
import { Box, Typography, Stack } from '@mui/material'

type PassedProps = {
  properties: number
  sales: number
  users: number
  lastYear: any
}

const StatisticsCards = ({
  properties,
  sales,
  users,
  lastYear,
}: PassedProps) => {
  const { properties: lastYearProperties, agents: lastYearAgents } = lastYear

  const statistics = [
    {
      title: 'All Properties',
      value: properties,
      color: '#6C5DD3',
      lastYear: lastYearProperties.total,
    },
    {
      title: 'Sold Properties',
      value: sales,
      color: '#7FBA7A',
      lastYear: lastYearProperties.sold,
    },
    {
      title: 'Total Customers',
      value: sales,
      color: '#FFCE73',
      lastYear: lastYearProperties.sold,
    },
    {
      title: 'Total Agents',
      value: users,
      color: '#FFA2C0',
      lastYear: lastYearAgents,
    },
  ]

  return (
    <>
      {statistics.map(({ title, color, value, lastYear }) => (
        <Box
          key={title}
          component="div"
          id="chart"
          flex={1}
          display="flex"
          bgcolor="#fcfcfc"
          flexDirection="row"
          alignItems="center"
          padding="8px 16px"
          gap={2}
          borderRadius="10px"
          minHeight="100px"
          width="100%"
          borderBottom={`4px solid ${color}`}
        >
          <Stack direction="column" width="100%">
            <Typography fontSize={14} color="#808191">
              {title}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography mt={0} fontSize={24} color="#11142d" fontWeight={700}>
                {value}
              </Typography>
              <Stack direction="row" gap={0.5}>
                {value > lastYear ? (
                  <KeyboardArrowUp color="success" />
                ) : (
                  <KeyboardArrowDown color="error" />
                )}
                <Stack direction="column">
                  <Typography
                    color={value > lastYear ? '#2e7d32' : 'error'}
                    fontWeight={700}
                  >
                    {value > lastYear && '+'}
                    {(((value - lastYear) / lastYear) * 100).toFixed(2)}%
                  </Typography>
                  <Typography fontSize="10px" color="#808191">
                    Than last Year
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      ))}
    </>
  )
}

export default StatisticsCards
