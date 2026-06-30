import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from "lucide-react";

const SideBar = ({ products }) => {

    const category =products.map((p)=>(  p.category  ))
    const uniqueCategory = ["All", ...new Set(category)]
    console.log(uniqueCategory);
    const brand =products.map((p)=>(  p.brand  ))
    const uniqueBrand = ["All", ...new Set(brand)]
    console.log(uniqueBrand);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
    return (
        <>

         {/* FLOATING MOBILE FILTER BUTTON (Pinned safely to bottom-right) */}
                    <div className="md:hidden fixed bottom-6 right-6 z-40">
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-lg font-semibold text-sm active:scale-95 transition-transform cursor-pointer border border-stone-800"
                        >
                            <SlidersHorizontal size={16} className="text-amber-400" />
                            Filters
                        </button>
                    </div>
            {/* BACKDROP OVERLAY FOR MOBILE: Darkens screen when sidebar drawer opens */}
            {isMobileFilterOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-45 md:hidden transition-opacity animate-fade-in"
                    onClick={() => setIsMobileFilterOpen(false)}
                />
            )}

            {/* SIDEBAR CONTAINER (Desktop: Normal panel | Mobile: Sliding Drawer Panel) */}
            <div className={`
                fixed md:sticky top-0 left-0 h-full md:h-auto w-[280px] md:w-[22%] 
                bg-white md:bg-white/80 backdrop-blur-md p-5 z-50 md:z-10 
                border-r md:border border-stone-200/80 md:border-amber-200/60 shadow-xl md:shadow-sm 
                transition-transform duration-300 ease-in-out self-start
                ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>

                {/* Drawer Header Layout (Visible only on Mobile) */}
                <div className="flex justify-between items-center mb-6 md:mb-4">
                    <h2 className="font-bold text-stone-800 text-base flex items-center gap-2">
                        <SlidersHorizontal size={18} className="text-amber-700" />
                        Filters
                    </h2>
                    {/* Close button inside mobile slide container drawer */}
                    <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="md:hidden p-1 text-stone-400 hover:text-stone-700 rounded-lg bg-stone-100 cursor-pointer transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Filter Inner Forms Options Elements placeholder */}
                <div className="space-y-4 text-sm text-stone-500">
                    <div className="search border-2 flex justify-evenly items-center  ">
                        <Search className='h-5'/>
                        <input type="Search" placeholder='Search...'  className='h-7 focus:outline-none'/>
                    </div>
                    <div>
                        <h3 className="font-semibold text-stone-700 mb-2">Categories</h3>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 text-stone-600 cursor-pointer">
                                <input type="checkbox" className="accent-amber-600 w-4 h-4 rounded" /> 
                                Electronics
                            </label>
                            <label className="flex items-center gap-2 text-stone-600 cursor-pointer">
                                <input type="checkbox" className="accent-amber-600 w-4 h-4 rounded" /> 
                                Sports
                            </label>
                            <label className="flex items-center gap-2 text-stone-600 cursor-pointer">
                                <input type="checkbox" className="accent-amber-600 w-4 h-4 rounded" /> 
                                Home & Kitchen
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;