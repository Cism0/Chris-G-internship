import React, { useEffect } from "react"; // Importing React and useEffect hook
import BrowseByCategory from "../components/home/BrowseByCategory"; // Importing BrowseByCategory component
import HotCollections from "../components/home/HotCollections"; // Importing HotCollections component
import Landing from "../components/home/Landing"; // Importing Landing component
import LandingIntro from "../components/home/LandingIntro"; // Importing LandingIntro component
import NewItems from "../components/home/NewItems"; // Importing NewItems component
import TopSellers from "../components/home/TopSellers"; // Importing TopSellers component
import AOS from 'aos'; // Importing Animate on Scroll library
import 'aos/dist/aos.css'; // Importing AOS styles

const Home = () => {
  // useEffect hook to initialize AOS animations and scroll to the top of the page
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set default duration for all animations to 1000 milliseconds
      once: true, // Ensure animations happen only once when the section scrolls into view
      offset: 200, // Trigger animations 200 pixels before the section enters the viewport
    });
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div id="wrapper"> {/* Wrapper for the entire home component */}
      <div className="no-bottom no-top" id="content"> {/* Main content area */}
        <div id="top"></div> {/* Placeholder for potential top navigation or content */}

        {/* Rendering the landing section */}
        <Landing />
        <LandingIntro />

        {/* HotCollections section with fade-in animation */}
        <div data-aos="fade-in" data-aos-delay="300">
          <HotCollections />
        </div>

        {/* NewItems section with fade-in animation */}
        <div data-aos="fade-in" data-aos-delay="300">
          <NewItems />
        </div>

        {/* TopSellers section with fade-in animation */}
        <div data-aos="fade-in" data-aos-delay="300">
          <TopSellers />
        </div>
        
        {/* BrowseByCategory section without animation */}
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home; 