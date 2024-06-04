import { useEffect, useState } from 'react'
import { useList } from '@refinedev/core'
import { PropertyReferrals, TotalRevenue, PropertyCard } from '../../components'
import { Box, Typography, Stack } from '@mui/material'
import StatisticsCards from '../../components/home/StatisticsCards'
import axios from 'axios'
import { lastYear } from './utils'

const Home = () => {
  const [sales, setSales] = useState([])
  const {
    data: propertiesData,
    isLoading,
    isError,
  } = useList({
    resource: 'properties',
    pagination: {
      mode: 'off',
    },
  })
  const { data: usersData } = useList({
    resource: 'users',
    pagination: {
      mode: 'off',
    },
  })
  const allProperties = propertiesData?.data ?? []
  const allUsers = usersData?.data ?? []

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/sales')
      .then((res) => setSales(res.data))
  }, [])

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error</Typography>

  return (
    <Box component="div">
      <Typography fontSize={25} fontWeight={700} color={'#11142D'}>
        Dashboard
      </Typography>
      <Box component="div" mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <StatisticsCards
          properties={allProperties.length}
          sales={sales.length}
          users={allUsers.length}
          lastYear={lastYear}
        />
      </Box>
      <Stack mt="25px" width="100%" direction="column" gap={4}>
        <TotalRevenue sales={sales} lastYear={lastYear} />
        {/* <PropertyReferrals /> */}
      </Stack>
      <Box
        component="div"
        flex={1}
        borderRadius="15px"
        p={4}
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize={18} fontWeight={600} color="#11142d">
          Latest Properties
        </Typography>
        <Box mt={2.5} sx={{ display: 'flex', gap: 2.5 }}>
          {allProperties
            .slice(0, 3)
            .map(({ _id: id, title, location, price, photo }) => (
              <PropertyCard
                key={id}
                id={id}
                title={title}
                location={location}
                price={price}
                photo={photo}
              />
            ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Home
