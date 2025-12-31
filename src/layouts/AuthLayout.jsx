import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';

const AuthLayout = () => {
    return (
        <div className=''>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='w-11/12 mx-auto py-5'>
            <Outlet></Outlet>
            </main>
            
        </div>
    );
};

export default AuthLayout;