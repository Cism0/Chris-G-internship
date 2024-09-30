import React, { useEffect } from "react";
import NFT from "../../images/nft.png"; // Importing NFT image
import backgroundImage from "../../images/bg-shape-1.jpg"; // Importing background image
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation
import AOS from "aos"; // Importing Animate on Scroll (AOS) library for animations
import "aos/dist/aos.css"; // Importing AOS styles

const Landing = () => {
  // Initialize AOS on component mount with specific configurations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Sets the global duration for animations to 1000ms (1 second)
      easing: "ease-in", // Specifies the easing for animations, defaulting to 'ease-in'
      once: false, // Animations will not trigger only once; they can trigger multiple times
      mirror: true, // Elements will animate out when scrolling past them
      offset: 200, // Specifies the offset from the top for animation triggers
    });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <section
      id="section-hero" // Section identifier
      aria-label="section" // ARIA attribute for accessibility
      className="no-top no-bottom vh-100" // Full height (vh-100), no top or bottom margin/padding
      data-bgimage="url(images/bg-shape-1.jpg) bottom" // Background image data attribute
      style={{ background: `url(${backgroundImage}) bottom / cover` }} // Inline style for background image
    >
      <div className="v-center">
        {" "}
        {/* Centering content vertically */}
        <div className="container">
          <div className="row align-items-center">
            {" "}
            {/* Align items in the center */}
            <div
              className="col-md-6" // Left column for the heading and content
              data-aos="fade-up" // AOS attribute to apply a fade-up animation
              data-aos-duration="1000" // Animation duration set to 1000ms
              data-aos-easing="ease-in" // Easing for a smoother effect
            >
              <div className="spacer-single"></div>{" "}
              {/* Spacer for layout control */}
              <h6
                data-aos="fade-up" // Applying fade-up animation to the subtitle
                data-aos-duration="1000"
                data-aos-easing="ease-in"
                data-aos-delay="250" // Animation delay of 250ms
              >
                <span className="text-uppercase id-color-2">
                  Ultraverse Market {/* Subtitle text */}
                </span>
              </h6>
              <div className="spacer-10"></div> {/* Small spacer */}
              <h1
                data-aos="fade-up" // Applying fade-up animation to the main heading
                data-aos-duration="1000"
                data-aos-easing="ease-in"
                data-aos-delay="500" // Animation delay of 500ms
              >
                Create, sell or collect digital items. {/* Main heading */}
              </h1>
              <p
                className="lead" // Applying a lead class for larger text size
                data-aos="fade-up" // Applying fade-up animation to the paragraph
                data-aos-duration="1000"
                data-aos-easing="ease-in"
                data-aos-delay="750" // Animation delay of 750ms
              >
                Unit of data stored on a digital ledger, called a blockchain,
                that certifies a digital asset to be unique and therefore not
                interchangeable {/* Paragraph explaining the concept */}
              </p>
              <div className="spacer-10"></div> {/* Small spacer */}
              <Link
                className="btn-main lead" // Button with main styling and lead class for size
                to="/explore" // Navigation to the Explore page
                data-aos="fade-up" // Fade-up animation for the button
                data-aos-duration="1000"
                data-aos-delay="1250" // Animation delay of 1250ms
              >
                Explore {/* Button text */}
              </Link>
              <div className="mb-sm-30"></div> {/* Margin-bottom for spacing */}
            </div>
            <div
              className="col-md-6 xs-hide" // Right column for the image, hidden on small screens
              data-aos="fade-in" // Fade-in animation for the image
              data-aos-offset="200" // Offset for animation trigger
              data-aos-delay="2000" // Animation delay of 2000ms
              data-aos-duration="1000" // Animation duration set to 1000ms
              data-aos-easing="ease-in-out" // Applying ease-in-out easing for a smoother effect
              data-aos-mirror="true" // Mirror the animation while scrolling
              data-aos-once="false" // Animation will trigger multiple times
              data-aos-anchor-placement="top-center" // Anchor point for animation is the top center
            >
              <img
                src={NFT}
                className="lazy img-fluid"
                alt="NFT Illustration"
              />{" "}
              {/* NFT image */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing; 