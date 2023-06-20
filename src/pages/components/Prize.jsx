import React from "react";

export default function Prize({ item }) {
  return (
    <div className="check prize-cont ">
      <p className="text text-bold text-red modellica text-centred">
        {item.type}
      </p>
      <p className="text modellica text-centred  mg-tp-1 text-small text-gray">
        <small>{item.text}</small>
      </p>
      <div className="wrapper prize mg-tp-1 mg-bt-1">
        <img src={item.img} alt="" />
      </div>
      <div className="btn-type btn-lil rounded text-white pink-btn">
        <small>Получить подарок</small>
      </div>
    </div>
  );
}
