

import React, { useEffect, useState } from "react";
import { getUsers, updateUser ,makeUserAdmin} from "../services/user services";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsers,
  setLoading,
  setError,
  setupdateUsers,
} from "../redux/adminSlice/AdminUserSlice";

import { Search, ShieldCheck, ShieldOff } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";
function AdminUsers() {
  const { users, loading, error } = useSelector(
    (state) => state.adminUsers
  );

  const dispatch = useDispatch();
   const[showMessage,setShowMessage]=useState(false)
   const[selectUser,setSelectUser]=useState(null)

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 5;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        dispatch(setLoading(true));

        const data = await getUsers();

        dispatch(setUsers(data));
      } catch (error) {
        dispatch(setError("Failed to load users"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadUsers();
  }, [dispatch]);

  // Block / Unblock
  const handleBlock = async (user) => {
    try {
      const newBlocked = !user.blocked;

      const updatedUser = await updateUser(user.id, {
        blocked: newBlocked,
      });

      dispatch(setupdateUsers(updatedUser));
    } catch (error) {
      dispatch(setError("Failed to update user"));
    }
  };

  // Search + Filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      user.role === filter ||
      (filter === "active" && user.blocked === false) ||
      (filter === "blocked" && user.blocked === true);

    return matchesSearch && matchesFilter;
  });

  // Pagination
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const currentUsers = filteredUsers.slice(start, end);

  const totalPages = Math.ceil(
    filteredUsers.length / perPage
  );

  const handleNext = () => {
    if (page < totalPages) {
      setSearchParams({
        page: page + 1,
        per_page: perPage,
      });
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setSearchParams({
        page: page - 1,
        per_page: perPage,
      });
    }
  };

  const handleMakeAdmin=async()=>{
    try{
   
    await makeUserAdmin(selectUser.id)
  const updatedUser= await getUsers()
  dispatch(setUsers(updatedUser))
  toast.success("User is now admin")
  setShowMessage(false)
  setSelectUser(null)
    }catch(error){
      toast.error("failed to make user admin")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-500 text-lg">
          Loading users...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      
    {/* Header */}
<div>
  <h2 className="font-bold text-3xl text-gray-800">
    Users
  </h2>

  <p className="text-gray-500 mt-1">
    Manage registered users and their access
  </p>
</div>


{/* User Count + Search + Filter */}
<div className=" border rounded-2xl px-5 py-4 shadow-sm" 
  >
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-center">

    {/* Total Users */}
    <div className="text-center md:text-left">
      <p className="text-black font-bold">
        Total users
      </p>

      <p className="text-2xl font-bold mt-1">
        {filteredUsers.length}
      </p>
    </div>

    {/* Search */}
    <div className="relative w-full md:justify-self-center">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={search}
        placeholder="Search users..."
        onChange={(e) => {
          setSearch(e.target.value);
          setSearchParams({
            page: 1,
            per_page: perPage,
          });
        }}
        className="w-full md:w-72 border border-gray-200
        outline-none px-4 py-3 pl-10 rounded-xl
        bg-white
        focus:ring-2 focus:ring-[#2F5D50]/30
        focus:border-[#2F5D50]"
      />
    </div>

    {/* Filter */}
    <div className="w-full md:flex md:justify-end  ">
      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setSearchParams({
            page: 1,
            per_page: perPage,
          });
        }}
        className="w-full md:w-auto border border-gray-200
         text-white px-4 py-3 rounded-xl outline-none
        focus:ring-2 focus:ring-[#2F5D50]/30
          bg-[linear-gradient(135deg,#A8E0DE,#5FB7B5)]
  hover:bg-[linear-gradient(135deg,#8DD3D1,#48A6A7)]
  transition-all duration-300"
      >
        <option value="all" className=" text-black">All Users</option>
        <option value="user" className="text-red-500">Users</option>
        <option value="admin"className="text-blue-500">Admins</option>
        <option value="active" className="text-green-500">Active</option>
        <option value="blocked"className="text-purple-500">Blocked</option>
     
      </select>
    </div>

  </div>
</div>

      {/* Table */}
      <div className="rounded-2xl shadow-sm overflow-hidden mt-8 bg-white border border-gray-500">

  <div className="overflow-x-auto">

    <table className="w-full">

      {/* Header */}
      <thead className="bg-[#F2EFE7]">

        <tr className="border-b border-gray-500">

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
            User
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
            Email
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
            Role
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
            Status
          </th>

          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
            Action
          </th>

        </tr>

      </thead>


      {/* Body */}
      <tbody>

        {currentUsers.length > 0 ? (

          currentUsers.map((user) => (

            <tr
              key={user.id}
              className="border-b border-gray-400 last:border-b-0 hover:bg-gray-50 transition"
            >

              {/* User */}
              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <div
                    className="w-10 h-10 rounded-full
                    bg-[#006A71] text-white
                    flex items-center justify-center
                    font-semibold shrink-0"
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>

                    <p className="font-semibold text-gray-800">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      ID: {user.id}
                    </p>

                  </div>

                </div>

              </td>


              {/* Email */}
              <td className="px-6 py-5">

                <span className="text-sm text-gray-700">
                  {user.email}
                </span>

              </td>


              {/* Role */}
              <td className="px-6 py-5">

                <span
                  className={`inline-flex px-3 py-1
                  rounded-full text-xs font-medium
                  ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                  onClick={() => {
                    if (user.role === "user") {
                      setShowMessage(true);
                      setSelectUser(user);
                    }
                  }}
                >
                  {user.role}
                </span>

              </td>


              {/* Status */}
              <td className="px-6 py-5">

                {user.blocked ? (

                  <span
                    className="inline-flex items-center gap-1
                    px-3 py-1 rounded-full
                    text-xs font-medium
                    bg-red-100 text-red-600"
                  >
                    <ShieldOff size={14} />
                    Blocked
                  </span>

                ) : (

                  <span
                    className="inline-flex items-center gap-1
                    px-3 py-1 rounded-full
                    text-xs font-medium
                    bg-green-100 text-green-700"
                  >
                    <ShieldCheck size={14} />
                    Active
                  </span>

                )}

              </td>


              {/* Action */}
              <td className="px-6 py-5">

                <div className="flex justify-end">

                  {user.role !== "admin" && (

                    <button
                      onClick={() => handleBlock(user)}
                      className={`px-4 py-2 rounded-lg
                      text-sm font-medium transition
                      ${
                        user.blocked
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>

                  )}

                </div>

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td
              colSpan="5"
              className="text-center py-16"
            >

              <div className="flex flex-col items-center">

                <Search
                  size={40}
                  className="text-gray-300 mb-3"
                />

                <h3 className="text-lg font-semibold text-gray-700">
                  No users found
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Try changing your search or filter.
                </p>

              </div>

            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

</div>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row
      items-center justify-between gap-4">

        <p className="text-sm text-gray-500">
          Page{" "}
          <span className="font-semibold text-gray-700">
            {page}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-700">
            {totalPages || 1}
          </span>
        </p>

        <div className="flex gap-2">

          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border
       bg-[#006A71]  text-white
            hover:bg-[#48A6A7]
            disabled:opacity-40
            disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-lg border
         bg-[#006A71]  text-white
            hover:bg-[#48A6A7]
            disabled:opacity-40
            disabled:cursor-not-allowed"
          >
            Next
          </button>

        </div>

      </div>
       <ConfirmationModal
  show={showMessage}
  title="Change Role?"
  message={`Are you sure you want to make ${selectUser?.name} an admin?`}
  onCancel={() => {
    setShowMessage(false);
    setSelectUser(null);
  }}
  onConfirm={handleMakeAdmin}
  confirmText="Make Admin"
/>

    </div>
  );
}

export default AdminUsers;