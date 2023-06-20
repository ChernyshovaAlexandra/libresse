import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { rulesList } from "./constants/rules_list";

function Rules() {
  const [count, setCounter] = useState(0);
  const [rule, setRule] = useState(rulesList[0]);

  const showNext = () => {
    if (count < rulesList.length) {
      setCounter(count + 1);
      setRule(rulesList[count + 1]);
    }
  };

  return (
    <div className="rules-container fixed bg-white">
      <Link
        className={`btn btn-type close-btn rounded ${rule.closeButColor}`}
        to="/game"
        replace
      />
      <div
        className="content"
        style={{
          background: `url(${rule.mainBg}) no-repeat top center`,
        }}
      >
        <div className="bottom">
          <h2
            className="text-centred mg-bt-1 mg-tp-1  max-width-80 centred"
            dangerouslySetInnerHTML={{ __html: rule.header }}
          />
          <p
            className="text-centred modellica text-bold max-width-80 centred"
            dangerouslySetInnerHTML={{ __html: rule.description }}
          />
          {rule.additional && (
            <span className="text-pink centred mg-tp-2 text-centred modellica">
              {rule.additional}
            </span>
          )}

          {count < rulesList.length - 1 ? (
            <div
              className="btn btn-wide btn-type rounded pink-btn text-white mg-tp-2"
              onClick={showNext}
            >
              Далее
            </div>
          ) : (
            <Link
              className="btn btn-wide btn-type rounded pink-btn text-white mg-tp-2"
              to="/game"
            >
              Начать
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rules;
