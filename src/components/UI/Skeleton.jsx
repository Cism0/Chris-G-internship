import React from "react";

const Skeleton = ({ width, height, borderRadius, marginLeft = "0", className = "" }) => {
  return (
    <div
      className='skeleton-box'
      style={{
        width,
        height,
        borderRadius,
        marginLeft,
      }}
    ></div>
  );
};

export default Skeleton;
