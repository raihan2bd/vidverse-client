"use client"
import {FormEvent} from 'react'

const Login = () => {
  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {

      const res = await fetch("http://localhost:4000/api/v1/auth/login", {method: 'POST'})
      const result = await res.json()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return <form onSubmit={formSubmitHandler}>
    <button type="submit">Login</button>
  </form>
}

export default Login;