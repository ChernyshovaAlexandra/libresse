import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import card1 from "../assets/images/menu-card-1.jpg";
import card2 from "../assets/images/menu-card-2.jpg";
import bridge from "@vkontakte/vk-bridge";
import Loading from "./Loading";

function Menu(props) {
  const [allowedMessages, allowToSendMessages] = useState(undefined);
  const [loading, setLoaded] = useState(true);
  // const [redirect, setRedirect] = useState(false);
  const buttonSet = [
    {
      name: "Начать игру",
      link: "/game"
      
      // `${
      //   allowedMessages && props.state.firstOpen
      //     ? "/rules"
      //     : allowedMessages
      //     ? "/game"
      //     : "/"
      // }`,
    },
    {
      name: "Мои чеки и призы",
      link: "/#",
    },
    {
      name: "Правила",
      link: "/rules_full",
    },
    {
      name: "Регистрация чека",
      link: "/registration",
    },
    {
      name: "Победители",
      link: "/winners",
    },
  ];
  // const allowMessages = () => {
  //   bridge.subscribe((e) => {
  //     if (e.detail.type === "VKWebAppAllowMessagesFromGroupResult") {
  //       if (e.detail.data.result) {
  //         if (allowedMessages === false) {
  //           setRedirect(true);
  //         }
  //         allowToSendMessages(true);
  //       }
  //     } else if (e.detail.type === "VKWebAppAllowMessagesFromGroupFailed") {
  //       allowToSendMessages(false);
  //     }
  //   });
  //   bridge.send("VKWebAppAllowMessagesFromGroup", {
  //     group_id: props.state.group_id,
  //   });
  // };
  useEffect(() => {
    // allowMessages();
    !props.state.firstOpen && setLoaded(false);
    setTimeout(() => {
      setLoaded(false);
    }, 2500);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) :
      //  redirect ? (
      //   <Redirect to={`${props.state.firstOpen ? "/rules" : "/game"}`} />
      // ) :
       (
        <div className="content-inner menu-container">
          <h1 className="text-white text-centred expressive">
            Разрушай мифы
          </h1>
          <p className="text-white text modellica mg-tp-1 text-centred max-width-60 centred">
            Разрушай мифы о месячных вместе с Libresse и «Пятёрочкой» и выигрывай
            ценные призы
          </p>
          <div className="btnSet">
            {buttonSet.map((item, id) =>
              // id === 0 ?
              // && !allowedMessages ? 
              // (
              //   <div
              //     className={`big-btn text-bold rounded btn-type btn-transparent text-white text-centred`}
              //     // onClick={() => allowMessages()}
              //   >
              //     <span>Начать игру</span>
              //   </div>
              // ) : 
              (
                <Link
                  className={`big-btn rounded btn-type btn-transparent text-white text-centred`}
                  to={item.link}
                  key={id}
                >
                  <span>{item.name}</span>
                </Link>
              )
            )}
          </div>
          <div className="cardsContainer_inner">
            <div className="after after-card-1">
              <img src={card1} alt="card1" />
            </div>
            <div className="after after-card-2">
              <img src={card2} alt="card2" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
