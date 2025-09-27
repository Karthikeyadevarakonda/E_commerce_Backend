import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Error in getting products:", error);
    res.status(500).json({ message: "Error in getting products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    console.error("Error in getting product:", error);
    res.status(500).json({ message: "Error in getting product" });
  }
};

const addProduct = async (req, res) => {
  const {
    productName,
    productType,
    image,
    gender,
    rating,
    viewCount,
    actualPrice,
    discount,
    sizes,
    labels,
    brand,
    colour,
  } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        productName,
        productType,
        image,
        gender,
        rating,
        viewCount,
        actualPrice,
        discount,
        sizes,
        labels,
        brand,
        colour,
      },
    });

    res
      .status(201)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    console.error("Error in adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// Update product by ID
const updateProductById = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productType,
    image,
    gender,
    rating,
    viewCount,
    actualPrice,
    discount,
    sizes,
    labels,
    brand, // added
    colour, // added
  } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        productName,
        productType,
        image,
        gender,
        rating,
        viewCount,
        actualPrice,
        discount,
        sizes,
        labels,
        brand,
        colour,
      },
    });

    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error in updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById,
};
