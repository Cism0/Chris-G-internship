import React from "react";
import NFTCard from "../NFTCard"; // Import the NFTCard component

const AuthorItems = ({ nftCollection, authorImage, authorName, authorId }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.length > 0 ? (
            nftCollection.map((nft, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                {/* Pass authorImage, authorName, and authorId */}
                <NFTCard
                  item={{
                    ...nft,
                    authorImage: nft.authorImage || authorImage, // Fallback to parent's authorImage
                    authorName: nft.authorName || authorName,   // Fallback to parent's authorName
                    authorId: nft.authorId || authorId,         // Fallback to parent's authorId
                  }}
                  showExpiry={false} // You can control the visibility of the expiry timer here
                />
              </div>
            ))
          ) : (
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
