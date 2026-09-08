export const validateRegister=(formData)=>{
    const errors={}
    //name
if(!formData.name.trim()){
    errors.name="Name is required"
}else if(formData.name.length<3||formData.name.length>20){
    errors.name="name must include 3 to 20 characters "
}
//email
if(!formData.email.trim()){
    errors.email="email is required"
}
else if(!formData.email.endsWith("@gmail.com")){
    errors.email="email is not valid"
}
//pass
if(!formData.password.trim()){
    errors.password="password is required"
}
else if(formData.password.length<6){
    errors.password="password must be at least 6 characters"
}
else if(!/\d/.test(formData.password)){
  errors.password="password must be contain at least one digit"
}
//cnfrmpass
if (!formData.cnfrmpass.trim()) {
  errors.cnfrmpass = "Confirm password is required";
} else if (formData.cnfrmpass !== formData.password) {
  errors.cnfrmpass = "Passwords do not match";
}
return errors
}