import { NavBar } from "./navbar";
import { auth } from "../server/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import '../style/header.css'

export function Header() {
  const navigate = useNavigate()
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <header>
      <NavBar user={user}/>
      <div className="user-container">
        {user && ( 
        <>
          <div className="user-profile">
            <span>{user?.displayName}</span>
            <img src={user?.photoURL || ''} alt="my photo" />
          </div>
          <button onClick={signUserOut}>Logout</button>
        </>
        )}
      </div>
    </header>
  );
}