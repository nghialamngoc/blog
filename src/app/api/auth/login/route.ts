import { SERVER_LOGIN_PATH } from '@/config/constants'
import axios from 'axios'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const result = await axios.post(SERVER_LOGIN_PATH, {
    email,
    password,
  })

  return Response.json({
    ...result,
  })
}
