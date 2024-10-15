"use client"; // Enable client-side rendering

import React, { useState } from "react";
import {
  MenuOutlined,
  CloseOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className='flex justify-between items-center bg-white p-4 shadow-md'>
        {/* Menu toggle button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='text-gray-700 md:hidden'
        >
          {isSidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        {/* Right-side icons */}
        <div className='flex items-center space-x-4'>
          {/* Settings icon */}
          <Link href='/settings'>
            <SettingOutlined className='text-gray-600 text-xl hover:text-gray-800 cursor-pointer' />
          </Link>

          {/* User avatar */}
          <div className='flex items-center'>
            <UserOutlined className='text-gray-600 text-xl' />
          </div>
        </div>
      </header>
    </>
  );
}
