import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importing Link for internal navigation
import PropTypes from "prop-types"; // PropTypes for type checking props
import Skeleton from "./UI/Skeleton"; // Importing Skeleton component for loading placeholders

// Function to calculate time remaining until the NFT expiry
const getTimeRemaining = (expiryTime) => {
  const now = new Date().getTime(); // Get the current time in milliseconds
  const expiryDate = new Date(expiryTime).getTime(); // Convert the expiry time to milliseconds
  const timeDifference = expiryDate - now; // Calculate the time difference

  // If the time has expired, return "Expired"
  if (timeDifference <= 0) {
    return "Expired";
  }

  // Calculate hours, minutes, and seconds remaining
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Return the formatted time string
  return `${hours}h ${minutes}m ${seconds}s`;
};

// NFTCard component to display individual NFT items
const NFTCard = ({ item }) => {
  // State to hold the time remaining for the NFT expiry
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining(item.expiryDate)
  );
  // State to manage the loading state for the skeleton loader
  const [loading, setLoading] = useState(true);

  // useEffect hook to handle time updates and loading state
  useEffect(() => {
    // Simulate a loading delay by setting a timeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loading state lasts for 2 seconds

    // Update the time remaining every second (1000 ms)
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(item.expiryDate));
    }, 1000);

    // Cleanup on unmount: clear both the timeout and interval
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [item.expiryDate]); // Re-run the effect if the expiryDate changes

  // If the component is still loading, render the skeleton loader
  if (loading) {
    return (
      <div className="nft__item">
        {/* Placeholder skeleton for the NFT image */}
        <Skeleton width="100%" height="300px" />
        <div className="author_list_pp">
          {/* Placeholder skeleton for the author profile picture */}
          <Skeleton width="50px" height="50px" borderRadius="50%" />
        </div>
        <div className="nft__item_info">
          {/* Placeholder skeleton for the NFT title */}
          <Skeleton width="80%" height="20px" />
          {/* Placeholder skeleton for the price or other details */}
          <Skeleton width="60%" height="20px" />
        </div>
      </div>
    );
  }

  // Render the actual NFT card once loading is complete
  return (
    <div className="nft__item">
      {/* Author profile picture and link */}
      <div className="author_list_pp">
        <Link to={`/author/${item.authorId}`}>
          <img
            className="lazy"
            src={item.authorImage || "/path/to/default/image.jpg"} // Fallback image if no author image is provided
            alt={item.authorName} // Alt text for accessibility
          />
          {/* Verified check icon */}
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {/* Countdown timer for NFT expiry */}
      <div className="de_countdown">{timeRemaining}</div>

      {/* NFT image and link to details page */}
      <div className="nft__item_wrap">
        <Link to={`/item-details/${item.nftId}`}>
          <img
            src={item.nftImage || "/path/to/default/image.jpg"} // Fallback image if no NFT image is provided
            className="lazy nft__item_preview" // Image lazy-loading class
            alt={item.title} // Alt text for the NFT image
          />
        </Link>
      </div>

      {/* NFT information: title, price, and like button */}
      <div className="nft__item_info">
        {/* Title with link to the item details page */}
        <Link to={`/item-details/${item.nftId}`}>
          <h4>{item.title}</h4>
        </Link>
        {/* NFT price in ETH */}
        <div className="nft__item_price">{item.price} ETH</div>

        {/* Like button and display of the like count */}
        <div className="nft__item_like">
          <i className="fa fa-heart"></i> {/* Like heart icon */}
          <span>{item.likes || 0}</span> {/* Fallback to 0 if no like count is provided */}
        </div>
      </div>
    </div>
  );
};

// Prop types validation for the NFTCard component
NFTCard.propTypes = {
  item: PropTypes.shape({
    authorId: PropTypes.string.isRequired, // Author ID is required
    authorImage: PropTypes.string, // Author image is optional
    authorName: PropTypes.string.isRequired, // Author name is required
    nftId: PropTypes.string.isRequired, // NFT ID is required
    nftImage: PropTypes.string, // NFT image is optional
    title: PropTypes.string.isRequired, // NFT title is required
    price: PropTypes.number.isRequired, // NFT price is required
    likes: PropTypes.number, // Likes are optional
    expiryDate: PropTypes.string.isRequired, // Expiry date is required
  }).isRequired,
};

export default NFTCard; 