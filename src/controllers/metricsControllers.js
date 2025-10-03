import prisma from "../lib/prisma.js";

export const getMetrics = async (_, res) => {
  try {
    const totalOrders = await prisma.order.count();

    const totalProducts = await prisma.product.count();

    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true },
    });

    const ordersByStatus = await prisma.order.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const topSellingRaw = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    });

    const topSellingIds = topSellingRaw.map((product) => product.productId);

    const products = await prisma.product.findMany({
      where: { id: { in: topSellingIds } },
      select: {
        id: true,
        productName: true,
        productType: true,
        image: true,
      },
    });

    const topProducts = topSellingRaw.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        productName: product?.productName || "Unknown",
        productType: product?.productType,
        image: product?.image,
        quantitySold: item._sum.quantity,
      };
    });

    res.status(200).json({
      totalOrders,
      totalProducts,
      totalRevenue: totalRevenue._sum.total || 0,
      ordersByStatus: ordersByStatus.map((obj) => ({
        status: obj.status,
        count: obj._count.status,
      })),
      topProducts: topProducts,
    });
  } catch (error) {
    console.error("Error in fetching metrics : ", error);
    res.status(500).json({ message: "Failed to Fetch the Metrics" });
  }
};
