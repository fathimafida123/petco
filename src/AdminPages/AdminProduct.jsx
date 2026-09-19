

import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteAdminProduct
} from "../services/product services";
import { Search } from "lucide-react";
import {
  setProducts,
  setLoading,
  setError,
  deleteProduct
} from "../redux/adminSlice/AdminProductSlice"

import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function AdminProduct() {

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );
  const[search,setSearch]=useState("")
  const [searchParams,setSearchParams]=useSearchParams()

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


  const handleDelete = async (id) => {

    try {

      await deleteAdminProduct(id);

      dispatch(deleteProduct(id));

    } catch (error) {

      dispatch(setError("Failed to delete product"));

    }

  };

const filteredProducts=products.filter((product)=>
product.name.toLowerCase().includes(search.toLowerCase())
)
const page=Number(searchParams.get("page")) ||1
const perPage=Number(searchParams.get("per_page"))||5
 const start=(page-1)*perPage;
 const end=start+perPage
const currentProduct=filteredProducts.slice(start,end);
const totalPage=Math.ceil(filteredProducts.length/perPage)

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }


  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Products
        </h1>
<input type="text" value={search} onChange={(e)=>
  setSearch(e.target.value)} className="border rounded"/>
        <Link
          to="/admin/products/add"
          className="bg-[#2F5D50] text-white px-5 py-2 rounded-lg"
        >
          Add Product
        </Link>

      </div>


      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>


          <tbody>

            {currentProduct.map((product) => (

              <tr key={product.id} className="border-b">

                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>

                <td className="p-4">
                  {product.name}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4 flex gap-2">

                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <div>
      <button onClick={()=>setSearchParams({page:page-1,per_page:perPage}) }
      disabled={page===1}
       className="px-4 py-2 rounded-lg border
        disabled:opacity-40">Previous</button>
        <span>page {page} of {totalPage||1}</span>

        <button onClick={()=>setSearchParams({
          page:page+1,
          per_page:perPage
        })} disabled={page>=totalPage} 
         className="px-4 py-2 rounded-lg border disabled:opacity-40">Next</button>
</div>
    </div>
  );
}

export default AdminProduct;