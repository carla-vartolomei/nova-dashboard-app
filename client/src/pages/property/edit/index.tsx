import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@refinedev/react-hook-form'
import { useGetIdentity } from '@refinedev/core'
import { Form } from '../../../components'
import { IUser } from '../../../components/header'

const EditProperty = () => {
  const [propertyImage, setPropertyImage] = useState({ name: '', url: '' })
  const { data: user } = useGetIdentity<IUser & { email: string }>()
  const navigate = useNavigate()
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm()

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = () => resolve(fileReader.result as string)
        fileReader.readAsDataURL(readFile)
      })

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    )
  }

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert('Please upload a property image')

    await onFinish({
      ...data,
      photo: propertyImage.url,
      email: user?.email,
      monthsBooked: false,
    })
  }

  return (
    <Form
      type="Edit"
      register={register}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleCancel={() => navigate('/properties')}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  )
}

export default EditProperty
