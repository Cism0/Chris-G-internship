import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import NFTCard from "../NFTCard"; // Import reusable NFTCard component
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the new items from the API
  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setNewItems(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  // OwlCarousel options for responsiveness and navigation
  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    items: 4,
    slideBy: 1,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 4 },
    },
  };

  // Skeleton loader for showing while data is loading
  
const SkeletonLoader = () => (
  <OwlCarousel className="owl-theme" {...carouselOptions}>
    {new Array(4).fill(0).map((_, index) => (
      <div className="item" key={index}>
        <Skeleton className="skeleton-img" height="250px" />
      </div>
    ))}
  </OwlCarousel>
);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <SkeletonLoader /> // Show skeleton loader during data fetch
          ) : error ? (
            <div className="col-12 text-center text-danger">Error: {error}</div>
          ) : (
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {newItems.map((item) => (
                <div className="item" key={item.id}>
                  <NFTCard item={item} /> {/* Reusable NFT card component */}
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
