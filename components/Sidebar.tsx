// components/Sidebar.tsx
"use client"; // To enable client-side interactivity

import React, { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Link from "next/link"; // Use Link from next/link for navigation

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar visibility state

  return (
    <>
      {/* Menu button - visible only on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded focus:outline-none'
      >
        {isOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Sidebar - Hidden by default on small screens (md:hidden) */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 z-10 transform transition-transform duration-300 ease-in-out 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <h2 className='text-xl font-bold mb-8 mt-12'>Stock Manager</h2>

        {/* Navigation Links */}
        <nav className='flex flex-col space-y-4'>
          <Link
            href='/'
            className='text-white hover:bg-gray-700 p-2 rounded'
            onClick={() => setIsOpen(false)}
          >
            Portfolio
          </Link>
          {/* <Link
            href='/stock/AAPL'
            className='text-white hover:bg-gray-700 p-2 rounded'
            onClick={() => setIsOpen(false)}
          >
            Stock Details
          </Link> */}
        </nav>
      </div>

      {/* Overlay when the sidebar is open on small screens */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)} // Close sidebar when overlay is clicked
          className='fixed inset-0 bg-black opacity-50 z-0 md:hidden'
        ></div>
      )}
    </>
  );
};

export default Sidebar;
