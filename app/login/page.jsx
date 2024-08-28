"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import Input from "../components/Input"
import FillButton from "../components/FillButton"
import Link from "next/link"
import { useRouter } from "next/navigation"



export default function Login() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  function handleInputEmail(e) {
    setFormData({ ...formData, email: e.target.value })
  }

  function handleInputPass(e) {
    setFormData({ ...formData, password: e.target.value })
  }

  function handleLogin() {
    setIsLoading(true)
    axios.get(`https://my-json-server.typicode.com/ahmadhilmandani/fake-API-Auth/user?email=${formData.email}&_password=${formData.password}`)
      .then((res) => {
        localStorage.setItem('email', res.data[0].email)
        router.push('/')
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setIsLoading(false)
      })
  }


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-[720px] w-full card">
        <h1 className="text-center mb-2">Login</h1>
        <p className="max-w-[400px] w-full mx-auto text-center mb-8">
          Selamat Datang di <strong><i className="text-sky-500">CEKIR</i></strong> , Tolong Login dulu ya 🙏
        </p>
        <div className="max-w-[320px] w-full mx-auto">
          <Input
            labelProp={'Email'}
            idProp={'email'}
            placeholderProp={'email untuk testing: sate@ayam.com'}
            inputType={'email'}
            inputVal={formData.email}
            handleOnInput={handleInputEmail}
          />
        </div>
        <div className="max-w-[320px] w-full mx-auto my-4">
          <Input
            labelProp={'Password'}
            idProp={'password'}
            placeholderProp={'password untuk testing: 123'}
            inputType={'password'}
            inputVal={formData.password}
            handleOnInput={handleInputPass}
          />
        </div>
        <div className="max-w-[320px] w-full mx-auto mb-8">
          <FillButton buttonStyle="primary" handleOnClick={handleLogin} isLoading={isLoading}>
            Login
          </FillButton>
        </div>
        <small className="block w-fit mx-auto text-[13px]">
          Belum punya akun? <Link href={'/register'} className="text-sky-500 text-[13px] hover:font-semibold transition-all">Register di sini!</Link>
        </small>
      </div>
    </div>
  )
}
