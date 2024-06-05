import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

type PassedProps = {
  allProperties: any
  soldProperties: any
  lastYear: any
}

const PropertiesSold = ({
  allProperties,
  soldProperties,
  lastYear: {
    allProperties: lastYearAllProperties,
    soldProperties: lastYearSoldProperties,
  },
}: PassedProps) => {
  const [year, setYear] = useState('2024')

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as unknown as string)
  }

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
        All Properties
      </Typography>
      <Box mt={1.5} style={{ display: 'flex', gap: '16px' }}>
        <ReactApexChart
          options={{
            chart: { type: 'pie' },
            colors: ['#b9cef5', '#3275d7'],
            legend: { show: true, position: 'bottom' },
            dataLabels: {
              enabled: true,
              style: {
                colors: ['#fff'],
                fontWeight: 400,
                fontSize: '10px',
              },
              background: { dropShadow: { enabled: false } },
            },
            labels: ['Available', 'Sold'],
          }}
          series={[
            year === '2024'
              ? allProperties - soldProperties
              : lastYearAllProperties - lastYearSoldProperties,
            year === '2024' ? soldProperties : lastYearSoldProperties,
          ]}
          type="pie"
          width="200px"
          height="200px"
        />
        <Box width="100%">
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">Select a year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year.toString()}
              label="Select a year"
              onChange={handleChange}
            >
              <MenuItem value={'2023'}>2023</MenuItem>
              <MenuItem value={'2024'}>2024</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )
}

export default PropertiesSold
