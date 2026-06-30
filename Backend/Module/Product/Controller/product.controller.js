import cloudinary from "../../../Common/Utils/cloudnary.js";
import getDataUri from "../../../Common/Utils/dataUri.js";
import {Product} from '../Model/product.Model.js'

export const addProduct = async (req, res) => {

    try {
        const { productName, productDesc, productPrice, category, brand } = req.body;
        const userId = req.user.id;

        if (!productName || !productDesc || !productPrice || !category || !brand) {
            return res.status(400).json({
                success: false,
                message: "All feilds are required"
            });
        }

        // Handle multiple images upload 
        let productImg = [];
        // console.log(req.files);
        
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const fileUri = getDataUri(file);
                const result = await cloudinary.uploader.upload(fileUri.content, {
                    folder: "Amber_Products"
                })
                productImg.push({
                    url: result.secure_url,
                    public_id: result.public_id
                })
            }

        }

        const newProduct = await Product.create({
            userId,
            productName,
            productDesc,
            productPrice,
            category,
            brand,
            productImg // ({url,public_id})

        })

        return res.status(200).json({
            success: true,
            message: "Product Added Succesfully",
            product: newProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

export const getAllProducts = async (req, res) => {

    try {
        const allProducts = await Product.find()
        if(!allProducts){
            return res.status(404).json({
                success: false,
                message: "No Product Available"
            });

           
        }
         return res.status(200).json({
                success: true,
                message: "Product fetched Successfully",
                products:allProducts
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

};



export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const {
            productName,
            productDesc,
            productPrice,
            category,
            brand,
            existingImages, // JSON string containing public_ids to keep
        } = req.body;

        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        let updatedImages = [];

        // ------------------------------------------------
        // Keep existing images & delete removed ones
        // ------------------------------------------------
        if (existingImages) {

            // Convert JSON string to array
            // Example:
            // ["Amber_Products/abc123","Amber_Products/xyz456"]
            const keepIds = JSON.parse(existingImages);

            // Images to keep
            updatedImages = product.productImg.filter((img) =>
                keepIds.includes(img.public_id)
            );

            // Images user removed
            const removedImages = product.productImg.filter(
                (img) => !keepIds.includes(img.public_id)
            );

            // Delete removed images from Cloudinary
            for (const img of removedImages) {
                await cloudinary.uploader.destroy(img.public_id);
            }

        } else {

            // If frontend didn't send existingImages,
            // keep all current images.
            updatedImages = [...product.productImg];
        }

        // ------------------------------------------------
        // Upload newly selected images
        // ------------------------------------------------
        if (req.files && req.files.length > 0) {

            for (const file of req.files) {

                const fileUri = getDataUri(file);

                const result = await cloudinary.uploader.upload(
                    fileUri.content,
                    {
                        folder: "Amber_Products",
                    }
                );

                updatedImages.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        }

        // ------------------------------------------------
        // Update product fields
        // ------------------------------------------------
        product.productName = productName || product.productName;
        product.productDesc = productDesc || product.productDesc;
        product.productPrice = productPrice || product.productPrice;
        product.category = category || product.category;
        product.brand = brand || product.brand;

        // Save updated images
        product.productImg = updatedImages;

        // Save product
        const updatedProduct = await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const deleteProduct = async (req, res) => {

    try {
        const productId = req.params.id;
        if(!productId){
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }
        const product = await Product.findById(productId)

        if(product.productImg && product.productImg.length > 0){
            for (const img of product.productImg) {

                const result = await cloudinary.uploader.destroy(img.public_id)
                
            }
        }
        await Product.findByIdAndDelete(productId)

        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

};