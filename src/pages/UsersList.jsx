import { useEffect, useState } from "react";
import { TableDisp } from "../components/tables/UserTable";
import { getUsers } from "../services/UserService";
import { CreateUserPopover } from "@/components/popovers/userPopovers";

function UsersList() {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const users = await getUsers();
    if (users) {
      setValue(users);
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center">
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
          <h1 className="text-xl font-semibold text-gray-700 ml-5">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
      <div className="flex-grow px-8 py-6">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
        <hr className="border-gray-300 mb-4" />

        {/* Add User Button */}
        <div className="flex justify-end mb-4">
          <CreateUserPopover text="➤ Register New User"/>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <TableDisp users={value} />
        </div>
      </div>
  );
}

export default UsersList;