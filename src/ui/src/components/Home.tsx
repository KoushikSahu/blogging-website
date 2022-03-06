import Blogs from "./Blogs";
import Profile from "./Profile";
import { useEffect, useState } from 'react';
import { TokenResponse } from './interface';

function Home(): JSX.Element {
  let [firstname, setFirstname] = useState<string>('');
  let [lastname, setLastname] = useState<string>('');
  let [email_id, setEmailID] = useState<string>('');
  let [username, setUsername] = useState<string>('');

  useEffect((): void => {
    let url: string = `http://localhost:5000/info`
    let postBody: TokenResponse = {
      token: localStorage.getItem('blogToken')
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(res=>res.json())
    .then(data=>{
      setFirstname(data['firstname'])
      setLastname(data['lastname'])
      setEmailID(data['email_id'])
      setUsername(data['username'])
      }).catch(() => {
        window.alert('User token is not legitimate')
        localStorage.removeItem('blogToken')
        window.location.href = 'http://localhost:3000/'
      })
  }, [])

  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="col-span-2 ml-72 mr-5 mt-14">
          {username.length != 0 ? <Blogs firstname={firstname} lastname={lastname} email_id={email_id} username={username} /> : <></>}
        </div>
        <div className="col-span-1 ml-5 mr-72 mt-20 h-screen">
          <Profile firstname={firstname} lastname={lastname} email_id={email_id} username={username} />
        </div>
      </div>
    </div>
  )
}

export default Home;

