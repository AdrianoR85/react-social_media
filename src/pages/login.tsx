import { auth, provider} from '../server/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result =  await signInWithPopup(auth, provider)
    console.log(auth.currentUser?.photoURL)
    console.log(result);
    navigate('/')
  }

  return(
    <div className="container">
      <p>Sign In With Google to Continue</p>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  )
}