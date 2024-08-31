import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";

const ViewProducts = () => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({
    brand: '',
    sex: '',
    type: '',
    page: 0
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(query).toString();
      const res = await fetch(`/api/v1/products/search?${queryParams}`);
      const data = await res.json();
      if (data.success === false) {
        setError('Failed to fetch products');
        return;
      }
      setTotal(data.total)
      setProducts(data.products || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  const handleFilterChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='absolute right-0 top-0 flex flex-col w-[75vw]'>
      <div className='flex justify-between gap-2 p-2 mt-10 px-10 w-full font-main'>
        <p className='text-5xl'>View Products</p>
        <button
          onClick={() => navigate("/admin/createproducts")}
          className='text-3xl bg-green-500 text-white p-2 rounded-xl'
        >
          Create Product
        </button>
      </div>
      <div className='w-full h-[20vh] flex items-center'>
        <div className='relative w-full gap-10 flex h-1/2 font-main items-center justify-center bg-black text-white'>
          <p className='text-3xl left-10 absolute'>Filter</p>
          <div className='w-auto flex gap-1'>
            <label className='text-2xl p-1'>Brand:</label>
            <select
              name='brand'
              value={query.brand}
              onChange={handleFilterChange}
              className='text-2xl bg-blue-800 p-1'
            >
              <option value="">All</option>
              <option value="nike">Nike</option>
              <option value="onitsuka">Onitsuka</option>
              <option value="adidas">Adidas</option>
              <option value="puma">Puma</option>
            </select>
          </div>
          <div className='w-auto flex gap-1'>
            <label className='text-2xl p-1'>Sex:</label>
            <select
              name='sex'
              value={query.sex}
              onChange={handleFilterChange}
              className='bg-blue-800 p-1 text-2xl'
            >
              <option value="">All</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className='w-auto flex gap-1'>
            <label className='text-2xl p-1'>Type:</label>
            <select
              name='type'
              value={query.type}
              onChange={handleFilterChange}
              className='text-2xl bg-blue-800 p-1'
            >
              <option value="">All</option>
              <option value="runner">Runner</option>
              <option value="slip-on">Slip-on</option>
              <option value="sneaker">Sneaker</option>
              <option value="football">Football</option>
            </select>
          </div>
        </div>
      </div>
      <div className='w-full relative'>
        <p className='text-3xl font-main w-full text-center'>Total Results : {total}</p>
        <div className='w-full p-10 flex items-center justify-center'>
          <div className='w-auto grid grid-cols-4 gap-5'>
            {products && products.map((product,index)=>(
              <div className='relative hover:scale-105 hover:z-30 transition-all duration-300 ease-in-out w-[250px] min-h-[300px] rounded-xl overflow-hidden flex flex-col hover:bg-gray-100 bg-white items-start'>
                <MdEdit onClick={()=>navigate(`/admin/updateproduct/${product._id}`)} className='absolute top-5 right-5 '/>
                <img src={product.imagesUrl[0]} className='  object-scale-down'/>
                <div className='flex w-full h-full flex-col items-center justify-center gap-1 p-2 text-lg font-text font-semibold tracking-tighter'>
                  <p className='text-wrap text-center'>{product.title}</p>
                  <p>$ {product.price}</p>
                  <div className='flex flex-col items-center justify-center font-normal text-sm capitalize'>
                    <p>- {product.brand}</p>
                    <p>- {product.sex}</p>
                    <p>- {product.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
