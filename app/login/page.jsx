"use client"

import axios from "axios"
import { useEffect } from "react"



export default function Login() {
  useEffect(() => {
    axios.get('http://localhost:4000/user').then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log('masuk')
      console.log(err)
    })
  }, [])

  return (
    <div>Login</div>
  )
}
