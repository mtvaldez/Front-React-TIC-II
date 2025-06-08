import { useEffect, useState } from "react";
import { UserTable } from "../components/tables/UserTable";
import { getUsers } from "../services/UserService";
import { CreateUserPopover } from "@/components/popovers/userPopovers";
import { useQueryUser } from "@/hooks/userHooks";
import TextInputBox from "@/components/ui/TextInputBox";

function UsersList() {
  // const [value, setValue] = useState([]);
  // const [loading, setLoading] = useState(true);

  // async function getData() {
  //   const users = await getUsers();
  //   if (users) {
  //     setValue(users);
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  const { data: users = [], isLoading } = useQueryUser();
  const [userSearch, setUserSearch] = useState('');

  const filteredUsers = users.filter((user) => user.fullName.toLowerCase().includes(userSearch.toLowerCase()));

  const handleUserSearch = (e) => {
    setUserSearch(e.target.value);
  }

  if (isLoading) {
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
    <div className="flex flex-col flex-1 overflow-hidden px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
      <hr className="border-gray-300 mb-4" />

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <TextInputBox
            inputType="text"
            myPlaceholder="Search Full Name"
            className="px-3 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            myValue={userSearch}
            onChange={handleUserSearch}
          />

          {/* <button className="py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
            Search
          </button> */}
        </div>
        <CreateUserPopover />
      </div>

      <div className="flex-1 min-h-0">
        <div className="h-full bg-white shadow-md rounded-lg flex flex-col">
          <div className="p-3" />

          <div className="flex-1 overflow-auto px-3">
            <UserTable users={filteredUsers} />
          </div>

          <div className="p-3" />
        </div>
      </div>

    </div>
  );
  // return (
  //   <div className="flex flex-col flex-1 overflow-hidden px-8 py-6">
  //     {/* Header Section */}
  //     <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
  //     <hr className="border-gray-300 mb-4" />

  //     <div className="flex justify-between items-center mb-4">
  //       <div className="flex items-center space-x-2">
  //         <TextInputBox
  //           inputType="text"
  //           myPlaceholder="Search Full Name"
  //           className="px-3 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  //         <button className="py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
  //           Search
  //         </button>
  //       </div>
  //       <CreateUserPopover />
  //     </div>

  //     <div className="flex-1 min-h-0">
  //       <div className="h-full overflow-auto bg-white shadow-md rounded-lg p-4">
  //         <UserTable users={users} />
  //       </div>
  //     </div>

  //   </div>
  // );
}

export default UsersList;