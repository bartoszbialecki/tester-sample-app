import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Project Home</h1>

      <Link to="./list">
        <button type="button" variant="raised">
          My List
        </button>
      </Link>
    </div>
  );
}
