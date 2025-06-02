import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
