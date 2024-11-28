import React, { useState } from "react";
import { Product } from "@/types/productTypes";
import GridList from "./GridList";
import Image from "next/image";
import { useCartHelper } from "@/utils/useCartHelper";
import LoadingButton from "@/ui/LoadingButton";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  console.log(products);
  const {
    handleAddToCartWithLoader,
    loadingProductId,
    isButtonProductsDisabled,
    getCurrentQuantity,
  } = useCartHelper();

 
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  
  const handleZoom = (productId: string) => {
    if (zoomedImage === productId) {
      setZoomedImage(null); 
    } else {
      setZoomedImage(productId); 
    }
  };


  const closeZoomModal = () => setZoomedImage(null);

  const renderProduct = (product: Product) => {
    const currentQuantity = getCurrentQuantity(product.id);
    const remainingStock = Math.max(product.stock - currentQuantity, 0);

    return (
      <div
        className={`product-fade ${zoomedImage ? "hidden" : ""}`}
        key={product.id}
      >
        <div className="product-fade-wrap">
          <div id={`product-image${product.id}`}>
            {product.image ? (
              <div
                className={`item ${zoomedImage === product.id ? "zoomed" : ""}`}
                onClick={() => handleZoom(product.id)} 
              >
                <Image
                  src={product.image}
                  alt={`product-${product.name}`}
                  width={500}
                  height={500}
                />
              </div>
            ) : (
              <div>No image available</div>
            )}
          </div>


          {zoomedImage !== product.id && (
            <div className="product-fade-ct">
              <div className="product-fade-control">
                <div className="to-left">
                  <a href="#" onClick={() => handleZoom(product.id)}>
                    <i className="fa fa-search-plus"></i>
                  </a>
                </div>
                <div className="to-right">
                  <div
                    className="owl-carousel owl-theme"
                    id={`product-control${product.id}`}
                  >
                    {["1", "2", "3", "4"].map((bullet, bulletIndex) => (
                      <div className="item" key={bulletIndex}>
                        <div className="bullets"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="product-quantity mb-16">
                  <div className="d-flex">
                    <span
                      className={`badge ${
                        product.stock > 0 ? "bg-success" : "bg-danger"
                      } text-white`}
                    >
                      Stock:{" "}
                      {product.stock > 0 ? product.stock : "Out of stock"}
                    </span>
                    {product.stock > 0 && remainingStock > 0 && (
                      <span className="badge bg-info text-white">
                        Remaining: {remainingStock}
                      </span>
                    )}
                    {product.stock < 1 && (
                      <span className="stock-limit text-danger">
                        Out of stock!
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <LoadingButton
                    isLoading={loadingProductId === product.id}
                    onClick={() => handleAddToCartWithLoader(product.id)}
                    disabled={isButtonProductsDisabled(product.id)}
                  >
                    <span className="bag"></span>
                    {isButtonProductsDisabled(product.id)
                      ? "Not enough stock!"
                      : "Add To Cart"}
                  </LoadingButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div id="content">
      <div className="container">
        <h2>Latest Products</h2>
        <div id="myTabContent" className="tab-content">
          <div
            role="tabpanel"
            className="tab-pane fade in active"
            id="1"
            aria-labelledby="cat-1"
          >
            <GridList items={products} renderItem={renderProduct} />
          </div>
        </div>
      </div>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div className="zoom-modal" onClick={closeZoomModal}>
          <div
            className="zoom-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="remove-item"
              onClick={closeZoomModal}
              style={{
                position: "absolute",
                top: "-30px",
                right: "5px",
                fontSize: "30px",
                color: "#fff",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              &times;
            </span>

            <Image
              src={
                products.find((product) => product.id === zoomedImage)?.image ||
                ""
              }
              alt="Zoomed Product"
              width={400}
              height={400}
            />
            {/* Button to close the zoom and show the product list again */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
