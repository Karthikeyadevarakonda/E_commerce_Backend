// import prisma from "../lib/prisma.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const placeOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    if (!items || items.length <= 0) {
      return res.status(400).json({ message: "cart is Empty" });
    }

    let total = 0;

    const productData = await Promise.all(
      items.map(async ({ productId, quantity }) => {
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });
        if (!product) throw new Error("Product not found");

        const Finalprice =
          Number(product.actualPrice) *
          (1 - (Number(product.discount) || 0) / 100);

        total += Finalprice * quantity;

        return { productId, quantity, price: Finalprice };
      })
    );

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        products: { create: productData },
      },
      include: { products: { include: { product: true } } },
    });
    res.status(201).json({ message: "Order Placed Successfully", data: order });
  } catch (error) {
    console.error("Error in placing order : ", error);
    res.status(500).json({ message: "failed to place order" });
  }
};

//delete an order by id

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    // first orderItems lo link ayi unavi delete chesi chesthe issue radhu next project lo cascade use chey
    await prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    await prisma.order.delete({
      where: { id },
    });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error in deleting order:", error);
    res.status(500).json({ message: "Failed to delete the order" });
  }
};

//get all orders of specific users

export const getAllOrdersOfCurrentUser = async (req, res) => {
  const userId = req.user.id; // from isAuthenticated middleware
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allOrders = await prisma.order.findMany({
      where: { userId },
      include: { products: { include: { product: true } } },
    });

    res.status(200).json({ message: "All orders", data: allOrders });
  } catch (error) {
    console.error("Error in getAllOrdersOfCurrentUser:", error);
    res.status(500).json({ message: "Failed to get user orders" });
  }
};

//get an orderById

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { products: { include: { product: true } } },
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "OrderById", data: order });
  } catch (error) {
    console.error("Error in gettingOrderById : ", error);
    res.status(500).json({ message: "failed to getOrderById" });
  }
};

//get all orders for the admin bro

export const AllOrders = async (req, res) => {
  try {
    const allOrders = await prisma.order.findMany({
      include: { products: { include: { product: true } } },
    });

    res.status(200).json({ message: "All Orders", data: allOrders });
  } catch (error) {
    console.error("Error in fetching orders  : ", error);
    res.status(500).json({ message: "failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });
    res
      .status(200)
      .json({ message: "Order updated Successfully", data: updatedOrder });
  } catch (error) {
    console.error("Error in updating order status  : ", error);
    res.status(500).json({ message: "failed to update order Status" });
  }
};
