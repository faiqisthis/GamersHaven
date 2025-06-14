import React from "react";

function ViewOrderBox() {
  const handleCloseClick = () => {
   
    
  };
  return (
    <div>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          zIndex: 1000,
        }}
        onClick={handleCloseClick} // Close modal when clicking outside the box
      ></div>

      {/* Modal Box */}
      <div
        className="bg-black"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "500px",
          borderRadius: "10px",
          border: "2px solid white",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
          zIndex: 1001,
        }}
      >
        <div className="">
          <h3 className=" text-center text-3xl font-bold p-2 ">
            Order Details
          </h3>
          <div className="p-4"></div>
          <button
            onClick={handleCloseClick}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <FaXmark color="white" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewOrderBox;
