import React, { useEffect } from "react";
import AOS from "aos"; // Importing Animate on Scroll (AOS) for animations
import "aos/dist/aos.css"; // Importing AOS styles

const LandingIntro = () => {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Sets the global duration for animations to 1000ms (1 second)
      easing: "ease-in", // Specifies the default easing for smoother animation transitions
      once: true, // Ensures that animations happen only once per element scroll
      mirror: false, // Prevents animations from triggering when scrolling back past elements
      offset: 150, // Offset of 150px before triggering animations when scrolling
    });
  }, []); // Empty dependency array ensures the initialization runs only once when the component mounts

  return (
    <section id="section-intro" className="no-top no-bottom"> {/* Section for the intro feature boxes */}
      <div className="container"> {/* Container to limit the width of the content */}
        <div className="row"> {/* Row for layout control, each box in its own column */}
          
          {/* Feature Box 1: Set up your wallet */}
          <div className="col-lg-4 col-md-6 mb-sm-30"> {/* Responsive columns for layout */}
            <div className="feature-box f-boxed style-3"> {/* Feature box container */}
              <i
                className="bg-color-2 i-boxed icon_wallet" // Icon for the feature
                data-aos="fade-up" // Applying fade-up animation to the icon
                data-aos-duration="1200" // Setting animation duration to 1200ms
                data-aos-easing="ease-in" // Easing for smooth animation
                data-aos-delay="200" // Delay of 200ms before the animation starts
              ></i>
              <div className="text">
                <h4
                  className="" // Heading for the feature box
                  data-aos="fade-up" // Fade-up animation for the heading
                  data-aos-duration="1200"
                  data-aos-easing="ease-in"
                  data-aos-delay="200" // Delay of 200ms for animation
                >
                  Set up your wallet {/* Feature title */}
                </h4>
                <p
                  data-aos="fade-up" // Applying fade-up animation to the paragraph
                  data-aos-duration="1200"
                  data-aos-easing="ease-in"
                  data-aos-delay="200" // Animation delay of 200ms
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem. {/* Feature description */}
                </p>
              </div>
              <i className="wm icon_wallet"></i> {/* Watermark icon for visual design */}
            </div>
          </div>

          {/* Feature Box 2: Add your NFTs */}
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i
                className="bg-color-2 i-boxed icon_cloud-upload_alt" // Icon for uploading NFTs
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-easing="ease-in"
                data-aos-delay="200"
              ></i>
              <div className="text">
                <h4
                  className="" // Heading for the feature box
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-easing="ease-in"
                  data-aos-delay="200"
                >
                  Add your NFT's {/* Feature title */}
                </h4>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-easing="ease-in"
                  data-aos-delay="200"
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem. {/* Feature description */}
                </p>
              </div>
              <i className="wm icon_cloud-upload_alt"></i> {/* Watermark icon for design */}
            </div>
          </div>

          {/* Feature Box 3: Sell your NFTs */}
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-easing="ease-in"
                data-aos-delay="200"
                className="bg-color-2 i-boxed icon_tags_alt" // Icon representing sales
              ></i>
              <div className="text">
                <h4
                  className="" // Heading for the feature box
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-easing="ease-in"
                  data-aos-delay="200"
                >
                  Sell your NFT's {/* Feature title */}
                </h4>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-easing="ease-in"
                  data-aos-delay="200"
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem. {/* Feature description */}
                </p>
              </div>
              <i className="wm icon_tags_alt"></i> {/* Watermark icon */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingIntro; 