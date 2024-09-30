import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

/**
 * AuthorItems component renders a grid of NFT items for a specific author.
 * Props:
 * - nftCollection: Array of NFTs belonging to the author.
 * - authorImage: Optional custom image of the author.
 * - authorName: Optional name of the author.
 */

const AuthorItems = ({ nftCollection, authorImage, authorName }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.length > 0 ? (
            nftCollection.map((nft, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  {/* Author's profile picture with a link to the author's page */}
                  <div className="author_list_pp">
                    <Link to={`/author/${nft.authorId}`}>
                      <img
                        className="lazy"
                        src={authorImage || AuthorImage} // Displays author's image, or default if none provided
                        alt={authorName || "Author"} // Displays author's name or default if none provided
                      />
                      {/* Check icon indicating a verified author */}
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {/* Wrapper for the NFT item image */}
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

                    {/* NFT image preview with a link to the item details page */}
                    <Link to={`/item-details/${nft.id}`}>
                      <img
                        src={nft.nftImage} // Displays the NFT's image
                        className="lazy nft__item_preview"
                        alt={nft.title} // Alt text is the title of the NFT
                      />
                    </Link>
                  </div>

                  {/* NFT info: title, price, likes */}
                  <div className="nft__item_info">
                    {/* NFT title with a link to the item's details page */}
                    <Link to={`/item-details/${nft.id}`}>
                      <h4>{nft.title}</h4>
                    </Link>
                    {/* Display NFT price in ETH */}
                    <div className="nft__item_price">{nft.price} ETH</div>
                    {/* Like icon with the current number of likes */}
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // If the collection is empty, display a message
            <div className="col-12 text-center">
              <p>No NFTs found for this author.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
