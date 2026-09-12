export const calculateTotal=(items)=>{
    return items.reduce((total,item)=>total+Number(item.price)*Number(item.quantity),0)
};