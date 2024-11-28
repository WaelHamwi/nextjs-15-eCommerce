import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchOrders } from "@/store/orders/asyncActions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectOrders } from "@/hooks/useAppSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUser } from "@/store/users/slice";
import { fetchProductImage } from "@/store/products/asyncActions";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import GridList from "@/components/GridList";

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<any>(null);
  const orders = useAppSelector(selectOrders);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState<{ [key: number]: string }>(
    {}
  );
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser())
        .then((action) => {
          setUser(action.payload);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOrders(user.id))
        .then((action) => {
          console.log("Fetched orders payload:", action.payload);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          toast.error("Failed to load orders.");
          setLoading(false);
        });
    } else {
      console.log("No user selected");
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    // Fetch product images for orders that are loaded
    orders.forEach((order) => {
      order.orderDetails.forEach((item) => {
        if (!productImages[item.productId]) {
          fetchProductImageAsync(item.productId);
        }
      });
    });
  }, [orders, productImages]);

  const fetchProductImageAsync = async (productId: number) => {
    if (!imageLoading[productId]) {
      setImageLoading((prev) => ({ ...prev, [productId]: true }));
      try {
        const image = await dispatch(fetchProductImage(productId)).unwrap();
        setProductImages((prevImages) => ({
          ...prevImages,
          [productId]: image,
        }));
      } catch (error) {
        console.error("Error fetching product image:", error);
      } finally {
        setImageLoading((prev) => ({ ...prev, [productId]: false }));
      }
    }
  };

  const renderOrderItem = (order: any) => {
    const orderDetailItems = order.orderDetails || [];
    return (
      <div className="order-item card mb-4 shadow-lg rounded-3 p-4">
        <div className="order-header d-flex justify-content-between align-items-center">
          <h5 className="text-primary">Order ID: {order.id}</h5>
          <span className="text-muted">
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="order-summary mt-3">
          <span className="badge bg-success fs-5">
            Total: €{order.total.toFixed(2)}
          </span>
        </div>
        <div className="order-details mt-3">
          <h6>Order Details:</h6>
          {orderDetailItems.length > 0 ? (
            <ul className="list-group list-group-flush">
              {orderDetailItems.map((item) => (
                <li
                  key={item.productId}
                  className="list-group-item d-flex justify-content-between align-items-center border-0"
                >
                  <div>
                    <strong>Product ID:</strong> {item.productId} <br />
                    <strong>Quantity:</strong> {item.quantity}
                  </div>
                  {imageLoading[item.productId] ? (
                    <div
                      className="spinner-border spinner-border-sm text-primary"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    productImages[item.productId] && (
                      <img
                        src={productImages[item.productId]}
                        alt={`Product ${item.productId}`}
                        className="rounded-circle"
                        width="50"
                        height="50"
                      />
                    )
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No items in this order.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2 className="text-center mb-5 font-weight-bold fs-3 text-gradient text-primary text-shadow-md animate__animated animate__fadeInUp">
          Your Orders
        </h2>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="alert alert-warning text-center py-4 fs-4">
            <strong>No Orders Yet!</strong>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {orders.map((order) => (
              <div key={order.id} className="col">
                {renderOrderItem(order)}
              </div>
            ))}
          </div>
        )}
        <ToastContainer />
      </div>

      <Footer />
    </>
  );
};

export default OrdersPage;
