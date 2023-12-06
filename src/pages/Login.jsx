import {Link} from 'react-router-dom';
import { getAuth, signUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "./firebaseConfig";

function Login(){
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


     const login = () => {
        const auth = getAuth();
        signUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
            }

    return(
    <div className="container border p-5 rounded">
        <h1 className="fw-bold">Login</h1>
        <p>Enter yout email and password to login.</p>
        <label htmlFor="email">Email</label>
        <input id="text" type="email" className="form-control" />
        <label htmlFor="password" className="mt-3">Password</label>
        <input id="text" type="password" className="form-control" />
        <button className="btn btn-dark mt-3">Login</button>
        <hr />
        <Link to="login" >Don't have an account? Register here</Link>
    </div>
      
    )
}
export default Login;