import BreadCrum from '@/app Components/overView/BreadCrum';
import IImgGallary from '@/app Components/overView/IImgGallary';
import ProductDesc from '@/app Components/overView/ProductDesc';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const ProductOverview = () => {
    const { allProducts } = useSelector(state => state.product);
    const { cart } = useSelector(store => store.product)

    const { id } = useParams();

    const p = allProducts?.find((item) => item._id === id);

    if (!p) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="animate-pulse text-stone-500 font-medium">Loading Product...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50/50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Clean Breadcrumb padding layout spacing */}
                <div className="px-1">
                    <BreadCrum cart={cart} />
                </div>

                {/* Core Split Screen Structural View Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-4 md:p-8 rounded-3xl border border-stone-100 shadow-sm">

                    {/* Gallery takes 5 structural columns out of 12 */}
                    <div className="lg:col-span-5">
                        <IImgGallary images={p.productImg} />
                    </div>

                    {/* Content text descriptions fill remaining 7 columns */}
                    <div className="lg:col-span-7">
                        <ProductDesc product={p} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductOverview;