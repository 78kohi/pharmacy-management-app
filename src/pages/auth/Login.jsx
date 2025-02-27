import { LoginForm } from '@/components/login-form'
import { Pill } from 'lucide-react'

const Login = () => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center h-screen'>
      <div className="flex flex-col items-center gap-3 p-2">
        <div className="flex gap-5">
          <div className="grid place-items-center bg-zinc-800 p-1 size-[35px] rounded-lg">
            <Pill className="text-gray-100" />
          </div>
          <h1 className="text-2xl font-semibold">Pharma</h1>
        </div>
        <p className="text-black/60">A pharmacy management system.</p>
        </div>
      <LoginForm />
    </div>
  )
}

export default Login