import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';

const Login = () => {

  const [error, setError] = useState("");
  const { signIn } = use(AuthContext);
  const { signInWithGoogle } = use(AuthContext)

  const location = useLocation();

   let x;

  if(location.state){
   x= location.state;
  }

  
  const navigate = useNavigate();

   const handleGoogleLogin = () => {
    signInWithGoogle()
    .then((result) => {
        console.log(result)
        toast("Google Login successful");
        navigate(location.state || '/')
    })
    .catch(err=> {
        console.log(err);
        toast.error("Google Sign-In Failed");
    })
  }

  const handleLogin =(e) =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("Login successful");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        toast.error("Login failed "); 
      });
  }
  
  return (
    <div className="min-h-screen bg-[#FCE4EC] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#AD1457] mb-6">Welcome Back!</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>

             {/* email */}
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name='email'
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            {/* password */}
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
            name='password'
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
              placeholder="Enter your password"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#AD1457] text-white py-2 rounded-md hover:bg-[#880E4F] transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-[#FCE4EC] mt-4 border border-gray-300 flex items-center justify-center py-2 rounded-md hover:bg-gray-100 transition"
        >
         <FaGoogle className='mr-2 p'></FaGoogle> Sign in with Google
        </button>

        <p className='font-semibold text-sm text-center pt-5'>Don't Have An Account? <Link className=' text-[#AD1457] text-sm hover:underline' state={x ? x : ""} to='/auth/register'>Register</Link>
          </p>
      </div>
    </div>
  );
};

export default Login;
