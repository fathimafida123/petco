export const saveUser=(userId)=>{
    localStorage.setItem("user",JSON.stringify(userId))
};

export const getUser=()=>{
    const user=localStorage.getItem("user")
    return user? JSON.parse(user):null
};
export const removeUser=()=>{
    localStorage.removeItem("user")
}