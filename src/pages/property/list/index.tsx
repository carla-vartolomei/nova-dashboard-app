import { useNavigate } from 'react-router-dom'
import { useTable } from '@refinedev/core'
import { Add } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { PropertyCard, CustomButton } from '../../../components'

const AllProperties = () => {
  const navigate = useNavigate()
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable()

  const allProperties = data?.data ?? []

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error...</Typography>

  return (
    <Box component="div">
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}></Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={25} fontWeight={700} color="#1142d">
          All Properties
        </Typography>
        <CustomButton
          title="Add Property"
          handleClick={() => navigate('/properties/create')}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>
      <Box
        component="div"
        mt="20px"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}
      >
        {allProperties.map(({ _id: id, title, location, price, photo }) => (
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
  )
}

export default AllProperties
