import React from "react";
import img from "../assets/images/rules/main.png";
import Rules from "../assets/Rules.pdf";

function RulesFull() {
  return (
    <div className="content-inner menu-container">
      <h2 className="text text-white text-big text-centred">Правила</h2>
      <div className="wrapper mg-tp-1">
        <img src={img} alt="" />
      </div>
      <div className="btnSet">
        <a
          className={`big-btn rounded btn-type btn-transparent text-white text-centred`}
          href={Rules}
          target="_blank"
        >
          <span>Скачать правила</span>
        </a>
        <a
          className={`big-btn rounded btn-type btn-transparent text-white text-centred`}
          href="https://vk.com/im?media=&sel=-206882085"
          target="_blank"
        >
          <span>Задать вопрос</span>
        </a>
      </div>
    </div>
  );
}

export default RulesFull;
