import React from "react";
import { Link } from "react-router-dom";

/**
 * BrowseByCategory component renders a section that allows users
 * to explore NFTs by various categories. It includes links with
 * icons and animations for each category.
 */
const BrowseByCategory = () => {
  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          {/* Section header with title and decorative border */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* Art Category */}
          <div
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            {/* Link to the Explore page for the 'Art' category */}
            <Link to="/explore" className="icon-box style-2 rounded">
              {/* Icon representing Art */}
              <i className="fa fa-image"></i>
              <span>Art</span>
            </Link>
          </div>

          {/* Music Category */}
          <div
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            {/* Link to the Explore page for the 'Music' category */}
            <Link to="/explore" className="icon-box style-2 rounded">
              {/* Icon representing Music */}
              <i className="fa fa-music"></i>
              <span>Music</span>
            </Link>
          </div>

          {/* Domain Names Category */}
          <div
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            {/* Link to the Explore page for the 'Domain Names' category */}
            <Link to="/explore" className="icon-box style-2 rounded">
              {/* Icon representing Domain Names */}
              <i className="fa fa-search"></i>
              <span>Domain Names</span>
            </Link>
          </div>

          {/* Virtual Worlds Category */}
          <div
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            {/* Link to the Explore page for the 'Virtual Worlds' category */}
            <Link to="/explore" className="icon-box style-2 rounded">
              {/* Icon representing Virtual Worlds */}
              <i className="fa fa-globe"></i>
              <span>Virtual Worlds</span>
            </Link>
          </div>

          {/* Trading Cards Category */}
          <div
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            {/* Link to the Explore page for the 'Trading Cards' category */}
            <Link to="/explore" className="icon-box style-2 rounded">
              {/* Icon representing Trading Cards */}
              <i className="fa fa-vcard"></i>
              <span>Trading Cards</span>
            </Link>
          </div>

          {/* Collectibles Category */}
          <div
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            {/* Link to the Explore page for the 'Collectibles' category */}
            <Link to="/explore" className="icon-box style-2 rounded">
              {/* Icon representing Collectibles */}
              <i className="fa fa-th"></i>
              <span>Collectibles</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
