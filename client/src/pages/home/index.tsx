import { useList } from '@refinedev/core'
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from '../../components'
import { Box, Typography, Stack } from '@mui/material'

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: 'properties',
    config: { pagination: { pageSize: 5 } },
  })
  const latestProperties = data?.data ?? []

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error</Typography>

  return (
    <Box component="div">
      <Typography fontSize={25} fontWeight={700} color={'#11142D'}>
        Dashboard
      </Typography>
      <Box component="div" mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title="Total customers"
          value={5684}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title="Properties for Cities"
          value={555}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
      </Box>
      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
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
        <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {latestProperties.map(
            ({ _id: id, title, location, price, photo }) => (
              <PropertyCard
                key={id}
                id={id}
                title={title}
                location={location}
                price={price}
                photo={photo}
              />
            )
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Home
