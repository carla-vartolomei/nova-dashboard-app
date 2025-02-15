export interface CustomButtonProps {
  type?: string
  title: string
  backgroundColor: string
  color: string
  fullWidth?: boolean
  icon?: ReactNode
  disabled?: boolean
  handleClick?: () => void
}

export interface ProfileProps {
  type: string
  name: string
  avatar: string
  email: string
  properties: Array | undefined
}

export interface PropertyProps {
  _id: string
  title: string
  description: string
  location: string
  price: string
  photo: string
  creator: string
}

export interface FormProps {
  type: string
  register: any
  formLoading: boolean
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined
  handleCancel: () => void
  handleImageChange: (file) => void
  onFinishHandler: (data: FieldValues) => Promise<void> | void
  propertyImage: { name: string; url: string }
}
