import React, { use, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';
import image1 from '../assets/register-image1.jpg';
import image2 from '../assets/register-image2.jpg'
import { motion } from "framer-motion";



const Register = () => {

     const {createUser, setUser,  updateUser} = use(AuthContext);
   const [nameError, setNameError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const { signInWithGoogle } = use(AuthContext);
   
   const navigate = useNavigate();
   const location = useLocation();

    const handleGoogleLogin = () => {
    signInWithGoogle()
    .then((result) => {
        console.log(result)
        toast.success("Google Login successful!");
        navigate(location.state || '/')
    })
    .catch(err=> {
        console.log(err)
    })
  }

  const handleRegister = (e) =>{

    e.preventDefault();
    console.log(e.target);
    const form = e.target;

    const name = form.name.value;

    // Name validation
    if (name.length < 5) {
      setNameError("Name should be more then 5 character");
      return;
    } else {
      setNameError("");
    }

    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const lengthCheck = password.length >= 6;

    if (!uppercase || !lowercase || !lengthCheck) {
      let msg = "❌ Password must contain:\n";
      if (!uppercase) msg += "• At least one uppercase letter\n";
      if (!lowercase) msg += "• At least one lowercase letter\n";
      if (!lengthCheck) msg += "• Minimum 6 characters";
      setPasswordError(msg);
      toast.error(" Password must have uppercase, lowercase & 6+ chars");
      return;
    } else {
      setPasswordError("");
    }
     // Create user
    createUser(email,password).then((result) => {
      const user=result.user;
       updateUser({ displayName: name, photoURL: photo })
      .then((result) => {
        console.log(result)
            setUser({ ...user, displayName: name, photoURL: photo });
           navigate(location.state || '/')
            toast.success("Login successful!");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
    })
    .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(` Login failed: ${errorMessage}`);
  });
};

    return (

        <div className='grid grid-cols-1 md:grid-cols-2'>

            <div className='flex-1'>
          <motion.img src={image1}
        animate={{y: [0, 50, 0]}}
        transition={{duration:5, repeat:Infinity}}
        className="w-2/3 mt- max-w-xs border-blue-500 border-s-2 border-b-2 rounded-lg shadow-2xl"
        />

        <motion.img src={image2}
        animate={{x: [100, 150, 100]}}
        transition={{duration:5, repeat:Infinity}}
        className="w-2/3 ml-20 max-w-xs border-blue-500 border-s-2 border-b-2 rounded-lg shadow-2xl"
        />
        </div>


             <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-pink-700 mb-6">Create Your Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>

             {/* name */}
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" type="text" required className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300" />
            {nameError && <p className="text-xs text-red-600 mt-1">{nameError}</p>}
          </div>

          {/* photo url*/}

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input name="photo" type="text" required className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300" />
          </div>

          {/* email */}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" type="email" required className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300" />
          </div>

          {/* password */}

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input name="password" type="password" required className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300" />
            {passwordError && <p className="text-xs text-red-600 mt-1 whitespace-pre-line">{passwordError}</p>}
          </div>

          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition">Register</button>
        </form>

        <div className="text-center mt-4 text-gray-600">OR</div>

        <button onClick={handleGoogleLogin} className="w-full mt-4 border border-gray-300 flex items-center justify-center py-2 rounded-md hover:bg-gray-100 transition">
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>

        <p className="text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-pink-600 hover:underline font-medium">LogIn</Link>
        </p>
      </div>
    </div>

        </div>
       
    );
};

export default Register;