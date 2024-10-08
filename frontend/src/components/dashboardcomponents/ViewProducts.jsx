import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import AdminProductBox from '../utils/AdminProductBox';

const ViewProducts = () => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState({
    brand: '',
    sex: '',
    type: '',
    page
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const newQuery = { ...query, page };
      const queryParams = new URLSearchParams(newQuery).toString();
      console.log(queryParams);
      const res = await fetch(`/api/v1/products/search?${queryParams}`);
      const data = await res.json();
      if (data.success === false) {
        setError('Failed to fetch products');
        return;
      }
      setTotal(data.total);
      setProducts(prevProducts => [...prevProducts, ...data.products]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreProducts = () => {
    if (!loading) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchProducts(nextPage);
        return nextPage;
      });
    }
  };

  useEffect(() => {
    setPage(0);
    setProducts([]);
    fetchProducts(0);
  }, [query]);

  const handleFilterChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
      page: 0
    });
  };

  return (
    <div className='absolute right-0 top-0 flex flex-col w-[75vw]'>
      <div className='flex justify-between gap-2 p-2 mt-10 px-10 w-full font-main'>
        <p className='text-5xl'>View Products</p>
        <button
          onClick={() => navigate('/admin/createproducts')}
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
      <div className='w-full flex flex-col relative'>
        <p className='text-3xl font-main w-full text-center'>Total Results : {total}</p>
        <div className='w-full flex items-center justify-center py-10 overflow-hidden'>
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreProducts}
            hasMore={products.length < total}
            className='w-full p-2'
          >
            <div className='w-full grid grid-cols-4 gap-4'>
                {products.map((product, index) => (
                  <AdminProductBox product={product} key={index}/>
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
