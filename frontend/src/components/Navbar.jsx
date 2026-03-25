import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>

            <img
                onClick={() => navigate('/')}
                className='w-44 cursor-pointer'
                src={assets.logo}
                alt="logo"
            />

            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
                <NavLink to='/doctors'><li className='py-1'>ALL DOCTORS</li></NavLink>
                <NavLink to='/about'><li className='py-1'>ABOUT</li></NavLink>
                <NavLink to='/contact'><li className='py-1'>CONTACT</li></NavLink>
            </ul>

            <div className='flex items-center gap-4'>

                {
                    token && userData
                        ? (
                            <div className='flex items-center cursor-pointer gap-2 group relative'>
                                <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt="" />
                                <img className='w-2.5' src={assets.dropdown_icon} alt="" />

                                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-md'>
                                        <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                        <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <button
                                onClick={() => navigate('/login')}
                                className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
                            >
                                Create Account
                            </button>
                        )
                }

                <img
                    onClick={() => setShowMenu(true)}
                    className='w-6 md:hidden cursor-pointer'
                    src={assets.menu_icon}
                    alt=""
                />
            </div>

            {
                showMenu && (
                    <div
                        className="fixed inset-0 bg-black/30 z-10"
                        onClick={() => setShowMenu(false)}
                    />
                )
            }

            <div className={`fixed top-0 right-0 bottom-0 w-full md:hidden z-20 bg-white transform transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className='flex items-center justify-between px-5 py-6 border-b'>

                    <img
                        onClick={() => {
                            navigate('/');
                            setShowMenu(false);
                        }}
                        className='w-36 object-contain cursor-pointer'
                        src={assets.logo}
                        alt="logo"
                    />

                    <img
                        className='w-7 cursor-pointer'
                        onClick={() => setShowMenu(false)}
                        src={assets.cross_icon}
                        alt=""
                    />
                </div>

                <ul className='flex flex-col items-center gap-4 mt-6 px-5 text-lg font-medium'>
                    <NavLink onClick={() => setShowMenu(false)} to='/'>
                        <p className='px-4 py-2 rounded hover:bg-gray-100'>HOME</p>
                    </NavLink>

                    <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
                        <p className='px-4 py-2 rounded hover:bg-gray-100'>ALL DOCTORS</p>
                    </NavLink>

                    <NavLink onClick={() => setShowMenu(false)} to='/about'>
                        <p className='px-4 py-2 rounded hover:bg-gray-100'>ABOUT</p>
                    </NavLink>

                    <NavLink onClick={() => setShowMenu(false)} to='/contact'>
                        <p className='px-4 py-2 rounded hover:bg-gray-100'>CONTACT</p>
                    </NavLink>
                </ul>
            </div>

        </div>
    )
}

export default Navbar