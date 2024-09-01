import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductBox from '../utils/ProductBox';
import { CiSearch } from 'react-icons/ci';

const optionsBrand = [
    { value: '', label: 'All' },
    { value: 'nike', label: 'Nike' },
    { value: 'onitsuka', label: 'Onitsuka' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'puma', label: 'Puma' }
];

const optionsType = [
    { value: '', label: 'All' },
    { value: 'runner', label: 'Runner' },
    { value: 'slip-on', label: 'Slip-on' },
    { value: 'sneaker', label: 'Sneaker' },
    { value: 'football', label: 'Football' }
];

const optionsSex = [
    { value: '', label: 'All' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' }
];

const customTheme = (theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary: 'black',
        primary25: 'lightgray',
        neutral0: 'white',
        neutral20: 'black'
    }
});

const Search = () => {
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [newlocation,setnewlocation] = useState(null)
    const [query, setQuery] = useState({
        brand: '',
        title: '',
        sex: '',
        type: '',
    });
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const fetchMoreProducts = () => {
        if (total > products.length && !loading) {
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                fetchProducts(nextPage);
                return nextPage;
            });
        }
    };

    const searchSubmit = async() => {
        const urlParams = new URLSearchParams()
        if(query.type){
            urlParams.set("type",query.type)
        }
        if(query.title){
            urlParams.set("title",query.title)
        }
        if(query.brand){
            urlParams.set("brand",query.brand)
        }
        if(query.sex){
            urlParams.set("sex",query.sex)
        }
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
        
        setPage(0);
        setProducts([]);
        fetchProducts(0);
    }

    const handleFilterChange = (selectedOption, actionMeta) => {
        setQuery(prevQuery => ({
            ...prevQuery,
            [actionMeta.name]: selectedOption ? selectedOption.value : '',
            page: 0
        }));
    };

    const fetchProducts = async (page) => {
        setLoading(true);
        
        const queryParams = new URLSearchParams({ ...query, page }).toString();
        console.log(queryParams)
        try {
            const res = await fetch(`/api/v1/products/search?${queryParams}`);
            const data = await res.json();

            if (data.success === false) {
                setError('Failed to fetch products');
                return;
            }

            setTotal(data.total);
            setProducts(prevProducts => (page === 0 ? data.products : [...prevProducts, ...data.products]));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(()=>{
        setPage(0);
        setProducts([]);
        fetchProducts(0)
        setnewlocation(false)
    },[newlocation === true])

    useEffect(() => {
        console.log(location.search,"location")
        const urlParams = new URLSearchParams(location.search);
        const titleFromUrl = urlParams.get("title") || "";
        const typeFromUrl = urlParams.get("type") || "";
        const brandFromUrl = urlParams.get("brand") || "";
        const sexFromUrl = urlParams.get("sex") || "";

        setQuery({
            title: titleFromUrl,
            type: typeFromUrl,
            brand: brandFromUrl,
            sex: sexFromUrl
        });   
        setnewlocation(true);
    }, [location.search]);

    return (
        <div className='w-screen h-screen flex relative'>
            <div className="w-[20%] px-10 justify-center gap-5 h-full fixed top-0 flex flex-col bg-white shadow-lg">
                <p className='font-main w-full text-center text-5xl'>Search Filter</p>
                <div className='flex relative text-lg font-text tracking-tighter font-semibold'>
                    <input 
                        name='title' 
                        value={query.title} 
                        onChange={e => handleFilterChange({ value: e.target.value }, { name: 'title' })} 
                        placeholder='search' 
                        className='border-[1px] border-black p-2 w-full rounded-lg' 
                    />
                    <CiSearch 
                        onClick={searchSubmit}
                        className='h-full w-8 z-10 absolute right-2 cursor-pointer' 
                    />
                </div>
                <div className='text-lg font-text tracking-tighter font-semibold'>
                    <label>Brand :</label>
                    <Select
                        name='brand'
                        options={optionsBrand}
                        value={optionsBrand.find(option => option.value === query.brand)}
                        onChange={(selectedOption) => handleFilterChange(selectedOption, { name: 'brand' })}
                        theme={customTheme}
                    />
                </div>
                <div className='text-lg font-text tracking-tighter font-semibold'>
                    <label>Type :</label>
                    <Select
                        name='type'
                        options={optionsType}
                        value={optionsType.find(option => option.value === query.type)}
                        onChange={(selectedOption) => handleFilterChange(selectedOption, { name: 'type' })}
                        theme={customTheme}
                    />
                </div>
                <div className='text-lg font-text tracking-tighter font-semibold'>
                    <label>Sex :</label>
                    <Select
                        name='sex'
                        options={optionsSex}
                        value={optionsSex.find(option => option.value === query.sex)}
                        onChange={(selectedOption) => handleFilterChange(selectedOption, { name: 'sex' })}
                        theme={customTheme}
                    />
                </div>
            </div>
            <div className='w-[80%] flex mt-20 flex-col h-auto absolute right-0 top-0'>
                <div className='w-full flex items-center justify-center py-10'>
                    <InfiniteScroll
                        dataLength={products.length}
                        next={fetchMoreProducts}
                        hasMore={products.length < total}
                        className='w-full p-5'
                    >
                        <div className='w-full grid grid-cols-4 gap-4'>
                            {products.map((product, index) => (
                                <ProductBox product={product} key={index} />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default Search;
