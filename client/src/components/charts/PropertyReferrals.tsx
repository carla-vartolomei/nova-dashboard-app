import { Box, Typography, Stack } from '@mui/material'
import { propertyReferralsInfo } from '../../constants'
import ProgressBar from '../common/ProgressBar'

const PropertyReferrals = () => {
  return (
    <Box
      component="div"
      p={4}
      bgcolor="#fcfcfc"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize="18px" fontWeight={600} color="#11142d">
        Property Referrals
      </Typography>
      <Stack my="20px" direction="column" gap={4}>
        {propertyReferralsInfo.map((bar) => (
          <ProgressBar key={bar.title} {...bar} />
        ))}
      </Stack>
    </Box>
  )
}

export default PropertyReferrals
