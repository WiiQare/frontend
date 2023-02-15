import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const defaultSettings = {
  dots: true,
  arrows: false,
  infinite: false,
  autoplay: true,
  speed: 200,
};

function WelcomeSlider({ slides, settings = defaultSettings }) {
  return (
    <div className="info-slider-holder">
      <div className="info-holder">
        {/*  <h6>
              A smart and secure way to <br />
              save and pay for your health
            </h6> */}
        {/* <div className="bold-title">
              it’s not that hard to get
              <br />a website <span>anymore.</span>
            </div> */}
        <div className="mini-testimonials-slider">
          <Slider {...settings}>
            {slides?.map((slide, idx) => (
              <div key={idx.toString()}>
                <div className="details-holder">
                  <img className="photo" src={slide.img} alt="" />
                  <div
                    className="bold-title"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />

                  {/* <h4>{slide.title}</h4> */}
                  <h5>{slide.subtitle}</h5>
                  {slide.button && (
                    <div className="form-button">
                      <button
                        id="submit"
                        type="submit"
                        className="ybtn ybtn-accent-color bg-yellow"
                        onClick={slide.button?.onClick}
                      >
                        {slide.button?.label}
                      </button>
                    </div>
                  )}

                  {/*  <p>
                    Access to healthcare is one of the biggest challenges in
                    Africa.
                  </p> */}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSlider;
