import React from "react";
import { useRouter } from "next/router";

const Footer: React.FC = () => {
  
  const router = useRouter();
  const navigateToHome = () => {
    router.push("/");
  };

  const navigateToContact = () => {
    router.push("/contact");
  };

  const navigateToAbout = () => {
    router.push("/about");
  };

  const navigateToOrders = () => {
    router.push("/orders");
  };
  return (
    <div id="footer">
      {/* Footer */}
      <div className="footer-widget">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="text-widget">
                <div className="wid-title">Welcome to</div>
                <img src="images/logo-white.png" alt="ft-logo" />
                <p>
                  this next js isCommerce theme. It has
                  <br />
                  everything you need to start selling today!{" "}
                  <a href="">Get this eCommerce from my Git WaelHamwi</a>
                </p>
                <ul className="ft-soc clearfix">
                  <li>
                    <a href="">
                      <i className="fa fa-facebook-square"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-google-plus-square"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </li>
                </ul>
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="quick-links">
                <div className="wid-title">Quick Links</div>
                <ul>
                  <li>
                     <a onClick={navigateToHome}>Home</a>
                  </li>
                  
                  <li>
                    <a onClick={navigateToContact}>Contact US</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="term">
                <div className="wid-title">&nbsp;</div>
                <p>
                  <a href="#">Terms & Conditions</a>
                  <br />
                  <a href="#">FAQs</a>
                  <br />
                  <a href="#">Privacy Policy</a>
                  <br />
                  <a href="#">Legal Disclaimer</a>
                  <br />
                </p>
              </div>
            </div>
            <div className="col-md-2">
              <div className="quick-links">
                <div className="wid-title">My Account</div>
                <ul>
                  <li>
                    <a href="#">My Account</a>
                  </li>
                  <li>
                    <a href="#">Personal Information</a>
                  </li>
                  <li>
                    <a href="#">Addresses</a>
                  </li>
                  <li>
                    <a onClick={navigateToOrders}>Orders</a>
                  </li>
                
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="subscribe">
                <div className="wid-title">Subscribe for OFFERS & UPDATES</div>
                <p>
                  Enter your email and we'll send you a coupon with 10% off your
                  next order. Add any text here.
                </p>
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                    />
                  </div>
                  <button type="submit" className="btn btn-default">
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-text">
        <div className="container">
          <p>
            Copyright 2024-2025. Designed and Developed by{" Wael Hamwi "}  
            <a href="https://bootstrapmart.com/">BootstrapMart</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
