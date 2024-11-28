// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Truncate the tables to avoid duplicates
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();     

  // 2. Seed products
  const products = [
    {
      name: "iPhone 16",
      description: "Apple iPhone 13 with 128GB storage, 6.1-inch display.",
      price: 799.99,
      image: "/images/iphone16-blue-p1.webp",
      stock: 15,
    },
    {
      name: "Galaxy S25",
      description: "Samsung Galaxy S25 with 256GB storage and 6.2-inch display.",
      price: 699.99,
      image: "/images/galaxy25.webp",
      stock: 12,
    },
    {
      name: "Sony Headphones",
      description: "Noise cancelling over-ear headphones.",
      price: 349.99,
      image: "/images/headphones.webp",
      stock: 20,
    },
    {
      name: "MacBook Pro",
      description: "Apple MacBook Pro with M1 Pro chip, 16-inch display, 512GB SSD.",
      price: 2499.99,
      image: "/images/macbookpro16.jpeg",
      stock: 5,
    },
    {
      name: "Nike Shoes",
      description: "Comfortable running shoes from Nike.",
      price: 150.0,
      image: "/images/nike.webp",
      stock: 10,
    },
    {
      name: "OLED TV",
      description: "55-inch OLED TV with stunning picture quality.",
      price: 1499.99,
      image: "/images/lg-oled-tv.webp",
      stock: 4,
    },
    {
      name: "PlayStation 5",
      description: "PlayStation 5 console with fast load times and better graphics.",
      price: 499.99,
      image: "/images/ps5.webp",
      stock: 0,
    },
    {
      name: "Fitbit Charge 5",
      description: "Fitness tracker with health metrics and GPS.",
      price: 179.99,
      image: "/images/fitbit-charge5.jpg",
      stock: 15,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  // 3. Seed users
  const hashedPassword = await bcrypt.hash("yourPassword", 10);

  await prisma.user.create({
    data: {
      email: "user@example.com",
      password: hashedPassword,
      name: "John Doe",
    },
  });

  console.log("Data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
