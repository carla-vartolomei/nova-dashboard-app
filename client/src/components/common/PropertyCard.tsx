import { Link } from 'react-router-dom'
import { Place } from '@mui/icons-material'
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from '@mui/material'
import { PropertyCardProps } from '../../interfaces/property'

const PropertyCard = (props: PropertyCardProps) => {
  const { id, title, location, price, photo } = props
  return (
    <Card
      component={Link}
      to={`/properties/show/${id}`}
      sx={{
        cursor: 'pointer',
        textDecoration: 'none',
        maxWidth: '310px',
        padding: '10px',
        '&:hover': { boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1' },
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo}
        alt="card image"
        sx={{ borderRadius: '10px' }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '10px',
          paddingX: '5px',
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography color="#11142d" fontSize={16} fontWeight={500}>
            {title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place sx={{ fontSize: 18, color: '#11142d', marginTop: 0.5 }} />
            <Typography color="#808191" fontSize={14}>
              {location}
            </Typography>
          </Stack>
        </Stack>
        <Box
          px={1.5}
          py={0.5}
          borderRadius={1}
          bgcolor="#dadefa"
          height="fit-content"
        >
          <Typography color="#475be8" fontSize={12} fontWeight={600}>
            {price} RON
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
