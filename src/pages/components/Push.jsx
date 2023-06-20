import React, { useEffect, useState } from "react";
import popup from "../../assets/images/popup-coins.png";
import vkIcon from "../../assets/images/vk-icon.png";
import bridge from "@vkontakte/vk-bridge";
import { Link } from "react-router-dom";
import API from "../../utils/API";

export const share = (link, vk_id, setRepostDone, setCoins) => {
  bridge.subscribe((e) => {
    if (e.detail.type === "VKWebAppShowWallPostBoxResult") {
      API.post("/api/repost", { vk_id: vk_id }).then(res=>{
        setCoins(res.data.data)
      })
      window.localStorage.setItem("share", true);
      setRepostDone(true)
      // setPush(false)
    }
  });
  bridge.send("VKWebAppShowWallPostBox", {
    message:
      "Разрушай мифы вместе с Libresse и «Пятёрочкой» и выигрывай ценные призы",
    attachments: link,
  });
};

function Push({ didRepost, link, vk_id, setRepostDone, setCoins }) {
  return (
    <div className="fixedBg">
      <div className="push centred max-width-80 mg-centred">
        <Link
          to="/"
          replace
          className={`btn btn-type close-btn rounded pink`}
        />
        <div className="content mg-tp-4">
          <div className="coin-wrapper centred max-width-36 mg-bt-2">
            <img src={popup} alt="coins" />
          </div>
          <p className="modellica text-centred text-bold max-width-75 centred mg-bt-2">
            Кажется, у тебя закончились баллы. Зарегистрируй чек
            {!didRepost && ` или поделись на своей странице игрой`}, чтобы
            получить дополнительные.
          </p>
          <div className="btn-set centred mg-bt-2 max-width-90">
            {!didRepost ? (
              <button
                className="btn btn-type text-white bg-darkBlue rounded"
                onClick={() => share(link, vk_id, setRepostDone, setCoins)}
              >
                <img src={vkIcon} alt="vkIcon" /> Поделиться
              </button>
            ) : null}
            <Link
              to="/registration"
              replace
              className="btn btn-type text-white bg-darkBlue rounded"
            >
              Зарегистрировать чек
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Push;
