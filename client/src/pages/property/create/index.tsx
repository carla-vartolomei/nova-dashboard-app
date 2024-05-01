import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldValues } from 'react-hook-form'
import { useForm } from '@refinedev/react-hook-form'
import { useGetIdentity } from '@refinedev/core'
import { Form } from '../../../components'

const CreateProperty = () => {
  const [propertyImage, setPropertyImage] = useState({ name: '', url: '' })
  const { data: user }: any = useGetIdentity()
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
    if (!propertyImage.name) return alert('Please select an image')

    await onFinish({ ...data, photo: propertyImage.url, email: user.email })
  }

  return (
    <Form
      type="Post"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleCancel={() => navigate('/properties')}
      propertyImage={propertyImage}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
    />
  )
}

export default CreateProperty
