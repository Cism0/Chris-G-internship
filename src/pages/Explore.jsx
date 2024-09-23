import React, { useState, useEffect } from "react";
import SubHeader from "../images/subheader.jpg";
import NFTCard from "../components/NFTCard"; 
import Skeleton from "../components/UI/Skeleton";

const Explore = () => {
  const [items, setItems] = useState([]); // All preloaded NFTs
  const [visibleItems, setVisibleItems] = useState(8); // Number of NFTs initially visible
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state
  const [filter, setFilter] = useState(''); // Filter state for API

  // Base URL for the API
  const apiUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  // Fetch NFTs based on filter value
  useEffect(() => {
    const fetchExploreItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}${filter ? `?filter=${filter}` : ''}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data); // Set all NFTs in state
        setLoading(false);
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]); // Re-fetch data whenever filter changes

  // Handle clicking the "Load More" button to reveal 4 more preloaded NFTs
  const revealMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter based on dropdown selection
    setVisibleItems(8); // Reset visible items when filter changes
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <Skeleton width="100%" height="300px" borderRadius="10px" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center text-danger">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              {/* Dropdown menu for filter selection */}
              <div className="col-2 mb-4">
                <select
                  className="form-select"
                  onChange={handleFilterChange}
                  value={filter}
                >
                  <option value="">Default</option>
                  <option value="price_low_to_high">Price, Low to High</option>
                  <option value="price_high_to_low">Price, High to Low</option>
                  <option value="likes_high_to_low">Most Liked</option>
                </select>
              </div>
            </div>
            <div className="row">
              {items.slice(0, visibleItems).map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                  <NFTCard item={item} /> {/* Reusable NFT card */}
                </div>
              ))}
            </div>
            {/* Load More / Reveal More button */}
            {visibleItems < items.length && (
              <div className="col-12 text-center">
                <button className="btn-main" onClick={revealMoreItems}>
                  Load More
                </button>
              </div>
            )}
            {/* End of collection message */}
            {visibleItems >= items.length && (
              <div className="col-12 text-center">
                <small>End of Collection</small>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
