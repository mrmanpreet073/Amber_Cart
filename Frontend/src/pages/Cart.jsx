import { removeFromCart, setCart } from '@/Redux/productSice';
import axios from 'axios';
import { IndianRupee, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';



const Cart = () => {

  const { cart } = useSelector(store => store.product);
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  const subTotal = cart.totalPrice;
  let shipping = 0;

  if (cart?.items?.length !== 0) {
    shipping = subTotal > 500 ? 0 : 10;
  }
  const tax = subTotal * 0.18;
  const total = subTotal + shipping + tax

  // const increment = () => setQuantity(prev => prev + 1);
  // const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const updateQuantity = async (productId, type) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart/update",
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        fetchLatestCart();
      }
    } catch (error) {
      console.log(error.response);

    }
  };

  const accessToken = localStorage.getItem("accessToken")

  const removeItem = async (productId) => {
    try {
      const res = await axios.post("http://localhost:3000/api/cart/delete",
        { productId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      // console.log("productId", productId);

      if (res.data.success) {
        await fetchLatestCart()  // ← re-fetch after successful delete
        // toast.success("Item removed")
      }
      if (res?.data?.success === false) {
        if (res?.data?.message === "Product not found in cart") {
          dispatch(removeFromCart(productId));

        }
      }
    } catch (error) {
      console.log(error.response);
      // console.log("Remove Response", res);

    }
  }

  const fetchLatestCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart/", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      )
      if (res.data.success) {
        // console.log("cart data", res.data.cart);
        // toast.success("Product fetched")

        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchLatestCart()
  }, [])

  return (
    <>
      <section className="bg-gradient-to-r from-amber-300 via-orange-100 to-amber-300py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart?.items?.map((item) => (
                  <div key={uuidv4()} className="rounded-lg border border-gray-200  bg-white/50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4  md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <button className="shrink-0 md:order-1">
                        <img onClick={() => (navigate(`/product/${item?.productId?._id}`))}
                          className="h-20 w-20 dark:hidden cursor-pointer" src={item?.productId?.productImg[0]?.url} alt="imac image" />
                        {/* <img className="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" /> */}
                      </button>

                      <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">

                          {/* Decrement */}
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId._id, "decrement")}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                          >
                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                          </button>

                          {/* Display */}
                          <span className="w-10 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>

                          {/* Increment */}
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId._id, "increment")}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                          >
                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>

                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <button onClick={() => (navigate(`/product/${item?.productId?._id}`))}
                          className="text-base font-medium text-gray-900 hover:underline dark:text-white line-clamp-2 cursor-pointer">{item?.productId?.productName}</button>

                        <div className="flex items-center gap-4 py-4">
                          <button type="button" className="inline-flex items-center text-sm font-medium text-green-700 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">

                            ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                          </button>

                          <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <Trash2 className='h-4 cursor-pointer'
                              onClick={() => removeItem(item?.productId?._id)} />

                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>

            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200  bg-white/50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white flex items-center"><IndianRupee className='h-4 ' />{(cart.totalPrice).toLocaleString("en-IN")}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                      <dd className="text-base font-medium text-green-600">- ₹00</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Shipping Changes (free above ₹ 500)</dt>
                      <dd className="text-base font-medium text-red-600 dark:text-white">+ ₹{shipping.toLocaleString("en-IN")}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax(18%)</dt>
                      <dd className="text-base font-medium text-red-600 dark:text-white">+ ₹{Number(tax.toFixed(2)).toLocaleString("en-IN")}</dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white flex items-center "><IndianRupee className='h-4 text-green-600' />{Number(total.toFixed(2)).toLocaleString("en-IN")}</dd>
                  </dl>
                </div>
                <div className='flex gap-4 justify-between '>
                  <input type="text"
                    placeholder='PROMO CODE'
                    className='bg-white w-full h-10 rounded-md shadow-2xl p-2'
                  />
                  <button className='bg-amber-600 h-10 p-2 rounded-md text-white'>Apply</button>
                </div>

                <button 
                onClick={()=>(navigate("/address"))}
                className="flex w-full items-center justify-center rounded-lg bg-amber-600 cursor-pointer hover:bg-amber-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >Proceed to Checkout</button>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                  <button onClick={() => navigate("/products")} className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                    Continue Shopping
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </button>
                </div>
                <hr />
                <div className='text-gray-400 text-sm'>
                  <p>* Free Shipping on order above ₹500</p>
                  <p>* 100 Days Return Policy</p>
                  <p>* Secure Checkout with SSL encryption</p>
                </div>
              </div>

              {/* <div className="space-y-4 rounded-lg border border-gray-200  bg-white/50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                    <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                  </div>
                  <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">Apply Code</button>
                </form>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart
