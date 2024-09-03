import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProducttoCart, reset } from '../../redux/cart/cartSlice';

const ProductPage = () => {
    const params = useParams();
    const { currentUser } = useSelector(state => state.user);
    const { items } = useSelector(state => state.cart);
    const [selectedSize, setSelectedSize] = useState(null); // Track selected size
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const [hoverIndex, setHoverIndex] = useState(null);
    const [previewIndex, setPreviewIndex] = useState(0);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);
    const [formdata, setFormdata] = useState({
        _id: "",
        imagesUrl: [],
        title: '',
        price: "",
        stock: "",
        brand: '',
        sex: '',
        type: '',
        sizes: [],
    });

    const imagePreviews = useMemo(() => 
        formdata.imagesUrl,
        [formdata.imagesUrl]
    );

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/v1/products/getproduct/${params.productid}`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                return;
            }
            setFormdata(data);
            setSizes(data.sizes);
            setImages(data.imagesUrl);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [params.productid]);

    const addtoCart = () => {
        if (quantity <= 0) {
            setError("Add Some Quantity");
        } else if (!selectedSize) {
            setError("Select a Size");
        } else {
            dispatch(addProducttoCart({ product: formdata, quantity: quantity,size: selectedSize }));
            //dispatch(reset())
        }
    }

    const handleSizeClick = (sizeObj) => {
        setSelectedSize(sizeObj);
    };

    useEffect(() => {
        console.log(items);
    }, [items]);

    return (
        <>
        <div className='absolute right-0 mt-10 justify-center items-center top-0 flex flex-col w-[100vw] h-[100vh]'>
            <img className='w-full h-full object-cover' src={images[0]} />
            <div className='w-full absolute flex bg-white bg-opacity-40 backdrop-blur-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-10 h-[100vh]'>
                <div className='relative w-1/2 flex gap-1 font-text justify-center flex-col h-full'>
                    <p className='text-6xl text-wrap w-full pl-10 text-end font-main'>{formdata.title || 'Title'}</p>
                    <div className='flex gap-5 w-full items-center justify-end text-black'>
                        <div className='w-auto'>
                            <p className='text-2xl text-wrap w-full text-end font-main'>Brand:</p>
                            <p className='text-2xl text-wrap w-full text-end font-main'>Type:</p>
                            <p className='text-2xl text-wrap w-full text-end font-main'>Sex:</p>
                            <p className='text-2xl text-wrap w-full text-end font-main'>In Stock:</p>
                        </div>
                        <div>
                            <p className='text-2xl text-wrap w-full text-end font-main'>{formdata.brand || 'Brand'}</p>
                            <p className='text-2xl text-wrap w-full text-end font-main'>{formdata.type || 'Type'}</p>
                            <p className='text-2xl text-wrap w-full text-end font-main'>{formdata.sex || 'Sex'}</p>
                            <p className='text-2xl text-wrap w-full text-end font-main'>{formdata.stock || 'In Stock'}</p>
                        </div>
                    </div>
                    <p className='text-6xl text-wrap w-full text-end font-main'>${formdata.price || 'Price $'}</p>
                    
                    <p className='text-3xl text-wrap w-full text-end font-main'>Sizes:</p>
                    <div className='flex w-full gap-2 justify-end flex-wrap'>
                        <div className='flex flex-wrap justify-end gap-2'>
                            {sizes.map((sizeObj, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSizeClick(sizeObj)}
                                    className={`p-2 font-text font-semibold rounded-xl cursor-pointer ${selectedSize && selectedSize._id === sizeObj._id ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                >
                                    {sizeObj.country}: {sizeObj.size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='text-xl w-full mt-10 font-text tracking-tighter font-semibold gap-5 flex items-end justify-end'>
                        <p className=''>Quantity : 
                            <input 
                                value={quantity} 
                                onChange={(e) => {
                                    e.target.value >= 0 && e.target.value <= formdata.stock && setQuantity(e.target.value);
                                }} 
                                className='outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none max-w-12 p-2 text-center' 
                                placeholder='0' 
                                type='number'
                            />
                        </p>
                        <button onClick={addtoCart} className='p-2 bg-green-500 text-white'>Add To Cart</button>
                    </div>
                </div>
                <div className='w-1/2 flex gap-2 h-full items-center justify-center flex-row'>
                    <div className='w-[70%] h-full relative'>
                        {images.length > 0 && 
                            <img 
                                src={imagePreviews[hoverIndex] || imagePreviews[previewIndex]} 
                                alt='Product Preview' 
                                className='object-scale-down w-full h-full'
                            />    
                        }
                    </div>
                    {images.length > 0 && (
                        <div className='flex gap-2 h-auto relative w-[30%] justify-start'>
                            <div className='gap-2 grid grid-cols-1'>
                                {images.map((file, index) => (
                                    <div 
                                        key={index} 
                                        className='w-[100px] relative h-[100px]'
                                        onMouseEnter={() => setHoverIndex(index)}
                                    >
                                        <img 
                                            className='w-full h-full object-scale-down' 
                                            src={imagePreviews[index]} 
                                            alt={`Thumbnail ${index}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>    
            </div>
        </div>
        </>
    );
};

export default ProductPage;
