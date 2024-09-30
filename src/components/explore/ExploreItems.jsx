import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg"; // Placeholder for author's image
import nftImage from "../../images/nftImage.jpg"; // Placeholder for NFT image

/**
 * ExploreItems component renders a list of NFT items on the Explore page.
 * It includes a filter dropdown, a grid of NFTs, and a "Load More" button.
 */
const ExploreItems = () => {
  return (
    <>
      {/* Filter dropdown to sort NFT items based on price or likes */}
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* Loop through 8 dummy NFT items to render them */}
      {new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            {/* Author profile picture with a link to the author's page */}
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={AuthorImage} alt="Author" />
                {/* Verified author icon */}
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {/* Countdown timer for the NFT auction */}
            <div className="de_countdown">5h 30m 32s</div>

            {/* NFT item image wrapper */}
            <div className="nft__item_wrap">
              {/* Hover effect buttons (Buy Now, Share) */}
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* NFT image preview with link to item details */}
              <Link to="/item-details">
                <img
                  src={nftImage}
                  className="lazy nft__item_preview"
                  alt="NFT"
                />
              </Link>
            </div>

            {/* NFT info section displaying the title, price, and like count */}
            <div className="nft__item_info">
              {/* Link to the item details page */}
              <Link to="/item-details">
                <h4>Pinky Ocean</h4> {/* NFT title */}
              </Link>
              <div className="nft__item_price">1.74 ETH</div>{" "}
              {/* NFT price in ETH */}
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>69</span> {/* Number of likes */}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* "Load More" button at the bottom of the list */}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
