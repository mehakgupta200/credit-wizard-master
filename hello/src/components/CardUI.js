import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./card-style.css";

export default function Card() {
  return (
    <div className="card text-center">
      <div className="card-body text-dark">
        <p className="card-text text-secondary">
          name: ..............<br></br>
          Email: .............<br></br>
          Credit: ..........<br></br>
          Paid: ..........<br></br>
          balance: ..........<br></br>
          <button type="button" class="btn btn-outline-success">
            Primary
          </button>
        </p>
      </div>
    </div>
  );
}
