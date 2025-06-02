import { Link, useLocation } from "react-router-dom";
import {
  Home,
  History,
  LineChart,
  List,
  DoorClosed,
  Settings,
  LogOut
} from "lucide-react";

const items = [
  { title: "Home",          url: "/menu",     icon: Home },
  { title: "Historic Data", url: "/historic", icon: History },
  { title: "Statistics",    url: "/stats",    icon: LineChart },
  { title: "Users",         url: "/users",    icon: List },
  { title: "Doors",         url: "/doors",    icon: DoorClosed },
  { title: "Settings",      url: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  function logout() {

  }

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-6 px-2 text-center">WELCOME BACK!</h2>
      <nav className="space-y-1">
        {items.map(({ title, url, icon: Icon }) => {
          const isActive = location.pathname === url;
          return (
            <Link key={url} to={url}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors 
                ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}` }>
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{title}</span>
            </Link>
          );
        })}

      </nav>
      
      <div className="mt-auto pt-10">
        <button onClick={logout} className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors">
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </aside>
  );
}