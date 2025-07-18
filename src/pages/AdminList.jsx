import { useState, useDeferredValue } from "react";
import { AdminTable } from "@/components/tables/AdminTable";
import { CreateUserPopover } from "@/components/popovers/userPopovers";
import { useQueryAdmin } from "@/hooks/adminHook";

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { CreateAdminPopover } from "@/components/popovers/adminPopovers";

const pageSize = 15;

function AdminList() {
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const deferredSearch = useDeferredValue(searchInput);

  const { data = { content: [], totalPages: 0 }, isLoading } = useQueryAdmin(page, pageSize, deferredSearch);
  const totalPages = data.totalPages;
  const filteredAdmins = data.content;

  return (
    <div className="flex flex-col flex-1 overflow-hidden px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">View Admins</h1>
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
                placeholder="Search Full Name"
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

            {/* ._. */}
            {/* <div/>
            <div/> */}
            <CreateAdminPopover/>
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
              ( <AdminTable admins={filteredAdmins} /> )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminList;