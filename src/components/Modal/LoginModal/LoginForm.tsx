import Button from '@/ui/Button'
import FormikInput from '@/ui/Form/FormInput'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import CryptoJS from 'crypto-js'
import { SECRET_KEY } from '@/config/env'

const validationSchema = Yup.object({
  email: Yup.string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải nhiều hơn 4 kí tự.')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Mật khẩu có ít nhất 1 số và 1 kí tự đặt biệt.')
    .required('Vui lòng nhập password.'),
})

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: ({ email, password }) => {
      if (!SECRET_KEY) {
        setErrMsg('Có lỗi sảy ra vui lòng thử lại sau.')
        return
      }

      setErrMsg('')
      // Hash password và mã hóa email
      const hashedPassword = CryptoJS.HmacSHA256(password, SECRET_KEY).toString()

      const processedValues = {
        email,
        password: hashedPassword,
      }
      console.log('processedValues', processedValues)

      // setLoading(true)
    },
  })

  useEffect(() => {
    setErrMsg('')
  }, [formik.values])

  return (
    <FormikProvider value={formik}>
      <Form className="flex flex-col gap-12" onSubmit={formik.handleSubmit} noValidate>
        <FormikInput name="email" type="email" placeholder="Email" />
        <FormikInput name="password" type="password" placeholder="Password" />
        <Button
          design="v1"
          type="submit"
          disabled={loading}
          className="mt-4 h-40 bg-orange-400 text-white hover:text-black"
        >
          Đăng nhập
        </Button>
        {errMsg && <div className="mt-4 text-red-700 text-14">{errMsg}</div>}
      </Form>
    </FormikProvider>
  )
}

export default LoginForm
