import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDelete, useGetIdentity, useShow } from '@refinedev/core'
import { Typography, Box, Stack, Avatar, Chip, Tooltip } from '@mui/material'
import { Chat, Delete, Edit, Home, Place } from '@mui/icons-material'
import { CustomButton } from '../../../components'
import { IUser } from '../../../components/header'
import { createSale, getSale } from './utils'

const PropertyDetails = () => {
  const navigate = useNavigate()
  const { data: user } = useGetIdentity<
    IUser & { email: string; userid: string }
  >()
  const { id } = useParams()
  const { mutate: deleteProperty } = useDelete()
  const {
    queryResult: { data, isLoading, isError },
  } = useShow()
  const [isSold, setIsSold] = useState(false)

  const propertyDetails = data?.data ?? {}
  const isCurrentUser = user?.email === propertyDetails.creator?.email

  useEffect(() => {
    getSale(id).then((res) => setIsSold(res))
  }, [id])

  const handleDeleteProperty = () => {
    const response = confirm('Are you sure you want to delete this property?')
    if (response) {
      deleteProperty(
        { resource: 'properties', id: id as string },
        {
          onSuccess: () => {
            navigate('/properties')
          },
        }
      )
    }
  }

  const handleSaleProperty = async () => {
    const response = confirm('Are you sure you want to buy this property?')
    if (response) {
      await createSale(propertyDetails.price, id, user?.userid).then((res) =>
        setIsSold(res)
      )
    }
  }

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error</Typography>

  return (
    <Box borderRadius="15px" padding="20px" bgcolor="#fcfcfc" width="100%">
      <Typography fontSize={25} fontWeight={700} color="#1142d">
        Details
      </Typography>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={2} width="100%">
        <Box
          mt="20px"
          display="flex"
          flexDirection={{ xs: 'column', lg: 'row' }}
          gap={4}
          width="100%"
        >
          <Box flex={1} maxWidth={764}>
            <img
              src={propertyDetails.photo}
              alt={propertyDetails.title}
              height={'auto'}
              style={{ objectFit: 'contain', borderRadius: '10px' }}
              className="property_details-img"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width="fit-content"
          >
            <Box
              width="100%"
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
                width="100%"
              >
                <Avatar
                  src={propertyDetails.creator.avatar}
                  alt={propertyDetails.creator.name}
                  sx={{ width: '90px', height: '90px' }}
                />
                <Typography
                  mt={1}
                  fontSize={18}
                  fontWeight={600}
                  color="#1142d"
                >
                  {propertyDetails.creator.name}
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
                <Stack
                  mt={4}
                  direction="row"
                  alignItems="center"
                  gap={2}
                  width="100%"
                >
                  {isCurrentUser ? (
                    <>
                      <CustomButton
                        title="edit"
                        handleClick={() => navigate(`/properties/edit/${id}`)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        icon={<Edit />}
                        disabled={isSold}
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
                    <Box display="flex" gap="12px" flexDirection="column">
                      <CustomButton
                        fullWidth
                        title="Contact Agent"
                        handleClick={() =>
                          navigate(
                            `../../agents/show/${propertyDetails.creator._id}`,
                            {
                              replace: true,
                            }
                          )
                        }
                        backgroundColor="#00cd65"
                        color="#fcfcfc"
                        icon={<Chat />}
                      />
                      <CustomButton
                        fullWidth
                        title="buy now"
                        handleClick={handleSaleProperty}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        icon={<Home />}
                        disabled={isSold}
                      />
                    </Box>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Stack>
      <Box mt="15px">
        <Stack direction="row" alignItems="center" gap="12px">
          <Typography
            fontSize={18}
            fontWeight={500}
            color="#1142d"
            textTransform="capitalize"
          >
            {propertyDetails.propertyType}
          </Typography>
          <Chip
            label={isSold ? 'SOLD' : 'AVAILABLE'}
            color={isSold ? 'error' : 'success'}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box mt="16px">
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
                {propertyDetails.price} RON
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Box mt="16px">
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
  )
}

export default PropertyDetails
