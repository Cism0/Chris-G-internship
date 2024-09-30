import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

/**
 * HotCollections component fetches and displays a carousel of trending NFT collections.
 * It shows a loading skeleton while the data is being fetched from the API.
 */
const HotCollections = () => {
  // State for storing the fetched NFT collections data
  const [collections, setCollections] = useState([]);
  // State for tracking loading status
  const [loading, setLoading] = useState(true);

  // Fetching data from the API when the component mounts
  useEffect(() => {
    const fetchCollections = () => {
      // Simulate delay to test the loading state (2 seconds)
      setTimeout(async () => {
        try {
          // Fetch data from the hot collections API
          const response = await fetch(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
          );
          const data = await response.json();
          setCollections(data);
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error("Error fetching collections:", error);
          setLoading(false); // Ensure loading state is reset on error
        }
      }, 0); // Delay for loading effect
    };

    fetchCollections();
  }, []);

  // OwlCarousel configuration options for responsiveness and behavior
  const options = {
    loop: true, // Enables infinite loop for carousel items
    margin: 10, // Space between items
    nav: true, // Show navigation arrows
    dots: false, // Disable pagination dots
    items: 4, // Show 4 items per view by default
    slideBy: 1, // Move 1 item at a time when sliding
    autoplay: false, // Disable autoplay
    responsive: {
      0: { items: 1 }, // Show 1 item on small screens
      768: { items: 2 }, // Show 2 items on medium screens (tablets)
      1024: { items: 4 }, // Show 4 items on large screens (desktops)
    },
  };

  // Loading skeleton structure to show placeholders while data is being fetched
  const SkeletonLoader = () => (
    <OwlCarousel className="owl-theme" {...options}>
      {/* Array of 4 skeleton placeholders for carousel */}
      {new Array(4).fill(0).map((_, index) => (
        <div className="item" key={index}>
          <div className="nft_coll">
            {/* Skeleton for the NFT image */}
            <Skeleton width="100%" height="200px" borderRadius="10px" />
            <div className="nft_coll_pp">
              {/* Skeleton for the author's profile picture */}
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>
            <div className="nft_coll_info">
              {/* Skeleton for the collection title */}
              <Skeleton width="80%" height="20px" />
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Section title */}
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* Render loading skeleton if data is still loading */}
          {loading ? (
            <SkeletonLoader />
          ) : (
            // Render the carousel of NFT collections once data is loaded
            <OwlCarousel className="owl-theme" {...options}>
              {collections.map((collection, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    {/* NFT image with link to its details page */}
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    {/* Author profile image with link to their page */}
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage || AuthorImage}
                          alt={collection.authorName}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    {/* Collection title and ERC code */}
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
