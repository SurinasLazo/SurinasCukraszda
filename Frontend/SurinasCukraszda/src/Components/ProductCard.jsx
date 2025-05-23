import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import "./ProductCard.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductCard({ product }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const src = `${API_BASE_URL}/api/products/${product._id}/image`;

  return (
    <div className="product-card">
      {/* kép blokk */}
      <div className="product-card__image">
        {/* skeleton addig, amíg a kép nem tölt be */}
        {!imgLoaded && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}
        <img
          src={src}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          style={{
            display: imgLoaded ? "block" : "none",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* infó blokk */}
      <div className="product-card__info">
        <h2 className="product-card__title">{product.name}</h2>
        <p className="product-card__description">
          {product.description || "Rövid leírás..."}
        </p>
        <div className="product-card__price-row">
          <span className="product-card__price">
            {product.price.toFixed(2)} Ft
          </span>
          <Link to={`/product/${product._id}`} className="product-card__btn">
            Részletek
          </Link>
        </div>
      </div>
    </div>
  );
}
