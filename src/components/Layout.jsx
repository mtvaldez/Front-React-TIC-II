import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    // <div className="flex min-h-screen bg-gray-100">
    //   <Sidebar />
    //   <main className="flex-grow p-6 overflow-y-auto">
    //     <Outlet />
    //   </main>
    // </div>
  <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* main area fills remaining space and allows vertical layout inside */}
      <main className="flex flex-col flex-1 overflow-hidden p-6">
        <Outlet />
      </main>
    </div>
  
  );
}
