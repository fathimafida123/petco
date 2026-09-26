

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  softDeleteProduct,permenentDelete,restoreProduct
} from "../services/product services";

import { Search, Plus, Pencil, Trash2,RefreshCcw } from "lucide-react";

import {
  setProducts,
  setLoading,
  setError,
  softDeleteProductSlice,deleteProduct,restoreProductSlice
} from "../redux/adminSlice/AdminProductSlice";

import { Link, useSearchParams } from "react-router-dom";

function AdminProduct() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [deleteProductId, setDeleteProductId] = useState(null)
  const [showDeleteModel, setShowDeleteModel] = useState(false)
   const[showTrash,setShowTrash]=useState(false)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch(setLoading(true));

        const data = await getProducts();

        dispatch(setProducts(data));
      } catch (error) {
        dispatch(setError("Failed to load products"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadProducts();
  }, [dispatch]);

const handleSoftDelete=async ()=>{
  try{
    const updatedProduct=await softDeleteProduct(deleteProductId) 

    dispatch( softDeleteProductSlice(updatedProduct.id))

    setShowDeleteModel(false)
    setDeleteProductId(null)
  }catch (error){
    dispatch(setError("failed to delete product"))
  }
}
const permenentDeletHandler=async()=>{
  try{
     
  await permenentDelete(deleteProductId)
  dispatch(deleteProduct(deleteProductId))
  setShowDeleteModel(false)
  setDeleteProductId(null)
  }catch(error){

    dispatch(setError("failed to permanently delete product"))
  }

}
  const activeProducts = products.filter((product) => product.deleted !== true)
  const trashProducts=products.filter((product)=>product.deleted===true)

  const productsToDisplay=showTrash ? trashProducts :activeProducts;

  const filteredProducts = productsToDisplay.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 5;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const currentProduct = filteredProducts.slice(start, end);

  const totalPage = Math.ceil(filteredProducts.length / perPage);

  const restoreProducts=async(productId)=>{
    try{
    const restoreProductApi=await restoreProduct(productId)
    dispatch (restoreProductSlice(restoreProductApi.id))
    }catch(error){
      console.log("restore error:",error)
      dispatch(setError("failded restore product"))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500 text-lg">Loading products...</p>
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
    <div className="space-y-6" >

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your pet products
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="inline-flex items-center justify-center gap-2
            text-white px-5 py-3 rounded-xl 
  bg-[linear-gradient(135deg,#A8E0DE,#5FB7B5)]
  hover:bg-[linear-gradient(135deg,#8DD3D1,#48A6A7)]
  transition-all duration-300"

        >
          <Plus size={20} />
          Add Product
        </Link>

      </div>
      <div>
        <button onClick={()=>{setShowTrash(false); setSearchParams({page:1,per_Page:5})}} className={`px-4 py-3  ${!showTrash ? "text-bg-[#030712]  border-b-2 border-[#2F5D50]":"text-gray-500"}`}>All products</button>
        <button onClick={()=>{setShowTrash(true);setSearchParams({page:1,per_Page:5})}} className={`px-4 py-3 ${showTrash ? "text-bg-[#030712]  border-b-2 border-[#2F5D50]":"text-gray-500"}`}>Trash</button>
      </div>

      {/* Search + Count */}
      <div className="rounded-bl-4xl  shadow-xl border p-4 "
        style={{
    background:
      "radial-gradient(circle at 80% 0%, #D4ECE8 0%, #DDE8D8 50%, #F2EFE7 100%)",
  }}
>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Search */}
          <div className="relative w-full md:w-96  rounded-2xl">

            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006A71]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border  rounded-xl
              pl-10 pr-4 py-3 outline-none
              focus:ring-2 focus:ring-[#006A71]
              focus:border-[#2F5D50]"
            />

          </div>

          {/* Product count */}
          <p className="text-sm text-black">
            Showing{" "}
            <span className="font-semibold text-[#006A71]">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

        </div>

      </div>

{/* Table */}
<div className="bg-white rounded-2xl shadow-xl border border-gray-600 overflow-hidden text-black">

  <div className="overflow-x-auto">

    <table className="w-full">

      {/* Header */}
      <thead className="bg-[#F2EFE7] text-gray-800">

        <tr className="border-b border-gray-800 ">

          <th className="px-6 py-4 text-left text-sm font-semibold">
            Product
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold">
            Price
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold">
            Stock
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold">
            Status
          </th>

          <th className="px-6 py-4 text-right text-sm font-semibold">
            Actions
          </th>

        </tr>

      </thead>


      {/* Body */}
      <tbody>

        {currentProduct.length > 0 ? (

          currentProduct.map((product) => (

            <tr
              key={product.id}
              className="border-b border-gray-500 hover:bg-gray-50 transition"
            >

              {/* Product */}
              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-xl border border-gray-200"
                  />

                  <div>

                    <p className="font-semibold text-gray-800">
                      {product.name}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      ID: {product.id}
                    </p>

                  </div>

                </div>

              </td>


              {/* Price */}
              <td className="px-6 py-5">

                <span className="font-semibold text-[#006A71]">
                  ₹{product.price}
                </span>

              </td>


              {/* Stock */}
              <td className="px-6 py-5">

                <span className="font-medium text-gray-700">
                  {product.stock}
                </span>

              </td>


              {/* Status */}
              <td className="px-6 py-5">

                {product.stock > 0 ? (

                  <span
                    className="inline-flex items-center px-3 py-1
                    rounded-full text-xs font-medium
                    bg-green-100 text-green-700"
                  >
                    In Stock
                  </span>

                ) : (

                  <span
                    className="inline-flex items-center px-3 py-1
                    rounded-full text-xs font-medium
                    bg-red-100 text-red-600"
                  >
                    Out of Stock
                  </span>

                )}

              </td>


              {/* Actions */}
              <td className="px-6 py-5">

                <div className="flex justify-end gap-2">

                  {showTrash ? (

                    /* Restore */
                    <button
                      onClick={() => restoreProducts(product.id)}
                      className="inline-flex items-center gap-2
                      px-3 py-2 rounded-lg
                      bg-green-50 text-green-600
                      hover:bg-green-100 transition"
                      title="Restore"
                    >
                      <RefreshCcw size={16} />
                      Restore
                    </button>

                  ) : (

                    <>

                      {/* Edit */}
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="inline-flex items-center gap-2
                        px-3 py-2 rounded-lg
                        bg-gray-50 text-gray-700
                        hover:bg-gray-100 transition"
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>


                      {/* Delete */}
                      <button
                        onClick={() => {
                          setDeleteProductId(product.id);
                          setShowDeleteModel(true);
                        }}
                        className="inline-flex items-center gap-2
                        px-3 py-2 rounded-lg
                        bg-red-50 text-red-600
                        hover:bg-red-100 transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </>

                  )}

                </div>

              </td>

            </tr>

          ))

        ) : (

          /* Empty State */
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
                  No products found
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Try searching with another product name.
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

        <p className="text-sm text-gray-900">
          Page{" "}
          <span className="font-semibold text-gray-950">
            {page}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {totalPage || 1}
          </span>
        </p>

        <div className="flex gap-2">

          <button
            onClick={() =>
              setSearchParams({
                page: page - 1,
                per_page: perPage,
              })
            }
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border
             text-white bg-[#3006A71] 
           hover:bg-[#48A6A7]
            disabled:opacity-40
            disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setSearchParams({
                page: page + 1,
                per_page: perPage,
              })
            }
            disabled={page >= totalPage}
            className="px-4 py-2 rounded-lg border
            text-white bg-[#3006A71] 
           hover:bg-[#48A6A7]
            disabled:opacity-40
            disabled:cursor-not-allowed"
          >
            Next
          </button>

        </div>

      </div>
      {showDeleteModel && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
      
      <h2 className="text-xl font-semibold text-gray-800">
        Delete Product
      </h2>

      <p className="text-gray-500 mt-2">
           what do you want to do?
      </p>

      <div className="flex justify-end gap-3 mt-6">
      

        <button
          onClick={handleSoftDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
      🗑️ Move to Trash
        </button>
        <button onClick={permenentDeletHandler}>   Delete permenently</button>
          <button
          onClick={() => {
            setShowDeleteModel(false);
            setDeleteProductId(null);
          }}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}

export default AdminProduct;