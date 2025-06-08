import { useEffect, useState, useDeferredValue } from "react";
import { DoorTable } from "@/components/tables/DoorTable";
import { getDoors } from "@/services/DoorService";
import { CreateDoorPopover } from "@/components/popovers/doorPopovers";
import { useQueryDoor } from "@/hooks/doorHook";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

const pageSize = 15;

function Doors() {
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const deferredSearch = useDeferredValue(searchInput);

  const { data = { content: [], totalPages: 0 }, isLoading } = useQueryDoor(page, pageSize, deferredSearch);
  const totalPages = data.totalPages;
  const filteredDoors = data.content;

  return (
    <div className="flex flex-col flex-1 overflow-hidden px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Door Management</h1>
      <hr className="border-gray-300 mb-4" />

      <div className="flex-1 min-h-0">
        <div className="h-full bg-white shadow-md rounded-lg flex flex-col p-4">

          {/* Top Bar: Search + Pagination + Create */}
          <div className="flex justify-between items-center mb-4">
            {/* Search */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Door Name"
                className="px-3 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pagination */}
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                disabled={page <= 0}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              >
                <ArrowLeftCircle />
              </button>

              <span className="text-sm text-gray-700">
                Page {page + 1} of {totalPages}
              </span>

              <button
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              >
                <ArrowRightCircle />
              </button>
            </div>

            <CreateDoorPopover />
          </div>

          <div className="flex-1 overflow-auto">
            {isLoading ? (
              // Loading
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12"></div>
                  <h1 className="text-lg font-medium text-gray-700 ml-4">Loading...</h1>
                </div>
              </div>) 
              : // No loading
              ( <DoorTable doors={filteredDoors} /> )}
          </div>
        </div>
      </div>
    </div>
  );
}

// function Doors() {
    
//     // const [value, setValue] = useState([]);
    
//     // const [loading, setLoading] = useState(true);

//     // async function getData() {
//     //     const doors = await getDoors();
//     //     if (doors) {
//     //         setValue(doors);
//     //         // setLoading(false)
//     //     }
//     // }
    
//     // useEffect(() => {
//         //     getData();
//         // }, []);
    
//     const {data: doors, isLoading} = useQueryDoor();
        
//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="flex items-center">
//                     <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
//                     <h1 className="text-xl font-semibold text-gray-700 ml-5">Loading...</h1>
//                 </div>
//             </div>
//         );
//     }

//     return (

//         <div className="flex-grow px-8 py-6">
//             {/* Header Section */}
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Door Management</h1>
//             <hr className="border-gray-300 mb-4" />

//             {/* Add User Button */}
//             <div className="flex justify-end mb-4">
//                 <CreateDoorPopover />
//             </div>

//             {/* Table Section */}
//             <div className="bg-white shadow-md rounded-lg p-4">
//                 <DoorTable doors={doors} />
//             </div>
//         </div>
//     );

// }

export default Doors;