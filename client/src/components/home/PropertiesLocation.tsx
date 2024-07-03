import { LocationOn, Pin } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import GoogleMapReact from 'google-map-react'

const PropertiesLocation = () => {
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
      height="100%"
    >
      <Typography fontSize="18px" fontWeight={600} color="#11142d">
        Properties Locations
      </Typography>
      <Stack direction="row" gap={1} mb={1} mt={2}>
        <LocationOn color="error" />
        <Typography fontSize="16px" fontWeight={600} color="#11142d">
          Iasi, Romania
        </Typography>
      </Stack>

      <Box position="relative" width="100%" height="300px">
        <GoogleMapReact
          style={{
            width: '100px',
            height: '100px',
            padding: 4,
            top: 4,
            zIndex: 0,
          }}
          defaultCenter={{
            lat: 47.17,
            lng: 27.57,
          }}
          defaultZoom={10}
        />
      </Box>
      <Typography fontSize="12px" fontWeight={400} color="#808191">
        Company only list properties in this location.
      </Typography>
    </Box>
  )
}

export default PropertiesLocation
