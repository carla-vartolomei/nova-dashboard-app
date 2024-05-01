import { useParams, useNavigate } from 'react-router-dom'
import { useDelete, useGetIdentity, useShow } from '@refinedev/core'
import { Typography, Box, Stack, Avatar } from '@mui/material'
import { Chat, Delete, Edit, Phone, Place, Star } from '@mui/icons-material'
import { CustomButton } from '../../../components'
import { IUser } from '../../../components/header'

const PropertyDetails = () => {
  const navigate = useNavigate()
  const { data: user } = useGetIdentity<IUser & { email: string }>()
  const { id } = useParams()
  const { mutate } = useDelete()
  const {
    queryResult: { data, isLoading, isError },
  } = useShow()

  const propertyDetails = data?.data ?? {}

  const isCurrentUser = user?.email === propertyDetails.creator?.email

  const handleDeleteProperty = () => {
    const response = confirm('Are you sure you want to delete this property?')
    if (response) {
      mutate(
        { resource: 'properties', id: id as string },
        {
          onSuccess: () => {
            navigate('/properties')
          },
        }
      )
    }
  }

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error</Typography>

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#fcfcfc"
      width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="#1142d">
        Details
      </Typography>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={2}>
        <Box
          mt="20px"
          display="flex"
          flexDirection={{ xs: 'column', lg: 'row' }}
          gap={4}
        >
          <Box flex={1} maxWidth={764}>
            <img
              src={propertyDetails.photo}
              alt={propertyDetails.title}
              height={546}
              style={{ objectFit: 'cover', borderRadius: '10px' }}
              className="property_details-img"
            />
            <Box mt="15px">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Typography
                  fontSize={18}
                  fontWeight={500}
                  color="#1142d"
                  textTransform="capitalize"
                >
                  {propertyDetails.propertyType}
                </Typography>
                <Box>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={`star-${star}`} sx={{ color: '#f2c94c' }} />
                  ))}
                </Box>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Box>
                  <Typography
                    fontSize={22}
                    fontWeight={600}
                    color="#1142d"
                    textTransform="capitalize"
                  >
                    {propertyDetails.title}
                  </Typography>
                  <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                    <Place sx={{ color: '#808191' }} />
                    <Typography fontSize={14} color="#808191">
                      {propertyDetails.location}
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    color="#1142d"
                    textTransform="capitalize"
                  >
                    Price
                  </Typography>
                  <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                    <Typography fontSize={22} fontWeight={700} color="#475be8">
                      ${propertyDetails.price}
                    </Typography>
                    <Typography fontSize={14} fontWeight={400} color="#808191">
                      For One Day
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              <Box mt="15px">
                <Typography
                  fontSize={18}
                  fontWeight={500}
                  color="#1142d"
                  textTransform="capitalize"
                >
                  Description
                </Typography>
                <Typography fontSize={14} color="#808191" mt={0.5}>
                  {propertyDetails.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          mt="20px"
          display="flex"
          flexDirection="column"
          gap={2}
          width="fit-content"
        >
          <Box
            width="fit-content"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="15px"
            padding="20px"
            border="1px solid #e4e4e4"
          >
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{ width: '90px', height: '90px' }}
              />
              <Typography mt={1} fontSize={18} fontWeight={600} color="#1142d">
                {user?.name}
              </Typography>
              <Typography fontSize={14} color="#808191">
                Agent
              </Typography>
              <Stack mt={2} direction="row" alignItems="center" gap={0.5}>
                <Place sx={{ color: '#808191' }} />
                <Typography fontSize={14} color="#808191">
                  Iasi, Romania
                </Typography>
              </Stack>
              <Typography
                mt={0.5}
                fontSize={16}
                fontWeight={600}
                color="#1142d"
              >
                {propertyDetails.creator?.allProperties.length} Properties
              </Typography>
              <Stack mt={4} direction="row" alignItems="center" gap={2}>
                {isCurrentUser ? (
                  <>
                    <CustomButton
                      title="edit"
                      handleClick={() => navigate(`/properties/edit/${id}`)}
                      backgroundColor="#475be8"
                      color="#fcfcfc"
                      icon={<Edit />}
                    />
                    <CustomButton
                      title="delete"
                      handleClick={handleDeleteProperty}
                      backgroundColor="#b20000"
                      color="#fcfcfc"
                      icon={<Delete />}
                    />
                  </>
                ) : (
                  <>
                    <CustomButton
                      title="message"
                      handleClick={() => {}}
                      backgroundColor="#475be8"
                      color="#fcfcfc"
                      icon={<Chat />}
                    />
                    <CustomButton
                      title="call"
                      handleClick={() => {}}
                      backgroundColor="#2ED480"
                      color="#fcfcfc"
                      icon={<Phone />}
                    />
                  </>
                )}
              </Stack>
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="10px"
          >
            <img
              src={propertyDetails.photo}
              alt={propertyDetails.title}
              style={{
                objectFit: 'cover',
                borderRadius: '10px',
                width: '320px',
                height: '320px',
              }}
              className="property_details-img"
            />
          </Box>

          <CustomButton
            fullWidth
            title="book now"
            handleClick={() => {}}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default PropertyDetails
