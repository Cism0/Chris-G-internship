import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

// TopSellers component
const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]); // State to store top sellers data
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetching top sellers from the API
  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const data = await response.json(); // Parse the response as JSON
        setTopSellers(data); // Set the top sellers data to state
        setLoading(false); // Stop loading state once data is loaded
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setLoading(false); // In case of error, stop loading
      }
    };

    fetchTopSellers();
  }, []); // Runs once on component mount

  // Timeout to simulate skeleton loading for troubleshooting
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout); // Clean up the timeout
  }, []);

  // Skeleton loader component to display during loading
  const SkeletonLoader = () => (
    <ol className="author_list">
      {new Array(12).fill(0).map((_, index) => (
        <li key={index}>
          <div className="author_list_pp skeleton skeleton-img"></div> {/* Skeleton effect */}
          <div className="author_list_info skeleton skeleton-text"></div> {/* Skeleton effect */}
        </li>
      ))}
    </ol>
  );

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading ? (
              <SkeletonLoader /> // Display skeleton loader while loading
            ) : (
              <ol className="author_list">
                {topSellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      {/* Link to author's details page using authorId */}
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage || AuthorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i> {/* Verified icon */}
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName}
                      </Link>
                      <span>{seller.price} ETH</span> {/* Seller's total earnings */}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
