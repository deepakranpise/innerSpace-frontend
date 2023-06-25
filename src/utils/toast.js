import toast from 'react-hot-toast'

const successToast = (text, position = 'top-center') =>
  toast.success(text, {
    position
  })

const errorToast = (text, position = 'top-center') =>
  toast.error(text, {
    position
  })

export { successToast, errorToast }
