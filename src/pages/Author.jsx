import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  // Extract the authorId from the URL parameters
  const { authorId } = useParams();

  // State to hold author data, loading status, followed status, followers count, and any errors
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [error, setError] = useState(null);

  // Fetch author data from the API based on the authorId
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        // Check if the response is OK; if not, throw an error
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        // Set the fetched author data and followers count
        setAuthorData(data);
        setFollowersCount(data.followers);
        setLoading(false);
      } catch (error) {
        // Handle errors by setting the error state
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]); // Dependency array includes authorId to refetch data when it changes

  // Toggle the followed status and update the followers count
  const handleFollowToggle = () => {
    if (followed) {
      setFollowersCount(followersCount - 1); // Decrease follower count if unfollowing
    } else {
      setFollowersCount(followersCount + 1); // Increase follower count if following
    }
    setFollowed(!followed); // Toggle followed status
  };

  // Display a skeleton loader while loading
  if (loading) {
    return <Skeleton width="100%" height="400px" />;
  }

  // Display an error message if an error occurred
  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Section for the author banner */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={`url(${AuthorBanner}) top`}
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        {/* Section for the author profile and items */}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData?.authorImage} alt="Author" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData?.authorName} {/* Display author's name */}
                          <span className="profile_username">
                            @{authorData?.tag} {/* Display author's tag */}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData?.address} {/* Display author's wallet address */}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy {/* Button to copy wallet address */}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followersCount} followers {/* Display follower count */}
                      </div>
                      <button className="btn-main" onClick={handleFollowToggle}>
                        {followed ? "Unfollow" : "Follow"} {/* Toggle button text based on followed status */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {/* Component to display the author's NFT collection */}
                  <AuthorItems
                    nftCollection={authorData.nftCollection}
                    authorImage={authorData.authorImage}
                    authorName={authorData.authorName}
                    authorId={authorId}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
