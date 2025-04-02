// src/ProductPage/ProductDetails/Accordion.jsx
import React from "react";
import { Accordion } from "react-bootstrap";

const AccordionLeiras = ({ product }) => {
  if (!product) return null;

  return (
    <Accordion defaultActiveKey="0" className="custom-accordion my-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Termékleírás</Accordion.Header>
        <Accordion.Body>
          {product.description || "Nincs elérhető leírás."}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Allergének</Accordion.Header>
        <Accordion.Body>
          {product.allergens && product.allergens.length > 0
            ? product.allergens.join(", ")
            : "Nincs allergén"}
        </Accordion.Body>
      </Accordion.Item>
      {product.weight && (
        <Accordion.Item eventKey="2">
          <Accordion.Header>Súly</Accordion.Header>
          <Accordion.Body>{product.weight}</Accordion.Body>
        </Accordion.Item>
      )}
    </Accordion>
  );
};

export default AccordionLeiras;
