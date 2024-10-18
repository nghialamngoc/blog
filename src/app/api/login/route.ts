import { API_LOGIN_PATH } from '@/config/constants'
import axiosInstance from '@/lib/axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  const { data } = await axiosInstance.post(API_LOGIN_PATH, {
    email,
    password,
  })

  const response = NextResponse.json(data)

  // // Set a cookie
  // response.cookies.set({
  //   name: process.env.NEXT_PUBLIC_RFTK_KEY ?? '',
  //   value: data.refreshToken,
  //   httpOnly: true,
  //   secure: true,
  //   path: '/',
  //   sameSite: 'lax',
  // })

  return response
}
