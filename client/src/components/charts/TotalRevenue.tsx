import ReactApexChart from 'react-apexcharts'
import { ArrowCircleUpRounded } from '@mui/icons-material'
import { Box, Typography, Stack, Tooltip } from '@mui/material'
import {
  TotalRevenueOptions,
  formatPrice,
  monthsArray,
  parseDate,
} from './chart.config'

const TotalRevenue = ({ sales, lastYear: { sales: lastYearSales } }) => {
  const getSalesByMonth = (month: number) => {
    const monthSales = sales.filter((sale) => {
      const saleDate = parseDate(sale.date)
      return saleDate.getMonth() === month - 1
    })
    let total = 0
    monthSales.forEach((el) => (total = total + el.price))
    return total
  }

  const currentYearMonthsSales = [
    ...monthsArray.map((month) => getSalesByMonth(month)),
  ]

  const lastYearMonthsSales = [
    ...monthsArray.map((month) => lastYearSales.months[month]),
  ]

  let totalSalesCurrentYear = 0
  currentYearMonthsSales.map(
    (el) => (totalSalesCurrentYear = totalSalesCurrentYear + el)
  )

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
        Total Revenue
      </Typography>
      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize="28px" fontWeight={700} color="#11142d">
          {formatPrice(totalSalesCurrentYear)} RON
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded
            sx={{ fontSize: 25 }}
            color={
              totalSalesCurrentYear > lastYearSales.total ? 'success' : 'error'
            }
          />
          <Tooltip
            title={`The last year total revenue was ${formatPrice(lastYearSales.total)} RON.`}
            placement="right"
            arrow
          >
            <Stack>
              <Typography
                fontSize="15px"
                color={
                  totalSalesCurrentYear > lastYearSales.total
                    ? '#2e7d32'
                    : 'error'
                }
              >
                {(
                  ((totalSalesCurrentYear - lastYearSales.total) /
                    lastYearSales.total) *
                  100
                ).toFixed(2)}
                %
              </Typography>
              <Typography fontSize="12px" color="#808191">
                Than last Year
              </Typography>
            </Stack>
          </Tooltip>
        </Stack>
      </Stack>
      <ReactApexChart
        type="bar"
        height={310}
        series={[
          {
            name: 'Last Year',
            data: [...lastYearMonthsSales],
          },
          {
            name: 'Current Year',
            data: [...currentYearMonthsSales],
          },
        ]}
        options={TotalRevenueOptions}
      />
    </Box>
  )
}

export default TotalRevenue
