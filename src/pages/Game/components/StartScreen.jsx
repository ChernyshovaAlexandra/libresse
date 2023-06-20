import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { share } from "../../components/Push";

function StartScreen({ link, didRepost, checkRandom, end,vk_id,setRepostDone, setCoins }) {
  useEffect(()=>{
    // document.getElementsByClassName('share')[0].appendChild
    // document.getElementById('share').innerHTML = window.VK.Share.button('http://mysite.com', {type: 'link'}); 
  },[])
  return (
    <div className="actionSet mg-tp-2 centred">
      {/* {!end && */}
        <Link
          to="/registration"
          replace
          className="rounded btn-type btn-small btn-transparent text-white btn-type-with-icon subtract"
        >
          <span>
            <div className="img"></div> Зарегистрировать чек (+4 балла)
          </span>
        </Link>
      {/* } */}
      {didRepost ? null : (
        <button
          onClick={() => share(link, vk_id, setRepostDone, setCoins)}
          id="share"
          className="rounded btn-type btn-small btn-transparent text-white btn-type-with-icon share"
        >
          <span>
            <div className="img"></div> Поделиться (+3 балла)
            
          </span>
          
        </button>
      )}

      {!end && (
        <button
          className="rounded btn-type btn-small btn-transparent text-white btn-type-with-icon mix"
          onClick={checkRandom}
        >
          <span>
            <div className="img"></div>Случайная карта
          </span>
        </button>
      )}
    </div>
  );
}

export default StartScreen;
