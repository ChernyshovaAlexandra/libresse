import React, { useEffect, useState } from "react";
import popup from "../../assets/images/popup-coins.png";
import vkIcon from "../../assets/images/vk-icon.png";
import bridge from "@vkontakte/vk-bridge";
import { Link } from "react-router-dom";
import API from "../../utils/API";


function PushDefault() {
  return (
    <div className="fixedBg">
      <div className="push centred max-width-80 mg-centred">
        
        <div className="content mg-tp-4">
          <div className="coin-wrapper centred max-width-36 mg-bt-2">
            <img src={popup} alt="coins" />
          </div>
          <p className="modellica text-centred text-bold max-width-75 centred mg-bt-2">
            Что-то пошло не так. Возвращайся в игру попозже
          </p>
          <div className="btn-set centred mg-bt-2 max-width-90">
          
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default PushDefault;
