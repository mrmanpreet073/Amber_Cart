import React from 'react'
import { useForm } from "react-hook-form";



const Address = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <div>
                <div className="navbar">
                    AmberCart
                </div>

                <div className="body flex">
                    <div className="left w-[60%] border p-4">
                        <h1 className='text-xl p-1 font-bold text-amber-700'>Checkout</h1>
                        <div>
                            <h3 className='text-xl p-1 font-semibold text-slate-800'>Select a Delivery Address</h3>
                        </div>
                        <div className='w-full max-w-xl  bg-white rounded-2xl border border-slate-100  p-6 md:p-8 shadow-xl shadow-slate-200/50 my-2'>
                            {/*  selected Address */}
                        </div>
                        <div className="w-full max-w-xl  bg-white rounded-2xl border border-slate-100  p-6 md:p-8 shadow-xl shadow-slate-200/50">

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-slate-800">Add New Address</h3>
                                <p className="text-sm text-slate-500">Please enter your accurate shipping details.</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

                                {/* Full Name & Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className={`w-full bg-slate-50 text-slate-900 border h-11 rounded-lg px-4 text-sm outline-none transition-all duration-300 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${errors.fullName ? 'border-red-500/60' : 'border-slate-200'}`}
                                            {...register("fullName", { required: "Full Name is required" })}
                                        />
                                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700">Phone</label>
                                        <input
                                            type="text"
                                            placeholder="10-digit mobile number"
                                            className={`w-full bg-slate-50 text-slate-900 border h-11 rounded-lg px-4 text-sm outline-none transition-all duration-300 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${errors.phone ? 'border-red-500/60' : 'border-slate-200'}`}
                                            {...register("phone", {
                                                required: "Phone is required",
                                                minLength: { value: 10, message: "Phone must be 10 digits" },
                                                maxLength: { value: 10, message: "Phone must be 10 digits" },
                                            })}
                                        />
                                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                {/* Street Address */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-700">Street Address</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Flat/House no., Building, Apartment, Street"
                                        className={`w-full bg-slate-50 text-slate-900 border rounded-lg p-3 text-sm outline-none resize-none transition-all duration-300 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${errors.address ? 'border-red-500/60' : 'border-slate-200'}`}
                                        {...register("address", { required: "Address is required" })}
                                    />
                                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
                                </div>

                                {/* City & State */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700">City</label>
                                        <input
                                            type="text"
                                            placeholder="City name"
                                            className={`w-full bg-slate-50 text-slate-900 border h-11 rounded-lg px-4 text-sm outline-none transition-all duration-300 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${errors.city ? 'border-red-500/60' : 'border-slate-200'}`}
                                            {...register("city", { required: "City is required" })}
                                        />
                                        {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700">State</label>
                                        <input
                                            type="text"
                                            placeholder="State region"
                                            className={`w-full bg-slate-50 text-slate-900 border h-11 rounded-lg px-4 text-sm outline-none transition-all duration-300 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${errors.state ? 'border-red-500/60' : 'border-slate-200'}`}
                                            {...register("state", { required: "State is required" })}
                                        />
                                        {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
                                    </div>
                                </div>

                                {/* Postal Code & Country */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700">Postal Code / PIN</label>
                                        <input
                                            type="text"
                                            placeholder="6-digit code"
                                            className={`w-full bg-slate-50 text-slate-900 border h-11 rounded-lg px-4 text-sm outline-none transition-all duration-300 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${errors.postalCode ? 'border-red-500/60' : 'border-slate-200'}`}
                                            {...register("postalCode", { required: "Postal Code is required" })}
                                        />
                                        {errors.postalCode && <p className="text-xs text-red-500 mt-1">{errors.postalCode.message}</p>}
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700">Country</label>
                                        <input
                                            type="text"
                                            defaultValue="India"
                                            className={`w-full bg-slate-50 text-slate-900 border h-11 rounded-lg px-4 text-sm outline-none transition-all duration-300 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${errors.country ? 'border-red-500/60' : 'border-slate-200'}`}
                                            {...register("country", { required: "Country is required" })}
                                        />
                                        {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
                                    </div>
                                </div>

                                {/* Form Action Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="  w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl tracking-wide shadow-md shadow-amber-500/20 active:scale-[0.99] transition-all duration-200"
                                    >
                                        Save & Deliver Here
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="right">
                        <h1>Order Summary</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Address
