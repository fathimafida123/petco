// import React, { useEffect ,useState} from 'react'
// import { getUsers ,updateUser} from '../services/user services'
// import { useSelector,useDispatch } from 'react-redux'
// import { setUsers,setLoading ,setError,setupdateUsers} from '../redux/adminSlice/AdminUserSlice'
// import { Search } from 'lucide-react'
// import { useSearchParams } from 'react-router-dom'
// function AdminUsers() {
// const {users,loading,error}=useSelector((state)=>state.adminUsers)
// const dispatch=useDispatch()

// const [searchParams,setSearchParams]=useSearchParams()
// const page=Number(searchParams.get("page")) ||1;
// const perPage=Number(searchParams.get("per_page")) ||5


// const [search,setSearch]=useState("")
// const[filter,setFilter]=useState("all")
// useEffect(()=>{
//   const loadUsers=async()=>{
//    try{
//   dispatch(setLoading(true))
//   const data=await getUsers()
//   dispatch(setUsers(data))
//    }catch(error){
//     dispatch(setError("failed to load users"))
//    }finally{
//     dispatch(setLoading(false))
//    }
//   }
//   loadUsers()
// },[dispatch])
 
// const handleBlock=async(user)=>{
// try{
//   const newBlocked=!user.blocked; // it will show opposite value

//   const updatedUser=await updateUser(user.id,{blocked:newBlocked})
//   dispatch(setupdateUsers(updatedUser))
// }catch(error){
//   dispatch(setError("failed to update user"))
// }
// }
// const filteredUsers=users.filter((user)=>{
//   const matchesSearch=user.name.toLowerCase()
// .includes(search.toLowerCase())
 
// const matchesFilter=
// filter==="all"||
// user.role===filter||
// (filter==="active" && user.blocked===false)||
// (filter==="blocked" && user.blocked===true)

// return matchesSearch && matchesFilter
// })
// const start=(page-1)*perPage;
// const end=start+perPage;
// const currentUsers=filteredUsers.slice(start,end);
// //total pages
// const totalPages=Math.ceil(filteredUsers.length/perPage)

// const handleNext=()=>{
//   if(page<totalPages){
//     setSearchParams({
//       page:page+1,
//       per_page:perPage,
//     })
//   }
// }

//  const handlePrevious=()=>{
//   if(page>1){
//     setSearchParams({
//       page:page-1,
//       per_page:perPage
//     })
//   }
//  }

// if(loading){
//  return <h2>loading users...</h2>
// }
// if(error){
//   return <h2 className="text-red-500">{error}</h2>
// }
//   return (
//     <div>
//     <div className='flex items-center justify-between '>
//       <h2 className='font-bold text-3xl font-serif '>Users</h2>
//       <div className='relative'>
//         <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'/>
//       <input type="text" value={search} placeholder='Search users...' onChange={(e)=>{
//         setSearch(e.target.value); setSearchParams({
//   page:1,
//   per_page:perPage
//         })} }
//         className='w-76 border outline-none px-5 py-1 rounded-lg pl-11'/>
//     </div>
//     <select value={filter} onChange={(e)=>{setFilter(e.target.value);setSearchParams({page:1,per_page:perPage})}}>
//       <option value="all">All</option>
//       <option value="user">User</option>
//       <option value="admin">Admin</option>
//       <option value="active">Active</option>
//       <option value="blocked">Blocked</option>
//     </select>
//     </div>
//     <table>
//       <thead>
//       <tr>
//         <th>Name</th>
//         <th>Email</th>
//         <th>Role</th>
//         <th>Status</th>
//         <th>Actions</th>
//       </tr>
//       </thead>
//       <tbody>
//         {currentUsers.map((user)=>(
//           <tr key={user.id} className=''>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//             <td>{user.role}</td>
//             <td>{user.blocked ? "Blocked":"Active"}</td>
//             <td><button onClick={()=>handleBlock(user)}>{user.blocked ? "Unblock":"Block"}</button></td>
//           </tr>
//         ))}
  
//       </tbody>
//     </table>
//     {currentUsers.length===0&&(
//       <p className='text-center py-8 text-gray-500'>No users Found</p>
//     )}
//            <div className="flex items-center justify-center gap-4 mt-6">
//         <button
//           onClick={handlePrevious}
//           disabled={page === 1}
//           className="px-4 py-2 rounded-lg border disabled:opacity-40"
//         >
//           Previous
//         </button>

//         <span className="font-medium">
//           Page {page} of {totalPages || 1}
//         </span>

//         <button
//           onClick={handleNext}
//           disabled={page >= totalPages}
//           className="px-4 py-2 rounded-lg border disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>


//     </div>
//   )
// }

// export default AdminUsers

import React, { useEffect, useState } from "react";
import { getUsers, updateUser } from "../services/user services";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsers,
  setLoading,
  setError,
  setupdateUsers,
} from "../redux/adminSlice/AdminUserSlice";

import { Search, ShieldCheck, ShieldOff } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function AdminUsers() {
  const { users, loading, error } = useSelector(
    (state) => state.adminUsers
  );

  const dispatch = useDispatch();

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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h2 className="font-bold text-3xl text-gray-800">
            Users
          </h2>

          <p className="text-gray-500 mt-1">
            Manage registered users and their access
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}
          <div className="relative">

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
              className="w-full sm:w-72 border border-gray-200
              outline-none px-4 py-3 pl-10 rounded-xl
              bg-white
              focus:ring-2 focus:ring-[#2F5D50]/30
              focus:border-[#2F5D50]"
            />

          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);

              setSearchParams({
                page: 1,
                per_page: perPage,
              });
            }}
            className="border border-gray-200 bg-white
            px-4 py-3 rounded-xl outline-none
            focus:ring-2 focus:ring-[#2F5D50]/30
            focus:border-[#2F5D50]"
          >
            <option value="all">All Users</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

        </div>

      </div>

      {/* User Count */}
      <div className="bg-white border rounded-2xl px-5 py-4 shadow-sm">

        <p className="text-sm text-gray-500">
          Total users
        </p>

        <p className="text-2xl font-bold text-gray-800 mt-1">
          {filteredUsers.length}
        </p>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* Header */}
            <thead className="bg-gray-50">

              <tr className="border-b">

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
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
                    className="border-b last:border-b-0
                    hover:bg-gray-50 transition"
                  >

                    {/* User */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="w-10 h-10 rounded-full
                          bg-[#2F5D50] text-white
                          flex items-center justify-center
                          font-semibold"
                        >
                          {user.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            ID: {user.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">

                      <span className="text-gray-600">
                        {user.email}
                      </span>

                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1
                        rounded-full text-xs font-medium
                        ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

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
                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                      {user.role !=="admin" &&( <button
                          onClick={() => handleBlock(user)}
                          className={`px-4 py-2 rounded-lg
                          text-sm font-medium transition
                          ${
                            user.blocked
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          {user.blocked
                            ? "Unblock"
                            : "Block"}
                        </button>)}

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
            bg-white text-gray-700
            hover:bg-gray-50
            disabled:opacity-40
            disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-lg border
            bg-white text-gray-700
            hover:bg-gray-50
            disabled:opacity-40
            disabled:cursor-not-allowed"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminUsers;