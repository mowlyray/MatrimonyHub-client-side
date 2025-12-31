import { use, useState } from 'react';
import { Link, NavLink } from 'react-router';
import logoimage from '../../../assets/logo.png';
import { AuthContext } from '../../../provider/AuthProvider';
import { toast } from 'react-toastify';
// import useUserRole from '../hooks/useUserRole';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

   const {user,logOut} = use(AuthContext);
  //  const { role } = useUserRole();

  const handleLogOut = () => {
    console.log("user trying to LogOut");
    logOut()
      .then(() => {
        toast.success(" Logged Out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-[#E91E63] font-semibold px-3 py-2 border-b-2 border-[#AD1457]'
      : 'text-[#E91E63] hover:text-[#AD1457] font-medium px-3 py-2';

  return (
    <nav className="bg-white p-1 border-b border-[#F8BBD0] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-0">
            <img className='w-[50px] lg:w-[60px] mr-0' src={logoimage} alt="logo" />
            <Link to="/" className="text-2xl font-bold text-[#E91E63]">
              Matrimony<span className="text-[#AD1457]">Hub</span>
            </Link>
          </div>

          {/* Center: Nav Links (md and above) */}
          <div className="hidden text-lg md:flex items-center gap-4">
            <NavLink to="/" className={navLinkStyle}>Home</NavLink>
            <NavLink to="/biodatas" className={navLinkStyle}>Biodatas</NavLink>
            <NavLink to="/about" className={navLinkStyle}>About Us</NavLink>
            <NavLink to="/contact" className={navLinkStyle}>Contact Us</NavLink>
            {user && (
  <NavLink
    to="/dashboard"
    className={navLinkStyle}
  >
    Dashboard
  </NavLink>
)}
          </div>

          {/* Right: Login/Logout + Hamburger */}
          <div className="flex items-center gap-2">
            {user ? (
              <>

             <div className="relative group">
             <img  src={user.photoURL} alt="User" className="w-10 h-10 rounded-full  cursor-pointer" />
              <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             {user.displayName}

             </div>

            </div>

               <button
                onClick={handleLogOut}
                className="bg-[#E91E63] text-white px-4 py-2 rounded hover:bg-[#AD1457] transition duration-300 text-sm md:text-base"
              >
                Logout
              </button>
              </>
             
            ) : (
              <NavLink
                to="/auth/login"
                className="bg-[#E91E63] text-white px-4 py-2 rounded hover:bg-[#AD1457] transition duration-300 text-sm md:text-base lg:mr-8"
              >
                Login
              </NavLink>
            )}

            {/* Hamburger button for mobile */}
            <div className="md:hidden ml-2">
              <button onClick={() => setIsOpen(!isOpen)}>
                <svg
                  className="w-6 h-6 text-[#E91E63]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-2 py-4">
            <NavLink to="/" className={navLinkStyle}>Home</NavLink>
            <NavLink to="/biodatas" className={navLinkStyle}>Biodatas</NavLink>
            <NavLink to="/about" className={navLinkStyle}>About Us</NavLink>
            <NavLink to="/contact" className={navLinkStyle}>Contact Us</NavLink>
            {user && <NavLink to="/dashboard" className={navLinkStyle}>Dashboard</NavLink>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
