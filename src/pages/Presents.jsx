import React from "react";
import Check from "./components/Check";
import Prize from "./components/Prize";
import { checks } from "./constants/checks";
import { prizes } from "./constants/prizes";

function Presents(props) {
  return (
    <div className="content-inner menu-container check-container">
      <h2 className="text text-white text-big text-centred">Мои чеки</h2>
      {props.state.checks.length ? (
        <div className="mg-tp-2 checks-container">
          {props.state.checks.map((item, id) => (
            <Check item={item} key={id} />
          ))}
        </div>
      ) : (
        <p className="centred text-white mg-tp-2">
          У тебя пока нет зарегистрированных чеков
        </p>
      )}
      <h2 className="text text-white text-big mg-tp-2 text-centred">
        Мои призы
      </h2>
      {props.state.prizes.length ? (
        <div className="mg-tp-2 checks-container prizes-container">
          {props.state.prizes.map((item, id) => (
            <Prize item={item} key={id} />
          ))}
        </div>
      ) : (
        <p className="centred text-white mg-tp-2">У тебя пока нет призов</p>
      )}
    </div>
  );
}

export default Presents;
