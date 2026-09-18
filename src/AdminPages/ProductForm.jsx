import React,{useEffect,useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import{
    getProducts,
    createAdminProduct,
    updateAdminProduct
} from "../services/product services"
import { addProduct,updateProduct } from '../redux/adminSlice/AdminProductSlice'
function ProductForm() {
    const {id} =useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch()

    const [formData,setFormData]=useState({
        name:"",
        price:"",
        category:"",
        description:"",
        image:"",
        stock:""
    })
  const[loading,setLoading]=useState("")
  useEffect(()=>{
    if(!id){
        return;
    }
    const loadProduct=async()=>{
        try{
            const products=await getProducts();
            const product=products.find((product)=>product.id===id);

            if(product){
                setFormData({
                    name:product.name || "",
                    price:product.price|| "",
                    category:Array.isArray(product.category)
                    ?product.category.join(", ")
                    :product.category || "",
                    stock:product.stock || "",
                    image:product.image|| "",
                    description:product.description || ""
                })
            }
        }catch(error){
            toast.error("failed to load product");
        }
    }
    loadProduct();
  },[id])

  const handleChange=(e)=>{
    const {name,value}=e.target;

    setFormData({
        ...formData,
        [name]:value,
    })
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(
        !formData.name||
        !formData.price||
        !formData.category||
        !formData.description||
        !formData.image||
        !formData.stock
    ){
        toast.error("please fill all fields")
        return
    }
    try{
        setLoading(true)
        const productData={
            ...formData,
            price:Number(formData.price),
            stock:Number(formData.stock),
            category:formData.category.split(",").map((item)=>item.trim()),

        }
        if(id){
            const updatedProduct=await updateAdminProduct(id,productData);
            dispatch(updateProduct(updatedProduct))
            toast.success("product updated successfully")
        }else{
            const newProduct=await createAdminProduct(productData);
            dispatch(addProduct(newProduct))
            toast.success("product added successfully");
        }
        navigate("/admin/products")
    }catch(error){
        toast.error(id ? "failed to update product" : "failed to add product");

    }finally{
        setLoading(false)
    }
  }
  return (
    <div className='max-w-3xl mx-auto' >
      <h1 className='text-2xl font-bold mb-6'>{id ? "Edit Product":"Add product"}</h1>
<form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-2xl space-y-5 '>
      <div>
        <label className='block mb-2 font-medium'>Product Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange}
        placeholder='Enter product name' className='w-full border rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-[#2F5D50] '/>

      </div>
      <div>
        <label className='block mb-2 font-medium'>Price</label>
        <input type="text" value={formData.price} name="price" onChange={handleChange} placeholder='Enter Price'
         className='w-full border outline-none focus:ring-1 focus:ring-[#2F5D50] px-4 py-2 rounded-lg '/>
      </div>
      <div>
        <label className='block mb-2 font-medium'>Category</label>
        <input type="text" value={formData.category} name="category" onChange={handleChange} placeholder='Example:Dog,food'
        className='border outline-none w-full px-4 py-2 rounded-lg focus:ring focus:ring-[#2F5D50]'/>
      </div>
      <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#2F5D50]"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#2F5D50]"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 font-medium">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#2F5D50]"
          />
        </div>
              <div>
                <button type="submit" disabled={loading} className='  bg-[#2F5D50] text-white px-6 py-2 rounded-lg hover:bg-[#244a40] disabled:opacity-50'>{loading ?"saving...":id ? "Update Product":"Add Product"}</button>
                 <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="bg-gray-200 px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
              </div>
              </form>
    </div>
  )
}

export default ProductForm
