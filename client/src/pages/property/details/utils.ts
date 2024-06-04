import axios from 'axios'

export const getSale = async (id: string | undefined) => {
  if (!id) return false

  const { data } = await axios.get(`http://localhost:8080/api/v1/sales/${id}`)
  return !!data
}

export const getRandomInt = (max: number) => {
  const res = Math.floor(Math.random() * max + 1)

  if (res < 10) return '0' + res
  return res
}

export const createSale = async (
  price: string,
  propertyId: string | undefined,
  userId: string | undefined,
  date = '02.03.2024'
) => {
  const { data } = await axios.post('http://localhost:8080/api/v1/sales', {
    price,
    propertyId,
    userId,
    date,
  })
  return !!data
}
