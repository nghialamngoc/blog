import { SERVER_REGISTER_PATH } from '@/config/constants'
import { SECRET_KEY } from '@/config/env'
import Button from '@/ui/Button'
import FormikInput from '@/ui/Form/FormInput'
import { getErrorMessage } from '@/utils/get-error-msg'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải nhiều hơn 4 kí tự.')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Mật khẩu có ít nhất 1 số và 1 kí tự đặt biệt.')
    .required('Vui lòng nhập password.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Password không khớp.')
    .required('Vui lòng nhập confirm password.'),
})

const RegisterForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        setLoading(true)
        if (!SECRET_KEY) {
          setErrMsg('Có lỗi sảy ra vui lòng thử lại sau.')
          return
        }

        setErrMsg('')
        // Hash password và mã hóa email
        const hashedPassword = CryptoJS.HmacSHA256(password, SECRET_KEY).toString()

        await axios.post(SERVER_REGISTER_PATH, {
          email,
          password: hashedPassword,
        })
      } catch (err) {
        setErrMsg(getErrorMessage(err) ?? 'Có lỗi xảy ra vui lòng thử lại.')
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    setErrMsg('')
  }, [formik.values])

  return (
    <FormikProvider value={formik}>
      <Form className="flex flex-col gap-16" onSubmit={formik.handleSubmit} noValidate>
        <FormikInput className="text-14" name="email" type="email" placeholder="Email" />
        <FormikInput className="text-14" name="password" type="password" placeholder="Password" />
        <FormikInput className="text-14" name="confirmPassword" type="password" placeholder="Confirm Password" />
        <Button
          design="v1"
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className="h-40 bg-orange-400 text-white hover:text-black"
        >
          Đăng nhập
        </Button>
        {errMsg && <div className="text-red-700 text-14">{errMsg}</div>}
      </Form>
    </FormikProvider>
  )
}

export default RegisterForm
