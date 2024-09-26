import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import AuthorImagePlaceholder from "../images/author_thumbnail.jpg";
import nftImagePlaceholder from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton"; // Adjust the import path if needed

const ItemDetails = () => {
  const { nftId } = useParams(); // Extract the nftId from the URL
  const [nftDetails, setNftDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch the NFT details from the API
    const fetchNftDetails = async () => {
      setTimeout(async () => {
        try {
          const response = await fetch(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch NFT details");
          }
          const data = await response.json();
          setNftDetails(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }, 2000); // Simulate network delay for skeleton loading effect
    };

    fetchNftDetails();
  }, [nftId]);

  if (loading) {
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
    return <div>Error: {error}</div>;
  }

  // If nftDetails is available, destructure the needed data
  const {
    nftImage,
    title,
    views,
    likes,
    description,
    ownerImage,
    ownerName,
    creatorImage,
    creatorName,
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
                  src={nftImage || nftImagePlaceholder}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {likes}
                    </div>
                  </div>
                  <p>{description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${ownerName}`}>
                            <img
                              className="lazy"
                              src={ownerImage || AuthorImagePlaceholder}
                              alt={ownerName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${ownerName}`}>{ownerName}</Link>
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
                          <Link to={`/author/${creatorName}`}>
                            <img
                              className="lazy"
                              src={creatorImage || AuthorImagePlaceholder}
                              alt={creatorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${creatorName}`}>{creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{price} ETH</span>
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
