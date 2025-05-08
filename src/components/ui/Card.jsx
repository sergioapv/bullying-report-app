import React from "react";

const Card = ({ children }) => {
    return (
        <div className="card" style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            {children}
        </div>
    );
};

export default Card;
