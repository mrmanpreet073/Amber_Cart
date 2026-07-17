import React, { useEffect, useState } from 'react';
import Card from "../app Components/Card.jsx";
import SideBar from '../app Components/SideBar.jsx'; // 👈 Imported separate component
import axios from 'axios';
import { ArrowLeftCircle, ChevronDown, ShoppingBag, SlidersHorizontal } from "lucide-react";
import SkeletonCard from '../app Components/Skeleton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/Redux/store.js';

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { setProduct } from '@/Redux/productSice.js';
import { useNavigate } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { v4 as uuidv4 } from 'uuid';


const Products = () => {
    const navigate = useNavigate()

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [priceRange, setPriceRange] = useState([0, 999999])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [brand, setBrand] = useState("All")
    const [order, setOrder] = useState("")
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.product)



    const handleOrder = (value) => {
        setOrder(value)
    }


    const { allProducts } = useSelector(store => store.product);
    // console.log("allProducts", products);
    // console.log("allProducts", allProducts);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    "http://localhost:3000/api/product/allProducts"
                );
                // console.log("Response", response);
                if (response.data.success) {
                    setProducts(response.data.products);
                    dispatch(setProduct(response.data.products))
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products?.length === 0) return

        let filtered = [...products];

        if (search.trim() !== "") {
            filtered = filtered.filter((product) => (
                product.productName?.toLowerCase().includes(search.toLowerCase())
            ))
        }
        if (category !== "All") {
            filtered = filtered.filter((product) => (
                product?.category === category
            ))
        }
        if (brand !== "All") {
            filtered = filtered.filter((product) => (
                product?.brand === brand
            ))
        }

        filtered = filtered.filter((p) => (p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]))

        if (order === "lowToHigh") {
            filtered.sort(
                (a, b) => a.productPrice - b.productPrice
            );
        }

        if (order === "highToLow") {
            filtered.sort(
                (a, b) => b.productPrice - a.productPrice
            );
        }
        
        setFilteredProducts(filtered)
        // console.log("filtered",filteredProducts);
    }, [
        products,
        search,
        category,
        brand,
        priceRange,
        order
    ]);

    // console.log("order", order);


    return (
        // bg-gradient-to-br from-[#fef3c7] to-[#fed7aa]
        <div className="min-h-screen bg-gradient-to-r from-amber-300 via-orange-100 to-amber-300 p-4 md:p-2 font-sans relative ">

            <div className='h-12  bg-white/50 my-4 flex justify-between items-center px-4 rounded-md  max-w-7xl mx-auto '>

                <div>
                    <Breadcrumb>
                    <BreadcrumbList className={"flex"}>
                        <BreadcrumbItem className={"text-black"}>
                            <BreadcrumbLink onClick={() => navigate("/")}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className={"font-bold "}>
                            <BreadcrumbLink onClick={() => navigate("/products")}>Products</BreadcrumbLink>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>
                </div>
                <div className='flex items-center gap-4'>
                    <button
                        className="p-2 text-stone-500 hover:text-stone-700 transition-colors relative cursor-pointer">
                        <ShoppingBag
                            onClick={() => navigate("/cart")}
                            className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-amber-600 text-[10px] font-bold text-white flex items-center justify-center scale-90">
                            {cart?.items?.length}

                        </span>
                    </button>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild className=" ">
                            <Button variant="outline">Sort By Price <ChevronDown /> </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                                <DropdownMenuItem onClick={() => (handleOrder("lowToHigh"))}>Low to High</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => (handleOrder("hightoLow"))}> High to Low</DropdownMenuItem>
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">

                {/* 👈 DETACHED FILTER SIDEBAR MODULE */}
                <SideBar
                    // isOpen={isMobileFilterOpen} 
                    // onClose={() => setIsMobileFilterOpen(false)} 

                    products={products}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    search={search}
                    setSearch={setSearch}
                    brand={brand}
                    setBrand={setBrand}
                    category={category}
                    setCategory={setCategory}
                />

                {/* PRODUCT LIST GRID FEED */}
                <div className="Products flex-1 bg-white/40 px-10 py-5">
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : allProducts?.length === 0 ? (
                        <div className="w-full h-64 flex justify-center items-center bg-white/40 rounded-2xl border border-dashed border-amber-300">
                            <p className="text-stone-600 font-medium">No products found...</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            {filteredProducts && filteredProducts.map((product) => (
                                <Card key={uuidv4()} product={product} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Products;

