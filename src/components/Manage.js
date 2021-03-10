import React from "react";
import { Link } from "react-router-dom";

const Manage = () => {
  return (
    <div className="container">
      <div class="collection">
        <Link to="/adddhosa" class="collection-item black-text">
          <span class="badge">10</span>Dhosa
        </Link>
        <Link to="/addcold" class="collection-item black-text">
          <span class=" badge">4</span>Cold Drinks
        </Link>
        <Link href="/addextra" class="collection-item black-text">
          <span class="badge">5</span>Extra
        </Link>
        <Link href="/addtable" class="collection-item black-text">
          <span class="badge">5</span>Table
        </Link>
      </div>
    </div>
  );
};

export default Manage;
