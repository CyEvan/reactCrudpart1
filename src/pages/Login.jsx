import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "./firebaseConfig";
import { useState } from 'react';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

        if (email !== '' && password !== '') {

            const auth = getAuth(firebaseApp);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    alert("Signed in!");
                    // ...
                })
                .catch((error) => {
                    alert("error!");
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        } else {
            alert("Incorrect or missing credentials!")
        }
    }



    return (
        <div className="container border p-5 rounded">
            <h1 className="fw-bold">Login</h1>
            <p>Enter yout email and password to login.</p>
            <label htmlFor="email">Email</label>

            <input id="text" type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label htmlFor="password" className="mt-3">Password</label>
            <input id="text" type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="btn btn-dark mt-3" onClick={() => handleLogin()} >Login</button>
            <hr />
            <Link to="login" >Don't have an account? Register here</Link>
        </div>

    )
}
export default Login;