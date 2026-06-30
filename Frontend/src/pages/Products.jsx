import React, { useEffect, useState } from 'react';
import Card from "../app Components/Card.jsx";
import SideBar from '../app Components/SideBar.jsx'; // 👈 Imported separate component
import axios from 'axios';
import { SlidersHorizontal } from "lucide-react";
import SkeletonCard from '../app Components/Skeleton.jsx';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    "http://localhost:3000/api/product/allProducts"
                );
                if (response.data.success) {
                    setProducts(response.data.products);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fef3c7] to-[#fed7aa] p-4 md:p-6 font-sans relative">

           

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

                {/* 👈 DETACHED FILTER SIDEBAR MODULE */}
                <SideBar 
                    isOpen={isMobileFilterOpen} 
                    onClose={() => setIsMobileFilterOpen(false)} 
                    products={products}
                />

                {/* PRODUCT LIST GRID FEED */}
                <div className="Products flex-1">
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="w-full h-64 flex justify-center items-center bg-white/40 rounded-2xl border border-dashed border-amber-300">
                            <p className="text-stone-600 font-medium">No products found...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                            {products.map((product) => (
                                <Card key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Products;