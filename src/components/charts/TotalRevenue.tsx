import ReactApexChart from 'react-apexcharts';
import { ArrowCircleUpRounded } from '@mui/icons-material';
import { Box, Typography, Stack } from '@mui/material';
import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config';

const TotalRevenue = () => {
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
          $236,535
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: '#475be8' }} />
          <Stack>
            <Typography fontSize="15px" color="#475be8">
              0.8%
            </Typography>
            <Typography fontSize="12px" color="#808191">
              Than last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        type="bar"
        height={310}
        series={TotalRevenueSeries}
        options={TotalRevenueOptions}
      />
    </Box>
  );
};

export default TotalRevenue;
