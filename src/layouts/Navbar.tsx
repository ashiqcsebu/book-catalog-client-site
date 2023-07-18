import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/users/usersSlice";

const Navbar = () => {
  const { email } = useAppSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const [isShowMenus, setIsShowMenus] = useState(false);
  const [isShowProfile, setIsShowProfile] = useState(false);

  const handleToggle = () => {
    // Toggle mobile menu visibility
    setIsShowMenus(!isShowMenus);
  };

  const handleToggleProfile = () => {
    setIsShowProfile(!isShowProfile);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    Cookies.remove("token");
  };

  return (
    <nav className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-start">
            <div className="flex-shrink-0">
              <img
                height="45px"
                width="45px"
                src="https://i.ibb.co/HGWmTcv/logo.png"
                alt="logo"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/">
                  <a className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                </Link>
                <Link to="/all-books">
                  <a className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    All Books
                  </a>
                </Link>
                {email && (
                  <Link to="/add-new-book">
                    <a className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                      Add New
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="group inline-block">
                <button
                  onClick={handleToggleProfile}
                  className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
                    alt="User Profile"
                  />
                </button>
                <ul
                  className={`${
                    isShowProfile ? "" : "hidden"
                  } absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2`}
                >
                  {email && (
                    <li className="block px-4 py-2 text-sm font-bold hover:bg-gray-100">
                      {email}
                    </li>
                  )}
                  {email ? (
                    <li onClick={handleLogout}>
                      <a className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign Out
                      </a>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/signup">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Sign Up
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/login">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Log In
                          </a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={handleToggle}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.5C3 4.22386 3.22386 4 3.5 4H20.5C20.7761 4 21 4.22386 21 4.5C21 4.77614 20.7761 5 20.5 5H3.5C3.22386 5 3 4.77614 3 4.5ZM3 9.5C3 9.22386 3.22386 9 3.5 9H20.5C20.7761 9 21 9.22386 21 9.5C21 9.77614 20.7761 10 20.5 10H3.5C3.22386 10 3 9.77614 3 9.5ZM3.5 14C3.22386 14 3 14.2239 3 14.5C3 14.7761 3.22386 15 3.5 15H20.5C20.7761 15 21 14.7761 21 14.5C21 14.2239 20.7761 14 20.5 14H3.5ZM3.5 19C3.22386 19 3 19.2239 3 19.5C3 19.7761 3.22386 20 3.5 20H20.5C20.7761 20 21 19.7761 21 19.5C21 19.2239 20.7761 19 20.5 19H3.5Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View Nav bar */}
      <div className={`${isShowMenus ? "" : "hidden"} md:hidden bg-blue-600`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </a>
          <a
            href="#"
            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
