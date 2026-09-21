

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  softDeleteProduct,permenentDelete
} from "../services/product services";

import { Search, Plus, Pencil, Trash2 } from "lucide-react";

import {
  setProducts,
  setLoading,
  setError,
  softDeleteProductSlice,deleteProduct
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
     
  const prmntdelte=await permenentDelete(deleteProductId)
  dispatch(deleteProduct(deleteProductId))
  setShowDeleteModel(false)
  setDeleteProductId(null)
  }catch(error){

    dispatch(setError("failed to permanently delete product"))
  }

}
  // Search
  const activeProducts = products.filter((product) => product.deleted !== true)
  const filteredProducts = activeProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 5;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const currentProduct = filteredProducts.slice(start, end);

  const totalPage = Math.ceil(filteredProducts.length / perPage);

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
    <div className="space-y-6">

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
          bg-[#2F5D50] text-white px-5 py-3 rounded-xl
          hover:bg-[#244a40] transition"
        >
          <Plus size={20} />
          Add Product
        </Link>

      </div>

      {/* Search + Count */}
      <div className="bg-white rounded-2xl shadow-sm border p-4">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Search */}
          <div className="relative w-full md:w-96">

            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-200 rounded-xl
              pl-10 pr-4 py-3 outline-none
              focus:ring-2 focus:ring-[#2F5D50]/30
              focus:border-[#2F5D50]"
            />

          </div>

          {/* Product count */}
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* Header */}
            <thead className="bg-gray-50">

              <tr className="border-b">

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
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
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >

                    {/* Product */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-xl border"
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
                    <td className="px-6 py-4">

                      <span className="font-semibold text-gray-800">
                        ₹{product.price}
                      </span>

                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">

                      <span className="text-gray-700">
                        {product.stock}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      {product.stock > 0 ? (

                        <span className="inline-flex px-3 py-1 rounded-full
                        text-xs font-medium bg-green-100 text-green-700">
                          In Stock
                        </span>

                      ) : (

                        <span className="inline-flex px-3 py-1 rounded-full
                        text-xs font-medium bg-red-100 text-red-600">
                          Out of Stock
                        </span>

                      )}

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        {/* Edit */}
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="inline-flex items-center gap-2
                          px-3 py-2 rounded-lg
                          bg-gray-100 text-gray-700
                          hover:bg-gray-200 transition"
                        >
                          <Pencil size={16} />
                          Edit
                        </Link>

                        {/* Delete */}
                        <button
                               onClick={()=>{
                                setDeleteProductId(product.id);
                                setShowDeleteModel(true)
                               }}
                          className="inline-flex items-center gap-2
                          px-3 py-2 rounded-lg
                          bg-red-50 text-red-600
                          hover:bg-red-100 transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

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

        <p className="text-sm text-gray-500">
          Page{" "}
          <span className="font-semibold text-gray-700">
            {page}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-700">
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
            bg-white text-gray-700
            hover:bg-gray-50
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
            bg-white text-gray-700
            hover:bg-gray-50
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