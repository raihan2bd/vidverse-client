"use client"
import {FormEvent} from 'react'
import axios from 'axios'

const Login = () => {
  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {

      axios.defaults.withCredentials = true

      const res = await axios.post("http://localhost:4000/api/v1/auth/login", {})
      // const result = await res.json()
      // console.log(result)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return <form onSubmit={formSubmitHandler}>
    <button type="submit">Login</button>
  </form>
}

export default Login;