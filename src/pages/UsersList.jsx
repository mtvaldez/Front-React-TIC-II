import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { TableDisp } from "../components/tableDisp";

function UsersList (){
    const [value, setValue] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    function getData() {

        fetch(`${localStorage.getItem("url")}/get-users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.result === 1) {
            alert(data.error);
          } else {
          const userList = data.users.map(item => 
            `${item.name} | ${item.l_name} | ${item.cid} | ${item.level} `
          );
          setValue(userList);
          setLoading(false);
          }
        })
        .catch(error => {
          console.error("getting users failed:", error);
        });
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
                        <TableDisp
                            columns={["Name", "Last Name", "ID", "Access Level"]}
                            data={value}
                            title={"User List"}
                        />
                    </div>
                </div>
        </div>
    );
    
}

export default UsersList;