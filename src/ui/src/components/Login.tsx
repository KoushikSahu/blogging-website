import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { config } from './config'
import { LoginCredential } from './interface'
import './login.css'

function getToken(username: string, password: string) : void {
  let postBody: LoginCredential = {
    username: username,
    password: password
  }

  let url: string = `${config.api_address}/login`
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(postBody),
    headers: new Headers({'Content-Type': 'application/json'})
  }).then(res => res.json())
  .then(data => {
    localStorage.setItem('blogToken', data.token)
    window.location.href = 'http://localhost:3000/home'
  })
  .catch(() => window.alert('User not found or password not correct'))
}

function Login(): JSX.Element {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  let handleUsername = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    setUsername(newValue)
  }

  let handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    setPassword(newValue)
  }

  let handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    getToken(username, password)
  }

  if(!mounted){
    if(localStorage.getItem('blogToken') != null){
      window.location.href = 'http://localhost:3000/home'
    }
  }

  useEffect(() =>{
    setMounted(true)
  },[])

  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="h-screen flex items-center justify-center bg-zinc-200 px-7 relative rounded-b-3xl drop-shadow-sm lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-bl-none lg:drop-shadow-2xl">
        <div className="font-nanum text-center text-2xl md:text-5xl lg:text-4xl text-zinc-700 intro-text p-10">
          Hello there, this is the place to share your
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-5 md:w-5 lg:hidden absolute inset-x-1/2 top-3/4 animate-ping" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div className="h-screen flex items-center justify-center">
        <form className="md:scale-150 lg:scale-110 border-2 border-solid border-zinc-400 py-10 px-5 rounded-xl" onSubmit={handleSubmit} >
          <label>
            Username <br />
            <input type="text" name="username" onChange={handleUsername} className="bg-zinc-200 rounded-md px-1.5" />
          </label>
          <br />
          <label>
            Password <br/>
            <input type="password" name="password" onChange={handlePassword} className="bg-zinc-200 rounded-md px-1.5" />
          </label>
          <br /><br />
          <div className="grid grid-cols-2 gap-4">
            <input type="submit" className="text-zinc-300 py-0.5 px-2 rounded-md bg-zinc-700" />
            <Link to='/signup' className="text-zinc-300 py-0.5 px-2 rounded-md bg-zinc-700 text-center">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;

