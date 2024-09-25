import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Skeleton from "./UI/Skeleton";

const getTimeRemaining = (expiryTime) => {
  const now = new Date().getTime();
  const expiryDate = new Date(expiryTime).getTime();
  const timeDifference = expiryDate - now;

  if (timeDifference <= 0) {
    return "Expired";
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

const NFTCard = ({ item }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining(item.expiryDate)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(item.expiryDate));
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [item.expiryDate]);

  if (loading) {
    return (
      <div className="nft__item">
        <Skeleton width="100%" height="300px" />
        <div className="author_list_pp">
          <Skeleton width="50px" height="50px" borderRadius="50%" />{" "}
        </div>
        <div className="nft__item_info">
          <Skeleton width="80%" height="20px" />
          <Skeleton width="60%" height="20px" />
        </div>
      </div>
    );
  }

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link to={`/author/${item.authorId}`}>
          <img
            className="lazy"
            src={item.authorImage || "/path/to/default/image.jpg"}
            alt={item.authorName}
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="de_countdown">{timeRemaining}</div>
      <div className="nft__item_wrap">
        <Link to={`/item-details/${item.nftId}`}>
          <img
            src={item.nftImage || "/path/to/default/image.jpg"}
            className="lazy nft__item_preview"
            alt={item.title}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes || 0}</span>
        </div>
      </div>
    </div>
  );
};

NFTCard.propTypes = {
  item: PropTypes.shape({
    authorId: PropTypes.string.isRequired,
    authorImage: PropTypes.string,
    authorName: PropTypes.string.isRequired,
    nftId: PropTypes.string.isRequired,
    nftImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    likes: PropTypes.number,
    expiryDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default NFTCard;
