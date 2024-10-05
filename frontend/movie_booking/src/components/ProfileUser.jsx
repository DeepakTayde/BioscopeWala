import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getUser, clearUser } from "../helper/user";


export default function ProfileUser() {
  let loginStatus = getUser() ? true : false;
  function handleLogout() {
    clearUser();
    localStorage.setItem("user");
  }

  return (
    <Menu as="div" className="relative inline-block rounded-full text-left  ">
      <div>
        <MenuButton className="inline-flex h-9 w-9 justify-center  rounded-full overflow-hidden bg-white hover:bg-gray-50">
        {loginStatus ? (
          <span className=" rounded-full bg-blue-500 text-white  px-3 py-2 text-sm font-semibold">
            {getUser().charAt(0).toUpperCase()}
          </span>
        ) : (
          <FaUserCircle alt="user icon" className="h-9 w-9 text-blue-700" />
        )}
        </MenuButton>
      </div>
        {!loginStatus ? (
          <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <Link
                to="/signin"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Login
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/signup"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                SignUp
              </Link>
            </MenuItem>
          </div>
        </MenuItems>
        ):(
          <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <Link
                to="/user_profile"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Account
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/my_bookings"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                My Bookings
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                onClick={handleLogout} to="/"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                LogOut
              </Link>
            </MenuItem>

          </div>
        </MenuItems>
        )}

    </Menu>
  )
}

