import React, { useState } from "react";
import Menu from "./pages/Menu";
import Presents from "./pages/Presents";
import Rules from "./pages/Rules";
import Registration from "./pages/Registration/Registration";
import Game from "./pages/Game";
import { Hoc } from "./Hoc";
import Header from "./pages/components/Header";
import bridge from "@vkontakte/vk-bridge";
import { useEffect } from "react";
import API from "./utils/API";
import RulesFull from "./pages/RulesFull";
import PushDefault from "./pages/components/PushDefault";
import Winners from "./pages/Winners";

function IndexPage(props) {
  const [push, setPush] = useState(false)
  const vkLogin = () => {
    // bridge.subscribe((e) => {
    //   if (e.detail.type === "VKWebAppGetUserInfoResult") {
    //     props.setUserData(e.detail.data);
    //     loginUser(e.detail.data.id);
    //   }
    // });
    // bridge.send("VKWebAppGetUserInfo");
    props.setUserData({
      name: "User",
      vk_id: "12345"
    });
  };
  useEffect(() => {
    vkLogin();
  }, []);

  // const loginUser = (vk_id) => {
  //   API.post("/api/login", { vk_id: vk_id }).then((response) => {
  //     props.setCoins(response.data.data);
  //   })
  //   .catch(error =>{
  //     setPush(true)
  //   })
  //   ;
  // };

  const componentPages = [
    {
      page: "menu",
      components: [Menu],
    },
    {
      page: "presents",
      components: [Presents],
    },
    {
      page: "rules",
      components: [Rules],
    },
    {
      page: "rules_full",
      components: [RulesFull],
    },
    {
      page: "registration",
      components: [Registration],
    },
    {
      page: "game",
      components: [Game],
    },
    {
      page:"winners",
      components: [Winners]
    }
  ];
  const { page, state } = props;

  return (
    <div className="container">
      {componentPages
        .filter((item) => item.page === page)[0]
        .components.map((el, index) => {
          const Component = el;
          return (
            <div key={index}>
              <Header
                opencardPage={props.state.opencardPage}
                coins={state.coins}
                page={page}
              />
             {/* {push ?  <PushDefault /> : null} */}
              <Component {...props} />
            </div>
          );
        })}
    </div>
  );
}

export default Hoc(IndexPage);
