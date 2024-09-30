import React from "react";

// Functional component for the HeaderExplore section
const HeaderExplore = () => {
  return (
    <div className="col-lg-12">
      <div className="items_filter">
        {/* Form for quick search functionality */}
        <form
          action="blank.php" // Placeholder action (should be updated)
          className="row form-dark" // Dark themed form styling
          id="form_quick_search" // Unique ID for the form
          method="post" // Form submission method
          name="form_quick_search" // Name attribute for the form
        >
          <div className="col text-center"> {/* Centered column for the search input */}
            <input
              className="form-control" // Bootstrap form control styling
              id="name_1" // Unique ID for the input field
              name="name_1" // Name attribute for the input field
              placeholder="search item here..." // Placeholder text for the input
              type="text" // Input type is text
            />{" "}
            {/* Search button with Font Awesome icon */}
            <a href="#" id="btn-submit">
              <i className="fa fa-search bg-color-secondary"></i>
            </a>
            <div className="clearfix"></div> {/* Clearfix for layout purposes */}
          </div>
        </form>

        {/* Dropdown for item categories */}
        <div id="item_category" className="dropdown">
          <a href="#" className="btn-selector">
            All categories
          </a>
          <ul>
            <li className="active">
              <span>All categories</span> {/* Active category display */}
            </li>
            <li>
              <span>Art</span>
            </li>
            <li>
              <span>Music</span>
            </li>
            <li>
              <span>Domain Names</span>
            </li>
            <li>
              <span>Virtual World</span>
            </li>
            <li>
              <span>Trading Cards</span>
            </li>
            <li>
              <span>Collectibles</span>
            </li>
            <li>
              <span>Sports</span>
            </li>
            <li>
              <span>Utility</span>
            </li>
          </ul>
        </div>

        {/* Dropdown for buy options */}
        <div id="buy_category" className="dropdown">
          <a href="#" className="btn-selector">
            Buy Now
          </a>
          <ul>
            <li className="active">
              <span>Buy Now</span> {/* Active buy option display */}
            </li>
            <li>
              <span>On Auction</span>
            </li>
            <li>
              <span>Has Offers</span>
            </li>
          </ul>
        </div>

        {/* Dropdown for item types */}
        <div id="items_type" className="dropdown">
          <a href="#" className="btn-selector">
            All Items
          </a>
          <ul>
            <li className="active">
              <span>All Items</span> {/* Active item type display */}
            </li>
            <li>
              <span>Single Items</span>
            </li>
            <li>
              <span>Bundles</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderExplore;
