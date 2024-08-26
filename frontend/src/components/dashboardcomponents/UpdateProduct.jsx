import React, { useState, useMemo } from 'react';
import { IoAdd, IoClose, IoCloseCircle, IoTrash } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdateProduct = () => {
    const { currentUser } = useSelector(state => state.user);
    const [hoverIndex, setHoverIndex] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading,setloading] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [country, setCountry] = useState('');
    const [size, setSize] = useState('');
    const [images, setImages] = useState([]);
    const [formdata, setFormdata] = useState({
        imagesUrl: [],
        title: '',
        price: 0,
        stock: 0,
        brand: '',
        sex: '',
        type: '',
        sizes: [],
    });

    const uploadImagesToCloudinary = async (images) => {
        const uploadPromises = images.map(async image => {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'dribbler');
            formData.append('cloud_name', 'feyhide');

            const response = await fetch('https://api.cloudinary.com/v1_1/feyhide/image/upload', {
                method: 'POST',
                body: formData,
            });
            return await response.json();
        });

        return Promise.all(uploadPromises);
    };

    const submitForm = async (e) => {
        setloading(true)
        e.preventDefault();

        try {
            if (images.length < 1) {
                setError("You must upload at least one image");
                return;
            }

            const uploadResults = await uploadImagesToCloudinary(images);
            const imagesUrl = uploadResults.map(result => result.secure_url);

            const updatedFormdata = {
                ...formdata,
                imagesUrl,
                userRef: currentUser._id
            };

            const res = await fetch(`/api/v1/products/addproduct`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(updatedFormdata)
            });

            const data = await res.json();
            console.log("Product added successfully", data);
            setloading(false)
        } catch (error) {
            setError(error.message);
        }
    };

    const addSize = (e) => {
        e.preventDefault();
        if (country && size) {
            const newSize = { country: country.toUpperCase(), size };
            const updatedSizes = [...sizes, newSize];
            setSizes(updatedSizes);
            setFormdata({
                ...formdata,
                sizes: updatedSizes
            });
            setCountry('');
            setSize('');
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 6) {
            alert('You can only upload up to 6 images.');
        } else {
            setImages(prevImages => [...prevImages, ...files]);
        }
    };

    const deleteFile = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleFormChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.id]: e.target.value
        });
    };

    const imagePreviews = useMemo(() => 
        images.map(file => URL.createObjectURL(file)),
        [images]
    );

    return (
        <>
        <div className='absolute right-0 top-0 flex flex-col w-[75vw]'>
            {loading && (
                <div className='flex items-center justify-center absolute top-0 w-full z-50 h-full bg-opacity-20 backdrop-blur-sm bg-white'>
                    <div className='w-1/2 h-1/3 flex items-center relative justify-center font-text font-semibold text-2xl bg-white rounded-lg'>
                        {!error ? (<p>Creating Product...</p>):
                        (<p>{error}</p>)}
                        { error && (<button className='w-[40px] h-[40px] absolute top-10 left-10 text-white flex items-center justify-center bg-red-600'>
                            <IoClose className="w-full h-[70%]"/>
                        </button>)}
                    </div>
                </div>
            )}
            <div className='flex justify-between gap-2 p-2 mt-10  px-10 w-full font-main'>
                <p className='text-5xl'>Create Product</p>
                <button 
                    onClick={() => navigate("/admin/viewproducts")} 
                    className='text-3xl bg-green-500 text-white p-2 rounded-xl'
                    >
                    View Products
                </button>
            </div>
            <form onSubmit={submitForm} className='w-full flex h-[80vh]'>
                <div className='relative w-1/2 flex gap-2 font-text justify-center px-10 flex-col h-full bg-white'>
                    <button type='submit' className='absolute top-20 right-0 mr-10 text-2xl bg-green-400 text-white p-2 px-4'>Create</button>
                    <input 
                        id="title"
                        onChange={handleFormChange}
                        type='text' 
                        placeholder='Title' 
                        className='text-5xl text-wrap w-full text-end font-main'
                        />
                    <div className='flex flex-col'>
                        <input 
                            type='text'
                            id="brand"
                            onChange={handleFormChange}
                            placeholder='Brand' 
                            className='text-2xl text-wrap w-full text-end font-main'
                            />
                        <input 
                            type='text'
                            id="type"
                            onChange={handleFormChange}
                            placeholder='Type' 
                            className='text-2xl text-wrap w-full text-end font-main'
                            />
                        <input 
                            id="sex"
                            onChange={handleFormChange}
                            type='text' 
                            placeholder='Sex' 
                            className='text-2xl text-wrap w-full text-end font-main'
                            />
                        <input 
                            id="stock"
                            onChange={handleFormChange}
                            type='number' 
                            placeholder='In Stock'  
                            className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-2xl text-wrap w-full text-end font-main'
                            />
                    </div>
                    <input 
                        step="0.01" 
                        type='number'
                        id="price"
                        onChange={handleFormChange}
                        placeholder='Price $' 
                        className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-2xl text-wrap w-full text-end font-main'
                        />
                    <p className='text-2xl text-wrap w-full text-end font-main'>Sizes:</p>
                    <div className='flex w-full gap-2 justify-end flex-wrap'>
                        <div className='flex flex-wrap justify-end gap-2'>
                            {sizes.map((sizeObj, index) => (
                                <div key={index} className='p-2 font-text font-semibold bg-red-500 text-white rounded-xl'>
                                    {sizeObj.country}: {sizeObj.size}
                                </div>
                            ))}
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input
                                type='text' 
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder='Country'
                                className='w-20 text-center border rounded-xl'
                                />
                            <input 
                                type='number'
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                placeholder='Size'
                                className='w-16 text-center border rounded-xl'
                            />
                            <button 
                                onClick={addSize}
                                className='w-8 bg-green-400 text-white'
                            >
                                <IoAdd className='w-full h-full'/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-1/2 flex gap-2 h-[80vh] items-center justify-center flex-row'>
                    <div className='w-[70%] h-full relative'>
                        {images.length > 0 ? (
                            <img 
                            src={imagePreviews[hoverIndex] || imagePreviews[0]} 
                            alt='Product Preview' 
                            className='object-scale-down w-full h-full'
                            />
                        ) : (
                            <div className='flex flex-col font-text font-semibold items-center justify-center w-full h-full bg-slate-200 bg-opacity-50 backdrop-blur-sm'>
                                <input 
                                    onChange={handleFileChange} 
                                    type='file' 
                                    multiple 
                                    id='fileInput' 
                                    className='w-full h-full hidden'
                                    />
                                <label
                                    htmlFor='fileInput'
                                    className='flex flex-col items-center justify-center w-full h-full cursor-pointer'
                                    >
                                    <IoAdd className='w-[20%] h-[50%]'/>
                                    <p>Upload Images</p>
                                    <p>Only 6 Images Allowed</p>
                                </label>
                            </div>
                        )}
                    </div>
                    {images.length > 0 && (
                        <div className='flex gap-2 h-full relative w-[30%] justify-start'>
                            <div className='gap-2 grid grid-cols-1'>
                                
                                {images.map((file, index) => (
                                    <div 
                                    key={index} 
                                    className='w-[100px] relative h-[100px]'
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                    >
                                        <IoTrash 
                                            onClick={() => deleteFile(index)} 
                                            className='absolute top-2 right-2 text-red-600 cursor-pointer'
                                            />
                                        <img 
                                            className='w-full h-full object-scale-down' 
                                            src={imagePreviews[index]} 
                                            alt={`Thumbnail ${index}`}
                                            />
                                    </div>
                                ))}
                                {images.length < 6 && (
                                    <div className='w-[100px] h-[100px]'>
                                        <input 
                                            onChange={handleFileChange} 
                                            multiple
                                            type='file'
                                            id="fileInput"
                                            className='w-full h-full hidden'
                                        />
                                        <label htmlFor='fileInput' className="w-full h-full flex items-center justify-center bg-green-400">
                                            <IoAdd className='w-1/2 h-1/2 text-white'/>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>    
            </form>
        </div>
        </>
    );
};

export default UpdateProduct;
