import React from "react";
import CardBackSide from "./CardBackSide";
import coin from "../../../assets/images/coin.png";
import { useEffect } from "react";
import img1 from '../../../assets/images/game/card-bg/1.jpg'
import img2 from '../../../assets/images/game/card-bg/2.jpg'
import img3 from '../../../assets/images/game/card-bg/3.jpg'
import img4 from '../../../assets/images/game/card-bg/4.jpg'
import img5 from '../../../assets/images/game/card-bg/5.jpg'
import img6 from '../../../assets/images/game/card-bg/6.jpg'
import img7 from '../../../assets/images/game/card-bg/7.jpg'
import img8 from '../../../assets/images/game/card-bg/8.jpg'






function ResultPage({
  item,
  id,
  sex,
  isTruth,
  realanswer,
  openedFinalCard,
  setOPenedCardPage,
}) {

 if(!openedFinalCard){
   id = id+ 1
 }

 useEffect(() => {
    setOPenedCardPage(true);
  }, []);
  return (
    <div className="result-page fixed bg-pink">
      <div className="result-page__content">
        <div className="result-page__content-left ">
          <div className="heading">
            <h2 className="text-bold modellica mg-bt-1">
              {!openedFinalCard && (
                <>
                  {isTruth ? (
                    <span className="text-pink">Да, </span>
                  ) : (
                    <span className="text-darkPink">Нет, </span>
                  )}
                </>
              )}
              это - {realanswer ? "правда" : "миф"}
            </h2>
            <div className="rounded-wrapper">
              <img src={id=== 1 ? img1 : id=== 2 ? img2: id===3 ? img3 : id===4 ? img4 : id===5 ? img5 : id===6 ? img6 : id===7 ? img7 : id===8 ? img8 : null} alt="" />
            </div>
          </div>
          <div>
            <p
              className="modellica text-bold  mg-bt-1"
              style={{ lineHeight: "1.8", fontSize: "84%" }}
              dangerouslySetInnerHTML={{
                __html: item.text,
              }}
            />

            {!openedFinalCard && (
              <div className="btn-type rounded bg-white text-bold btn-type-with-icon btn-small btn-transparent not-a-btn">
                <span>
                  <img src={coin} alt="coin" />
                  {isTruth ? (
                    <>
                      Ты {sex === 1 ? "ответила" : "ответил"} правильно
                      <br />и получаешь 1 балл в копилку
                    </>
                  ) : (
                    <>
                      Ответ неправильный,
                      <br />
                      ты получаешь 0 баллов в копилку
                    </>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="result-page__content-right ">
          <div className="inner">
            <div className="cardCont selected">
              <CardBackSide item={item} id={id} />
            </div>
            {!openedFinalCard && (
              <a
                href="https://vk.com/im?sel=-206882085"
                target="_blank"
                className="btn btn-type rounded pink-btn text-white mg-tp-2"
              >
                Получить подарок
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
