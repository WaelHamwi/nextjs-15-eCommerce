import prisma from "lib/prisma";

export default async function orderHandler(req, res) {
  console.log('Received request body:', req.body); 
  console.log("OrderHandler");
  if (req.method === "GET") {
    await getOrdersHandler(req, res);
  } else if (req.method === "POST") {
    await createOrderHandler(req, res);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

async function createOrderHandler(req, res) {
  console.log('Received request body:', req.body);

  const { order, orderDetails } = req.body;

  if (!order || !orderDetails) {
    return res.status(400).json({ error: "Order and order details are required" });
  }

  if (!Array.isArray(orderDetails)) {
    return res.status(400).json({ error: "Order details should be an array" });
  }


  const transaction = await prisma.$transaction([ 
    prisma.order.create({
      data: {
        userId: order.userId,
        total: order.total,
        createdAt: order.createdAt,
      },
    }),
  ]);

  try {
    const createdOrder = transaction[0]; 

    const updatedOrderDetails = orderDetails.map((detail) => ({
      productId: detail.productId,
      quantity: detail.quantity,
      orderId: createdOrder.id, 
    }));

      await prisma.orderDetails.createMany({
        data: updatedOrderDetails,
      });
      
  
    
    res.status(201).json({
      order: createdOrder,
      orderDetails: updatedOrderDetails,
    });
  } catch (error) {
    console.error("Error creating order backend:", error);
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
}




async function getOrdersHandler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: {
        orderDetails: true,
      },
    });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}
