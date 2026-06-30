import React from "react";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Card = ({ product, isLoading }) => {
    return (
        <div className="bg-white w-full max-w-[220px] rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">





            {/* Aspect Ratio Balanced Image Box */}
            <div className="w-full h-40 overflow-hidden bg-stone-50 relative shrink-0">
                {isLoading ? <Skeleton className="aspect-video w-full" />
                    : <img
                        src={product.productImg?.[0]?.url || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400"}
                        alt={product.productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />}
            </div>

            {/* Product Details Wrapper */}
            <div className="p-3 flex flex-col flex-1 justify-between gap-2 bg-white">
                <div>
                    <h2 className="text-xs md:text-sm font-semibold text-stone-800 line-clamp-2 min-h-[36px] leading-tight">
                        {product.productName}
                    </h2>

                    <p className="text-base font-extrabold text-amber-700 mt-1">
                        ₹{product.productPrice?.toLocaleString('en-IN')}
                    </p>
                </div>

                <button
                    className="w-full bg-stone-900 hover:bg-amber-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs tracking-wide transition-colors shadow-sm cursor-pointer"
                >
                    <ShoppingCart size={14} />
                    Add to Cart
                </button>
            </div>

        </div>
    );
};

export default Card;