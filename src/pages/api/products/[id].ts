import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; 

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id), 
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
