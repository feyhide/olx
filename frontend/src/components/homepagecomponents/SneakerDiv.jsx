import React, { useEffect, useState } from 'react'
import ProductBox from '../utils/ProductBox';
import { useNavigate } from 'react-router-dom';

const SneakerDiv = () => {
    const [error, setError] = useState(null);
    const [menproducts, setmenProducts] = useState([]);
    const [womenproducts, setwomenProducts] = useState([]);
    const [kidsproducts, setkidsProducts] = useState([]);
     const [query, setQuery] = useState({
      type: 'sneaker',
      sex: "",
      limit: 4
    });
    const [loading, setLoading] = useState(false);
      
    const fetchProducts = async (sex) => {
        setLoading(true);
        try {
          const newQuery = { ...query, sex };
          const queryParams = new URLSearchParams(newQuery).toString();
          const res = await fetch(`/api/v1/products/search?${queryParams}`);
          const data = await res.json();
          if (data.success === false) {
            setError('Failed to fetch products');
            return;
          }
          if(sex === "men"){
            setmenProducts(data.products);
          }else if(sex === 'women'){
            setwomenProducts(data.products);
          }else{
            setkidsProducts(data.products)
          }
          console.log(products)
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
    };
  
    useEffect(()=>{
        fetchProducts("men");
        fetchProducts("women");
        fetchProducts("kids");
    },[])

    const navigate = useNavigate()

    const goto = (sex) => {
      const urlParams = new URLSearchParams()
      urlParams.set("type","sneaker")
      urlParams.set("sex",sex)
      const searchQuery = urlParams.toString()
      navigate(`/search?${searchQuery}`)
    }
    return (
    <div className='w-[100vw] relative pt-10 min-h-[100vh] flex flex-col items-center justify-center bg-white'>
          <p className='text-7xl font-main'>Explore Sneakers</p>
          {menproducts.length > 1 && <div onClick={()=>goto("men")} className='w-full min-h-[40vh] flex flex-col relative items-center justify-center gap-4 py-5'>
            <p className='text-3xl font-text tracking-tighter'>For Men</p>
            <div className='w-full h-full gap-5 flex items-center justify-center'>
                {menproducts && menproducts.map((product,index)=>(
                    <ProductBox product={product} key={index}/>
                ))}
            </div>
          </div>}
          {womenproducts.length > 1 && <div onClick={()=>goto("women")} className='w-full min-h-[40vh] flex flex-col items-center justify-center gap-4 py-5'>
            <p className='text-3xl font-text tracking-tighter'>For Women</p>
            <div className='w-full h-full gap-5 flex items-center justify-center'>
                {womenproducts && womenproducts.map((product,index)=>(
                    <ProductBox product={product} key={index}/>
                ))}
            </div>
          </div>}
          {kidsproducts.length > 1 && <div onClick={()=>goto("kids")} className='w-full min-h-[40vh] flex flex-col items-center justify-center gap-4 py-5'>
            <p className='text-3xl font-text tracking-tighter'>For Kids</p>
            <div className='w-full h-full gap-5 flex items-center justify-center'>
                {kidsproducts && kidsproducts.map((product,index)=>(
                    <ProductBox product={product} key={index}/>
                ))}
            </div>
          </div>}
    </div>
  )
}

export default SneakerDiv