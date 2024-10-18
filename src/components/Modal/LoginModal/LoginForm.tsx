import { useAuthContext } from '@/auth/AuthContext'
import { API_LOGIN_PATH } from '@/config/constants'
import { SECRET_KEY } from '@/config/env'
import axiosInstance from '@/lib/axios'
import Button from '@/ui/Button'
import FormikInput from '@/ui/Form/FormInput'
import { getErrorMessage } from '@/utils/get-error-msg'
import { isCancel } from 'axios'
import CryptoJS from 'crypto-js'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải nhiều hơn 4 kí tự.')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Mật khẩu có ít nhất 1 số và 1 kí tự đặt biệt.')
    .required('Vui lòng nhập password.'),
})

let controller: AbortController

interface LoginFormProps {
  onHide: () => void
}

const LoginForm: FC<LoginFormProps> = ({ onHide }) => {
  const [isLoading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const { setUser } = useAuthContext()

  const formik = useFormik({
    initialValues: { email: 'nghialamngocit@gmail.com', password: 'Today@2023V14' },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        controller?.abort()
        controller = new AbortController()
        setLoading(true)
        if (!SECRET_KEY) {
          setErrMsg('Có lỗi sảy ra vui lòng thử lại sau.')
          return
        }

        setErrMsg('')
        // Hash password và mã hóa email
        const hashedPassword = CryptoJS.HmacSHA256(password, SECRET_KEY).toString()

        const { data } = await axiosInstance.post(
          API_LOGIN_PATH,
          {
            email,
            password: hashedPassword,
          },
          {
            signal: controller.signal,
          },
        )

        if (data.user) {
          setUser(data.user)
          onHide()
        }
      } catch (err) {
        if (!isCancel(err)) {
          setErrMsg(getErrorMessage(err) ?? 'Có lỗi xảy ra vui lòng thử lại.')
        }
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
  )
}

export default LoginForm
