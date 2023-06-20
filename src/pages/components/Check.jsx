import React from "react";
import check from "../../assets/images/check-lil.png";

export default function Check({ item }) {
  return (
    <div className="check">
      <p className="text text-bold modellica text-centred">
        <span>№</span> {item.number}
      </p>
      <p className="text modellica text-small text-gray">
        <small>
          Дата добавления: <span>{item.date}</span>
        </small>
      </p>
      <div className="wrapper mg-tp-1 mg-bt-1">
        <img src={check} alt="" />
      </div>
      <div
        className={`btn-type btn-lil ${
          item.approved ? "bg-green" : "bg-red"
        } rounded text-white`}
      >
        <small>{item.approved ? 'Зарегистрировано': 'Ошибка'}</small>
      </div>
    </div>
  );
}
