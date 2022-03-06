import { config } from "./config"
import { useState } from "react"
import { SignUpCredential } from "./interface"

function SignUp(): JSX.Element {
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [email_id, setEmailID] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  let handleFirstname = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    setFirstname(newValue)
  }

  let handleLastname = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    setLastname(newValue)
  }

  let handleEmaidID = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    setEmailID(newValue)
  }

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
    let signUpData: SignUpCredential = {
      firstname: firstname,
      lastname: lastname,
      email_id: email_id,
      username: username,
      password: password
    }

    const requestOptions: RequestInit  = {
      method: 'POST',
      body: JSON.stringify(signUpData),
      headers: new Headers({'Content-Type': 'application/json'})
    }
    let url: string = `${config.api_address}/signup`

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(token_response => {
        console.log(token_response)
        localStorage.setItem('blogToken', token_response.token)
        window.location.href = 'http://localhost:3000/'
      }).catch(() => window.alert('Username not unique'))
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form className="md:scale-150 lg:scale-110 border-2 border-solid border-zinc-400 py-10 px-20 rounded-xl" onSubmit={handleSubmit}>
        <label>
          Firstname <br />
          <input type="text" name="firstname" className="bg-zinc-200 rounded-md px-1.5" onChange={handleFirstname} />
        </label>
        <br />
        <label>
          Lastname <br/>
          <input type="text" name="lastname" className="bg-zinc-200 rounded-md px-1.5" onChange={handleLastname}/>
        </label>
        <br />
        <label>
          Email Address <br/>
          <input type="text" name="email_id" className="bg-zinc-200 rounded-md px-1.5" onChange={handleEmaidID} />
        </label>
        <br />
        <label>
          Username <br/>
          <input type="text" name="username" className="bg-zinc-200 rounded-md px-1.5" onChange={handleUsername} />
        </label>
        <br />
        <label>
          Password <br/>
          <input type="password" name="password" className="bg-zinc-200 rounded-md px-1.5" onChange={handlePassword}/>
        </label>
        <br /><br />
        <div className="grid grid-cols-2 gap-4">
          <input type="submit" className="text-zinc-300 py-0.5 px-2 rounded-md bg-zinc-700" />
        </div>
      </form>
    </div>
  )
}

export default SignUp;

