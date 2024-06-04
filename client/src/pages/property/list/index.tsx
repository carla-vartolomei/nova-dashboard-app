import { useNavigate } from 'react-router-dom'
import { useTable } from '@refinedev/core'
import { Add } from '@mui/icons-material'
import {
  Box,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
} from '@mui/material'
import { PropertyCard, CustomButton } from '../../../components'
import { useMemo } from 'react'

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
  } = useTable({
    syncWithLocation: true,
    pagination: { current: 1, pageSize: 9 },
  })

  const allProperties = data?.data ?? []

  // sort logic
  const currentPrice = sorters.find((item) => item.field == 'price')?.order
  const toggleSort = (field: string) => {
    setSorters([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }])
  }

  // filter logic
  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      'field' in item ? item : []
    )
    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType:
        logicalFilters.find((item) => item.field === 'propertyType')?.value ||
        '',
    }
  }, [filters])

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error</Typography>

  return (
    <Box component="div">
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#1142d">
            All Properties
          </Typography>

          <Box display="flex" justifyContent="space-between">
            <Stack
              mt={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <CustomButton
                title="Add Property"
                handleClick={() => navigate('/properties/create')}
                backgroundColor="#475be8"
                color="#fcfcfc"
                icon={<Add />}
              />
            </Stack>

            <Box
              mb={2}
              mt={3}
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                mb={{ xs: '20px', sm: 0 }}
              >
                <CustomButton
                  title={`Sort price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                  handleClick={() => toggleSort('price')}
                  backgroundColor="#475be8"
                  color="#fcfcfc"
                />
                <TextField
                  variant="outlined"
                  color="info"
                  placeholder="Search by title"
                  value={currentFilterValues.title}
                  onChange={(e) => {
                    setFilters([
                      {
                        field: 'title',
                        operator: 'contains',
                        value: e.currentTarget.value ?? undefined,
                      },
                    ])
                  }}
                />
                <Select
                  variant="outlined"
                  color="info"
                  displayEmpty
                  required
                  inputProps={{
                    'aria-label': 'Without label',
                  }}
                  defaultValue=""
                  value={currentFilterValues.propertyType}
                  onChange={(e) => {
                    setFilters(
                      [
                        {
                          field: 'propertyType',
                          operator: 'eq',
                          value: e.target.value,
                        },
                      ],
                      'replace'
                    )
                  }}
                >
                  <MenuItem value=""> All</MenuItem>
                  {[
                    'Apartment',
                    'Villa',
                    'Farmhouse',
                    'Condos',
                    'Townhouse',
                    'Duplex',
                    'Studio',
                    'Chalet',
                  ].map((type) => (
                    <MenuItem key={type} value={type.toLowerCase()}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box
        component="div"
        mt="20px"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2.5,
        }}
      >
        {allProperties.length > 0 ? (
          allProperties.map(({ _id: id, title, location, price, photo }) => (
            <PropertyCard
              key={id}
              id={id}
              title={title}
              location={location}
              price={price}
              photo={photo}
            />
          ))
        ) : (
          <Typography>No properties</Typography>
        )}
      </Box>

      {allProperties.length > 0 && (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mt={3}
          justifyContent="flex-end"
        >
          <CustomButton
            title="Previous"
            handleClick={() => {
              setPageSize(9)
              setCurrent((prev) => prev - 1)
            }}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />

          <Box
            display={{ xs: 'hidden', sm: 'flex' }}
            alignItems="center"
            gap="5px"
          >
            Page{' '}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>

          <CustomButton
            title="Next"
            handleClick={() => {
              setPageSize(9)
              setCurrent((prev) => prev + 1)
            }}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />

          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{
              'aria-label': 'Without label',
            }}
            defaultValue={9}
            onChange={(e) => {
              setPageSize(Number(e.target.value) ?? 9)
            }}
          >
            {[9, 18, 27, 36, 45].map((size) => (
              <MenuItem key={size} value={size}>
                Show {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  )
}

export default AllProperties
