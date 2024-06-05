import { Box, Typography } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import { PropertyTypeOptions } from '../charts/chart.config'

const types = [
  'Apartment',
  'Villa',
  'Farmhouse',
  'Condos',
  'Townhouse',
  'Duplex',
  'Studio',
  'Chalet',
]

const PropertiesType = ({ properties }: { properties: any }) => {
  const getPropertiesByType = (type: string) => {
    return properties.filter(
      (property: { propertyType: string }) =>
        property.propertyType === type.toLowerCase()
    )
  }

  const getSeries = () => {
    let series: any[] = []

    types.map((el) => series.push(getPropertiesByType(el).length))

    return series
  }

  console.log(getSeries())

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
        Properties Type
      </Typography>
      <Box>
        <ReactApexChart
          height={350}
          type="bar"
          series={[{ name: 'Properties', data: [...getSeries()] }]}
          options={{ ...PropertyTypeOptions, xaxis: { categories: types } }}
        />
      </Box>
    </Box>
  )
}

export default PropertiesType
