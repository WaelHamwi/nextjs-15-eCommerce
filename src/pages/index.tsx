import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import MainSlider from "@/components/MainSlider";
import ProductsPage from "./products";

const HomePage: React.FC = () => {
  return (
    <div id="wrapper" className="homepage-1">
      <Header />
      <main>
        <div className="d-flex justify-content-center align-items-center text-center">
          <h1 className="display-4 font-weight-bold text-primary">
            Welcome to My Full-Stack Next.js 15
          </h1>
        </div>
      </main>
      <ProductsPage />
      <MainSlider />

      <Footer />
    </div>
  );
};

export default HomePage;
