import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

    const { productId } = useParams()
    const { products,currency,addToCart } = useContext(ShopContext)

    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState("")

    const [size, setSize] = useState('')

    const fetchProductData =async () => {
      products.map((item)=>{
        if( item._id === productId){
          setProductData(item)
            setImage(item.image[0]);
        }
            return null;
      });
        
    }

    useEffect(() => {
        fetchProductData()
    }, [productId])

    // if (!productData) {
    //     return <div className="opacity-0"></div>
    // }

    return productData ? (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

            {/* Product Data */}
            <div className="flex flex-col sm:flex-row gap-12">

                {/* Images */}
                <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">

                    {/* Thumbnail Images */}
                    <div className="flex sm:flex-col gap-3 sm:w-[18%] overflow-x-auto sm:overflow-y-auto">

                        {productData.image.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                onClick={() => setImage(item)}
                                className="w-[24%] sm:w-full cursor-pointer border object-cover"
                                alt=""
                            />
                        ))}

                    </div>

                    {/* Main Image */}
                    <div className="flex-1">
                        <img
                            src={image}
                            className="w-full h-auto object-cover"
                            alt=""
                        />
                    </div>

                </div>

                {/* Product Info */}
                <div className="flex-1">

                    <h1 className="font-medium text-2xl mt-2">
                        {productData.name}
                    </h1>

                    <div className="flex items-center gap-1 mt-2">
                        <img src={assets.star_icon} className="w-4" alt="" />
                        <img src={assets.star_icon} className="w-4" alt="" />
                        <img src={assets.star_icon} className="w-4" alt="" />
                        <img src={assets.star_icon} className="w-4" alt="" />
                        <img src={assets.star_icon} className="w-4" alt="" />
                    </div>

                    <p className="mt-5 text-3xl font-medium">
                        ${productData.price}
                    </p>

                    <p className="mt-5 text-gray-500 md:w-4/5">
                        {productData.description}
                    </p>

                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                          {productData.sizes.map((item,index)=>(
                            <button onClick={()=>setSize(item)} className={`border py-2  px-4 bg-gray-100 ${item === size ? 'border-orange-500':''}` } key={index}>{item}</button>
                          ))}
                        </div>
                    </div>

                    <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                    <hr  className='mt-8 sm:w-4/5'/>
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                          <p>100% Original Product.</p>
                          <p>Cash on delivery is available on this product.</p>
                          <p>Easy return and exchange policy within 7 days.</p>
                    </div>

                </div>

            </div>

            <div className='mt-20'>
                <div className='flex'>
                  <b className='border px-5 py-3 text-sm'>Description </b>
                  <b className='border px-5 py-3 text-sm'>Reviews (122) </b>
                </div>
                <div className='flex flex-col gap-4  border px-6 py-6 text-sm text-gray-500'>
                          <p>An ecommerce website is an online platform that facilitates the buying and selling presence. E-commerce websites have gained due to their convienence. E-commerce websites have gained due to their convienence.An ecommerce website is an online platform that facilitates the buying and selling presence.An ecommerce website is an online platform that facilitates the buying and selling presence.</p>

                          <p>An ecommerce website is an online platform that facilitates the buying and selling presenceAn ecommerce website is an online platform that facilitates the buying and selling presence.</p>
                </div>
            </div>
                          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
        </div>
    ) : <div className='opacity-0'></div>
}

export default Product