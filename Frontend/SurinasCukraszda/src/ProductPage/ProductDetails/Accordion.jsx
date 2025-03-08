import React from "react";
import { Accordion } from "react-bootstrap";
import products from "../../data/products";
import { useParams } from "react-router-dom";
import "./Accordion.css";
function AccordionLeiras() {
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);

  return (
    <Accordion className="accordion-custom">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="accordion-header">
          <p>
            <strong>Leírás:</strong> {product.description}
          </p>
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          <p>
            <strong>Alergének:</strong> {product.allergens.join(", ")}
          </p>
          <br />
          <p>
            <strong>Súly:</strong> {product.weight}
          </p>
          <br />
          <p>
            <strong>Kategória:</strong> {product.category}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionLeiras;
