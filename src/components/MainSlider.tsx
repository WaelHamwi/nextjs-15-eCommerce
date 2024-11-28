import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const MainSlider: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false); 

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div id="main-slider">
      {isClient && (
        <div id="home-slider" className="owl-carousel owl-theme">
          <div className="item">
            <Image 
              src="/images/slider-1.jpg" 
              alt="slide-1" 
              width={1200} 
              height={500} 
              className="img-responsive"
            />
            <div className="slider-desc">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="slide-offers-left">
                      <div className="slide-offers-title">
                        <span>Men’s</span>
                        <br />
                        FASHION
                      </div>
                      <p>New & Fresh collection<br />arrival in believe store</p>
                      <a href="" className="btn btn-blue">Shop now</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="slide-offers-right">
                      <div className="slide-offers-title">
                        <span>Women’s</span>
                        <br />
                        FASHION
                      </div>
                      <p>New & Fresh collection<br />arrival in believe store</p>
                      <a href="" className="btn btn-magenta">Shop now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <Image 
              src="/images/slider-2.jpg" 
              alt="slide-2" 
              width={1200} 
              height={500} 
              className="img-responsive"
            />
            <div className="slider-desc">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="slide-offers-left">
                      <div className="slide-offers-title">
                        <span>50% Price cut</span>
                        <br />
                        for online order
                      </div>
                      <p>New & Fresh collection<br />arrival in believe store</p>
                      <a href="" className="btn btn-blue">Shop now</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* You can add content here for the second column */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSlider;
