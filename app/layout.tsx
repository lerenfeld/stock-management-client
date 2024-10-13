"use client"; // Enable client-side rendering

import React, { useState } from "react";
import Icon, {
  MenuOutlined,
  CloseOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import Image from "next/image"; // Import Next.js Image for the avatar
import Link from "next/link";
import "./globals.css";
import "antd/dist/reset.css"; // Import Ant Design's styles

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang='en'>
      <body className='bg-gray-100'>
        <div className='flex h-screen'>
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Main content area */}
          <div className='flex-grow flex flex-col'>
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

            {/* Main content */}
            <main className='flex-grow p-6 overflow-y-auto'>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
