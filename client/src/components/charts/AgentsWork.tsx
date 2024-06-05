import {
  Box,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import { AgentsWorkOptions, formatPrice } from './chart.config'
import { useState } from 'react'
import { ArrowCircleUpRounded } from '@mui/icons-material'

const AgentsWork = ({
  agents,
  properties,
  sales,
  lastYear: { properties: lastYearProperties, sales: lastYearSales },
}: {
  agents: any
  properties: any
  sales: any
  lastYear: any
}) => {
  const [filter, setFilter] = useState('properties')
  const listedProperties = [...agents.map((el: any) => el.allProperties.length)]
  const agentsName = [...agents.map((el: any) => el.name)]

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as unknown as string)
  }

  let totalSales = 0
  sales.map((el: any) => (totalSales = totalSales + el.price))

  const totalSalesByAgent = (agentId: string) => {
    const agenntSales = sales.filter(
      (sale: { agent: string }) => sale.agent === agentId
    )
    let total = 0
    agenntSales.forEach((el: { price: number }) => (total = total + el.price))
    return total
  }

  const agentsTotalSales = [
    ...agents.map((agent: { _id: string }) => totalSalesByAgent(agent._id)),
  ]

  return (
    <Box
      component="div"
      p={4}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          width="100%"
          fontSize="18px"
          fontWeight={600}
          color="#11142d"
        >
          Agents Work 2024
        </Typography>

        <Box width="30%">
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">
              Select a filter
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Select a filter"
              onChange={handleChange}
            >
              <MenuItem value={'properties'}>Listed Properties</MenuItem>
              <MenuItem value={'RON'}>Total Sales</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize="28px" fontWeight={700} color="#11142d">
          {formatPrice(filter === 'properties' ? properties : totalSales)}{' '}
          {filter}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25 }} color={'success'} />

          <Stack>
            <Typography fontSize="15px" color={'#2e7d32'}>
              {(filter === 'properties'
                ? ((properties - lastYearProperties) / lastYearProperties) * 100
                : ((totalSales - lastYearSales) / lastYearSales) * 100
              ).toFixed(2)}
              %
            </Typography>
            <Typography fontSize="12px" color="#808191">
              Than last Year
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        type="area"
        height={310}
        series={[
          {
            name: filter === 'properties' ? 'Listed Properties' : 'TotalSales',
            data: filter === 'properties' ? listedProperties : agentsTotalSales,
          },
        ]}
        options={{
          ...AgentsWorkOptions,
          xaxis: {
            categories: agentsName,
            labels: { rotate: -90, style: { fontSize: '8px' } },
          },
        }}
      />
    </Box>
  )
}

export default AgentsWork
