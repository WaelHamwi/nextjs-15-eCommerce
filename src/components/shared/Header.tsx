import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "@/store/carts/slice";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import styles from "@/styles/Header.module.css";

const Header: React.FC = () => {
  const totalQuantity = useSelector((state: RootState) =>
    selectTotalQuantity(state)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (totalQuantity > 0) {
      setIsAnimating(true);
      const timeout = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [totalQuantity]);

  const navigateToCart = () => {
    router.push("/cart");
  };

  const handleBackToHome = () => {
    router.push("/");
  };
  const handleGoToOrders =()=>{
    router.push("/orders");
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div id="header">
      {/* Header section */}
      <div className="top">
        {/* Top section */}
        <div className="container">
          <ul className="top-support">
            <li>
              <i className="fa fa-phone-square"></i>
              <span>(+963) 968643988</span>
            </li>
            <li>
              <a href="mailto:waellhamwii@gmail.com">
                <i className="fa fa-envelope-square"></i>
                <span>waellhamwii@gmail.com</span>
              </a>
            </li>
          </ul>
          <div className="top-offers">
            <div
              className="alert alert-warning alert-dismissible fade in offers"
              role="alert"
            >
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="fa fa-times-circle"></i>
                </span>
              </button>
              Amazing development experience{" "}
              <a href="">with nextJs and redux-toolkit</a>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar section */}
      <div id="believe-nav">
        <div className="container">
          <div className="min-marg">
            <nav className="navbar navbar-default">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="index.html">
                  <Image
                    src="/images/logo.webp"
                    alt="Logo"
                    width={170}
                    height={120}
                  />
                </a>
              </div>

              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav">
                  <li >
                    <a
                      onClick={() => handleBackToHome()}
                      style={{ cursor: "pointer" }}
                    >
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => handleGoToOrders()}
                      style={{ cursor: "pointer" }}
                    >orders</a>
                  </li>
                  <li>
                    <a href="#">contact</a>
                  </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="#" onClick={navigateToCart}>
                      <Image
                        src="/images/bag.png"
                        alt="Bag"
                        width={24}
                        height={24}
                      />
                      <span
                        className={`${styles.cartQuantity} ${
                          isAnimating ? styles.animate : ""
                        }`}
                      >
                        {totalQuantity}
                      </span>
                    </a>
                  </li>

                  {/* Dropdown for Sign In / Log Out */}
                  <li className="dropdown" onClick={toggleDropdown}>
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen ? "true" : "false"}
                    >
                      {session ? `Hello, ${session.user?.name}` : "Sign In"}
                      <span className="caret"></span>
                    </a>
                    <ul
                      className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                    >
                      {session ? (
                        <>
                          <li>
                            <a href="#" onClick={handleSignOut}>
                              Log Out
                            </a>
                          </li>
                        </>
                      ) : (
                        <li>
                          <a href="/auth/signin">Sign In</a>
                        </li>
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="srch-form">
            <form className="side-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control search-wid"
                  placeholder="Search Here"
                  aria-describedby="basic-addon2"
                />
                <a
                  href="#"
                  className="input-group-addon btn-side-serach"
                  id="basic-addon2"
                >
                  <i className="fa fa-search"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
