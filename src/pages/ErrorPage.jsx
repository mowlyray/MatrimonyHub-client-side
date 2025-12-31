import React from 'react';
import { Link } from 'react-router';
import errorimg from '../assets/error-img.jpg'

const ErrorPage = () => {
    return (
        <div className=' h-screen'>
       <div className='flex flex-col justify-center items-center mt-10'>
        <img src={errorimg} alt="" className='w-[340px] rounded-2xl shadow '/>
        <h3 className='text-2xl text-red-400 font-bold mt-2'>404 Page Not Found</h3>
        <p className='mt-4 font-medium'>Oops! The page you're looking for doesn't exist</p>
        <Link to='/'>
        <button className='bg-[#176AE5] text-white font-bold text-xl px-[20px] py-[10px] mt-4 rounded-md cursor-pointer'>
            Go Back Home
        </button>
        </Link>
    </div>
        </div>
       
    );
};

export default ErrorPage;