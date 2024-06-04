import { Box, Typography, Stack } from '@mui/material'
import { PieChartProps } from '../../interfaces/home'
import ReactApexChart from 'react-apexcharts'
import ProgressBar from '../common/ProgressBar'

type PassedProps = {
  title: string
  value: number
  color: string
  icon: JSX.Element
}

const PieChart = ({ title, value, color, icon }: PassedProps) => {
  return (
    <Box
      component="div"
      id="chart"
      flex={1}
      display="flex"
      bgcolor="#fcfcfc"
      flexDirection="row"
      // justifyContent="space-between"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      borderRadius="15px"
      minHeight="110px"
      width="100%"
      borderBottom={`4px solid ${color}`}
    >
      <Stack direction="column">
        <Typography fontSize={14} color="#808191">
          {title}
        </Typography>
        <Stack>
          <Typography fontSize={24} color="#11142d" fontWeight={700} mt={1}>
            {value}
          </Typography>
          {icon}
        </Stack>
      </Stack>
      {/* <ProgressBar title={title} percentage={value} color="#6C5DD3" /> */}
      {/* <ReactApexChart
        options={{
          chart: { type: 'donut' },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        width="120px"
      /> */}
    </Box>
  )
}

export default PieChart
