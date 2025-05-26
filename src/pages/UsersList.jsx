import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { TableDisp } from "../components/tableDisp";
import { getUsers } from "../services/UserService";

function UsersList (){
    const [value, setValue] = useState([]);
    const [loading, setLoading] = useState(true);
        
    async function getData() {
      const users = await getUsers();
      if(users) {
        setValue(users);
        setLoading(false)
      } 
    }

    useEffect(() => {
      getData();
    }, []);

    if (loading) {
      return (
        <div className="flex justify-start items-center">
          <SideBar />
          <div className="flex justify-evenly items-center ml-90">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
            <h1 className="text-xl font-semibold text-gray-700 ml-5">Loading...</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen">
          <SideBar />
  
              <div className="max-w-7xl mx-auto">
                  <div className="bg-white shadow-md rounded-lg p-4">
                      <TableDisp users={value} />
                  </div>
              </div>
      </div>
    );
    
}

export default UsersList;