"use client"; // Enable client-side rendering for interactivity

import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
// import { signOut } from "next-auth/react"; // Uncomment for sign-out functionality

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 z-10 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:block md:static flex flex-col`}
      >
        <div className='h-full  flex flex-col'>
          {/* Close button for small screens */}
          <button
            onClick={toggleSidebar}
            className='absolute top-4 right-4 md:hidden text-white focus:outline-none'
          >
            <CloseOutlined />
          </button>

          {/* Sidebar content */}
          <div className='flex-grow'>
            <h2 className='text-xl font-bold mb-8 mt-12'>Stock Manager</h2>

            {/* Navigation Links */}
            <nav className='flex flex-col space-y-4'>
              <Link
                href='/'
                className='text-white hover:bg-gray-700 p-2 rounded'
                onClick={toggleSidebar}
              >
                Portfolio
              </Link>
            </nav>
          </div>

          {/* Sign Out Button at the bottom */}
          <div className='mt-auto'>
            <button
              // onClick={() => signOut()}
              className='w-full text-center text-white hover:bg-red-600 bg-red-500 p-2 rounded'
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          onClick={toggleSidebar} // Close sidebar when clicking outside
          className='fixed inset-0 bg-black opacity-50 z-0 md:hidden'
        ></div>
      )}
    </>
  );
};

export default Sidebar;
