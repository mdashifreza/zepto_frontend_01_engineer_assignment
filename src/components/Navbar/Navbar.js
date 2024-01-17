import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-purple-900 p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">
                        <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/6.21.1/images/logo.svg" alt="log"/>
                    </div>
                    <div className="flex items-center space-x-8">
                        <button className='text-white font-semibold'>Login</button>
                        <button className='text-xl text-white bg-rose-500 p-2 px-5 rounded'>My Cart</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
