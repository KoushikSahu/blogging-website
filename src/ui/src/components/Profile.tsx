import default_user from '../assets/img/default_user.png'
import { UserInfo } from './interface'

function Profile(props: UserInfo): JSX.Element {

  let signOut = (): void => {
    localStorage.removeItem('blogToken')
    window.location.href = 'http://localhost:3000/'
  }

  return (
    <div className="border-2 rounded-3xl relative">
      <div className="flex w-full justify-center">
        <img src={default_user} alt="user pic" className="absolute max-h-20 rounded-full -top-10" />
      </div>
      <div className="mt-14 flex justify-center w-full font-bold">
        {props.firstname} {props.lastname}
      </div>
      <div className="flex justify-center w-full">
        @{props.username}
      </div>
      <div className="flex justify-center w-full">
        {props.email_id}
      </div>
      <div className="w-full flex justify-center mt-5 mb-5">
        <button className="bg-red-500 text-white rounded px-2 py-1" onClick={signOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default Profile;

