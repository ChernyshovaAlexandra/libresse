import React from "react";

function CardBackSide({ item, id }) {
  return (
    <div className={`card card-back card-back-${id}`}>
      <div className="card-back__inner">
        <h4 className="text-pink modellica text-bold text-upper mg-bt-1">
          Миф {id}
        </h4>
        <div className="modellica text-bold ">
          <p>{item.declare}</p>
        </div>
      </div>
    </div>
  );
}

export default CardBackSide;
