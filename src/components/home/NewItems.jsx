import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel"; // Importing the Owl Carousel for displaying items
import "owl.carousel/dist/assets/owl.carousel.css"; // Owl Carousel core styles
import "owl.carousel/dist/assets/owl.theme.default.css"; // Owl Carousel theme styles
import NFTCard from "../NFTCard"; // Importing the reusable NFTCard component for displaying individual items
import Skeleton from "../UI/Skeleton"; // Importing the Skeleton component for loading placeholder

const NewItems = () => {
  // State to hold the new items fetched from the API
  const [newItems, setNewItems] = useState([]);
  // State to track the loading state while fetching data
  const [loading, setLoading] = useState(true);
  // State to handle and display any errors that occur during fetching
  const [error, setError] = useState(null);

  // useEffect hook to fetch new items from the API on component mount
  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        // Check if the response was successful
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        // Convert the response to JSON format
        const data = await response.json();
        // Update the newItems state with the fetched data
        setNewItems(data);
        // Set loading to false as data has been fetched
        setLoading(false);
      } catch (error) {
        // If an error occurs, capture the error message
        setError(error.message);
        // Stop the loading state
        setLoading(false);
      }
    };

    // Trigger the fetchNewItems function when the component mounts
    fetchNewItems();
  }, []); // Empty dependency array ensures the fetch happens only once on mount

  // Configuration options for the Owl Carousel
  const carouselOptions = {
    loop: true, // Enable infinite looping of items
    margin: 10, // Space between each item in the carousel
    nav: true, // Enable navigation arrows
    dots: false, // Disable the dots at the bottom of the carousel
    items: 4, // Number of items displayed at once
    slideBy: 1, // Number of items to slide by in each transition
    responsive: {
      0: { items: 1 }, // On small screens, show 1 item
      768: { items: 2 }, // On medium screens, show 2 items
      1024: { items: 4 }, // On large screens, show 4 items
    },
  };

  // Component to render the skeleton loader while data is loading
  const SkeletonLoader = () => (
    <OwlCarousel className="owl-theme" {...carouselOptions}>
      {new Array(4).fill(0).map((_, index) => (
        <div className="item" key={index}>
          {/* Skeleton placeholder for the image */}
          <Skeleton className="skeleton-img" height="250px" />
        </div>
      ))}
    </OwlCarousel>
  );

  return (
    <section id="section-items" className="no-bottom"> {/* Section for the New Items display */}
      <div className="container"> {/* Container for centering and layout control */}
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2> {/* Section title */}
              <div className="small-border bg-color-2"></div> {/* Decorative small border */}
            </div>
          </div>

          {loading ? (
            // If loading, display the skeleton loader
            <SkeletonLoader />
          ) : error ? (
            // If there's an error, display the error message
            <div className="col-12 text-center text-danger">Error: {error}</div>
          ) : (
            // If data is fetched successfully, display the new items in the carousel
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {newItems.map((item) => (
                <div className="item" key={item.id}>
                  {/* Render the NFTCard component for each item */}
                  <NFTCard item={item} />
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems; 