import React, { useEffect ,useState} from 'react'
import { getUsers ,updateUser} from '../services/user services'
import { useSelector,useDispatch } from 'react-redux'
import { setUsers,setLoading ,setError,setupdateUsers} from '../redux/adminSlice/AdminUserSlice'
import { Search } from 'lucide-react'
function AdminUsers() {
const {users,loading,error}=useSelector((state)=>state.adminUsers)
const dispatch=useDispatch()
const [search,setSearch]=useState("")
const[filter,setFilter]=useState("all")
useEffect(()=>{
  const loadUsers=async()=>{
   try{
  dispatch(setLoading(true))
  const data=await getUsers()
  dispatch(setUsers(data))
   }catch(error){
    dispatch(setError("failed to load users"))
   }finally{
    dispatch(setLoading(false))
   }
  }
  loadUsers()
},[dispatch])
 
const handleBlock=async(user)=>{
try{
  const newBlocked=!user.blocked; // it will show opposite value

  const updatedUser=await updateUser(user.id,{blocked:newBlocked})
  dispatch(setupdateUsers(updatedUser))
}catch(error){
  dispatch(setError("failed to update user"))
}
}
const filteredUsers=users.filter((user)=>{
  const matchesSearch=user.name.toLowerCase()
.includes(search.toLowerCase())
 
const matchesFilter=
filter==="all"||
user.role===filter||
(filter==="active" && user.blocked===false)||
(filter==="blocked" && user.blocked===true)

return matchesSearch && matchesFilter
})


if(loading){
 return <h2>loading users...</h2>
}
if(error){
  return <h2 className="text-red-500">{error}</h2>
}
  return (
    <div>
    <div className='flex items-center justify-between '>
      <h2 className='font-bold text-3xl font-serif '>Users</h2>
      <div className='relative'>
        <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'/>
      <input type="text" value={search} placeholder='Search users...' onChange={(e)=>
        setSearch(e.target.value)} 
        className='w-76 border outline-none px-5 py-1 rounded-lg pl-11'/>
    </div>
    <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
      <option value="all">All</option>
      <option value="user">User</option>
      <option value="admin">Admin</option>
      <option value="active">Active</option>
      <option value="blocked">Blocked</option>
    </select>
    </div>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user)=>(
          <tr key={user.id} className=''>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.blocked ? "Blocked":"Active"}</td>
            <td><button onClick={()=>handleBlock(user)}>{user.blocked ? "Unblock":"Block"}</button></td>
          </tr>
        ))}
  
      </tbody>
    </table>
    </div>
  )
}

export default AdminUsers
