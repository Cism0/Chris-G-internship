import React, { useState, useEffect } from "react";
import SubHeader from "../images/subheader.jpg"; // Importing the subheader image
import NFTCard from "../components/NFTCard"; // Importing the NFTCard component for displaying NFT items
import Skeleton from "../components/UI/Skeleton"; // Importing the Skeleton component for loading state
import AOS from "aos"; // Importing Animate on Scroll library
import "aos/dist/aos.css"; // Importing AOS styles

const Explore = () => {
  // State variables to manage items, visibility, loading status, error messages, and filter
  const [items, setItems] = useState([]); // Stores fetched NFT items
  const [visibleItems, setVisibleItems] = useState(8); // Number of items currently visible
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(null); // Error message state
  const [filter, setFilter] = useState(""); // Filter state for sorting items

  // API URL for fetching items
  const apiUrl =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  // useEffect hook to fetch data when the component mounts or when the filter changes
  useEffect(() => {
    AOS.init(); // Initialize AOS animations
    const fetchExploreItems = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        // Fetch data from API with optional filter query
        const response = await fetch(
          `${apiUrl}${filter ? `?filter=${filter}` : ""}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`); // Throw an error if response is not OK
        }
        const data = await response.json(); // Parse JSON response
        setItems(data); // Update state with fetched items
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Set error message in case of a fetch failure
        setLoading(false); // Ensure loading is false even in error
      }
    };

    fetchExploreItems(); // Call the fetch function
  }, [filter]); // Dependency array includes filter; refetch when it changes

  // Function to reveal more items when "Load More" is clicked
  const revealMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4); // Increase visible items by 4
  };

  // Function to handle filter changes and reset visible items count
  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter based on user selection
    setVisibleItems(8); // Reset visible items to 8 when filter changes
  };

  // Show skeleton loader while data is being fetched
  if (loading) {
    return (
      <div className="container">
        <div className="row">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <Skeleton width="100%" height="300px" borderRadius="10px" /> {/* Loading skeletons for 8 items */}
              </div>
            ))}
        </div>
      </div>
    );
  }

  // Show error message if there was an error during data fetching
  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center text-danger">Error: {error}</div>
        </div>
      </div>
    );
  }

  // Main return statement rendering the component's layout
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }} // Background image for the subheader
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1> {/* Title for the explore section */}
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="section"
          data-aos="fade-in" // AOS attribute for fade-in animation
          data-aos-duration="1000" 
          data-aos-delay="300"
        >
          <div className="container">
            <div className="row">
              <div className="col-2 mb-4">
                {/* Filter dropdown for sorting items */}
                <select
                  className="form-select"
                  onChange={handleFilterChange} // Update filter on change
                  value={filter} // Set current filter as the selected value
                >
                  <option value="">Default</option>
                  <option value="price_low_to_high">Price, Low to High</option>
                  <option value="price_high_to_low">Price, High to Low</option>
                  <option value="likes_high_to_low">Most Liked</option>
                </select>
              </div>
            </div>

            <div className="row">
              {/* Map over the items to display NFTCard components */}
              {items.slice(0, visibleItems).map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id} // Unique key for each item
                >
                  <NFTCard item={item} /> {/* NFTCard component for each item */}
                </div>
              ))}
            </div>

            {/* Conditional rendering for "Load More" button */}
            {visibleItems < items.length && (
              <div className="col-12 text-center">
                <button className="btn-main" onClick={revealMoreItems}>
                  Load More {/* Button to load more items */}
                </button>
              </div>
            )}

            {/* Display message when all items are loaded */}
            {visibleItems >= items.length && (
              <div className="col-12 text-center">
                <small>End of Collection</small> {/* Message for end of collection */}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore; 