// app/layout.tsx
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div className='flex'>
          {/* Sidebar component with full-screen height */}
          <Sidebar />

          {/* Main content */}
          <div className='flex-grow p-4'>{children}</div>
        </div>
      </body>
    </html>
  );
}
