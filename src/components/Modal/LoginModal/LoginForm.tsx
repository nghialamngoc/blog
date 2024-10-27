import { useAuthContext } from '@/auth/AuthContext'
import { SECRET_KEY } from '@/config/env'
import Button from '@/ui/Button'
import Divider from '@/ui/Divider'
import FormikInput from '@/ui/Form/FormInput'
import GoogleIcon from '@/ui/Icons/GoogleIcon'
import { getErrorMessage } from '@/utils/get-error-msg'
import { useGoogleLogin } from '@react-oauth/google'
import CryptoJS from 'crypto-js'
import { Form, FormikProvider, useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải nhiều hơn 4 kí tự.')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Mật khẩu có ít nhất 1 số và 1 kí tự đặt biệt.')
    .required('Vui lòng nhập password.'),
})

interface LoginFormProps {
  onHide: () => void
}

const LoginForm: FC<LoginFormProps> = ({ onHide }) => {
  const [isLoading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const { loginWithEmail } = useAuthContext()

  const { loginWithGoogle } = useAuthContext()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true)
        setErrMsg('')
        // Gọi API backend với token từ Google
        await loginWithGoogle(tokenResponse.access_token)
        onHide()
      } catch (error) {
        console.error('Google login failed:', error)
      } finally {
        setLoading(false)
      }
    },
    onError: (error) => {
      console.error('Google login error:', error)
    },
  })

  const formik = useFormik({
    initialValues: { email: 'nghialamngocit@gmail.com', password: 'Today@2023V14' },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        setLoading(true)
        setErrMsg('')

        const hashedPassword = CryptoJS.HmacSHA256(password, SECRET_KEY).toString()
        await loginWithEmail(email, hashedPassword)

        onHide()
      } catch (err) {
        setErrMsg(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    setErrMsg('')
  }, [formik.values])

  return (
    <div>
      <Button design="v1" onClick={handleGoogleLogin} className="mb-16 w-full h-[40px]">
        <div className="flex gap-8">
          <GoogleIcon width={22} height={22} /> Google
        </div>
      </Button>
      <Divider>Hoặc</Divider>
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-12" onSubmit={formik.handleSubmit} noValidate>
          <FormikInput className="text-14" name="email" type="email" placeholder="Email" />
          <FormikInput className="text-14" name="password" type="password" placeholder="Password" />
          <Button
            design="v1"
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="mt-4 h-40 bg-orange-400 text-white hover:text-black"
          >
            Đăng nhập
          </Button>
          {errMsg && <div className="mt-4 text-red-700 text-14">{errMsg}</div>}
        </Form>
      </FormikProvider>
    </div>
  )
}

export default LoginForm
