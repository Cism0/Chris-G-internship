import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import { Link, useParams } from "react-router-dom"; // Importing Link and useParams for routing
import EthImage from "../images/ethereum.svg"; // Importing Ethereum image for price display
import AuthorImagePlaceholder from "../images/author_thumbnail.jpg"; // Placeholder image for author
import nftImagePlaceholder from "../images/nftImage.jpg"; // Placeholder image for NFT
import Skeleton from "../components/UI/Skeleton"; // Importing Skeleton component for loading effect

const ItemDetails = () => {
  const { nftId } = useParams(); // Extract the nftId from the URL parameters
  const [nftDetails, setNftDetails] = useState(null); // State to store NFT details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount

    // Function to fetch NFT details from the API
    const fetchNftDetails = async () => {
      setTimeout(async () => {
        try {
          const response = await fetch(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch NFT details"); // Handle unsuccessful fetch
          }
          const data = await response.json(); // Parse the response data
          setNftDetails(data); // Set the fetched NFT details in state
          setLoading(false); // Update loading state
        } catch (error) {
          setError(error.message); // Set error message in state
          setLoading(false); // Update loading state
        }
      }, 2000); // Simulate a network delay for skeleton loading effect
    };

    fetchNftDetails(); // Call the function to fetch NFT details
  }, [nftId]); // Dependency array includes nftId, so effect runs when it changes

  if (loading) {
    // Render skeleton loading state while data is being fetched
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                {/* Skeleton for Image */}
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="400px" borderRadius="10px" />
                </div>
                {/* Skeleton for NFT details */}
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="60%" height="40px" />
                    <div className="item_info_counts">
                      <Skeleton width="30%" height="20px" />
                    </div>
                    <Skeleton width="100%" height="20px" count={3} />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                        <Skeleton width="80px" height="20px" />
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <h6>Creator</h6>
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <Skeleton width="80px" height="20px" />
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <Skeleton width="30%" height="20px" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    // Render error message if there was an error fetching NFT details
    return <div>Error: {error}</div>;
  }

  // Destructuring the needed data from nftDetails
  const {
    nftImage,
    title,
    views,
    likes,
    description,
    ownerImage,
    ownerName,
    ownerId,
    creatorImage,
    creatorName,
    creatorId,
    price
  } = nftDetails;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftImage || nftImagePlaceholder} // Use fetched NFT image or placeholder
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title} // Use title as alt text for accessibility
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title}</h2> {/* Display the NFT title */}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {views} {/* Display the number of views */}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {likes} {/* Display the number of likes */}
                    </div>
                  </div>
                  <p>{description}</p> {/* Display the NFT description */}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${ownerId}`}> {/* Link to the owner's page */}
                            <img
                              className="lazy"
                              src={ownerImage || AuthorImagePlaceholder} // Use owner's image or placeholder
                              alt={ownerName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${ownerId}`}>{ownerName}</Link> {/* Display owner's name as a link */}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${creatorId}`}> {/* Link to the creator's page */}
                            <img
                              className="lazy"
                              src={creatorImage || AuthorImagePlaceholder} // Use creator's image or placeholder
                              alt={creatorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${creatorId}`}>{creatorName}</Link> {/* Display creator's name as a link */}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" /> {/* Ethereum logo */}
                      <span>{price} ETH</span> {/* Display the price of the NFT in ETH */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails; 