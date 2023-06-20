import React, { useState, useEffect } from "react";
import Cards from "./components/Cards";
import { cards_list } from '../constants/cards_list'
import StartScreen from "./components/StartScreen";
import SelectAnswer from "./components/SelectAnswer";
import ResultPage from "./components/ResultPage";
import Push from "../components/Push";
import { getRandomInt } from "../constants/scripts";
import API from "../../utils/API";
import PushDefault from '../components/PushDefault'



function Game(props) {
  const [selected, selectCard] = useState(undefined);
  const [answer, setanswer] = useState(null);
  const [resultPage, setResultpage] = useState(false);
  const [push, setPush] = useState(null);
  const [isTruth, setIsTruth] = useState(null);
  const [end, setEnd] = useState(false);
  const [didRepost, setRepostDone] = useState(props.state.repost);
  const [realanswer, setRealAnswer] = useState(undefined);
  const [openedFinalCard, setFinalCard] = useState(null);
  const [defaultPush, setDefaultPush] = useState(false)

  // let cards_list = props.state.cards;
  const vk_id = props.state.user ? props.state.user.id : null;
  const checkAnswer = (id, statement) => {
    setanswer(statement);
    setResultpage(true);
    setIsTruth(statement === true);
    // setRealAnswer(res.data.result);
    // API.post(`/api/cards/${id}/pick`, { pick: statement, vk_id: vk_id }).then(
    //   (res) => {
    //     if (res.data.success) {
    //       res.data.data && props.setCoins(res.data.data);
    //       setanswer(statement);
    //       setResultpage(true);
    //       setIsTruth(statement === res.data.result);
    //       setRealAnswer(res.data.result);
    //     }
    //     else {
    //       setDefaultPush(true)
    //     }
    //   }
    // );
  };
  const checkRandom = () => {
    const notOpenedCards = props.state.cards
      .filter((item) => !item.opened)
      .map((item) => item.id);
    selectCard(notOpenedCards[getRandomInt(notOpenedCards)]);
  };


  useEffect(() => {
    if (props.state.coins !== undefined && props.state.coins < 2 && selected===undefined) {
      setPush(true);
    }
    if(props.state.coins > 1 ){
      setPush(false)
    }
  }, [])


  useEffect(() => {
    let cur = 0;
    cards_list.forEach((item) => {
      if (item.opened) {
        cur += 1;
      }
    });
    if (cur === 8) {
      setEnd(true);
    }
  });

  const cardSelection = (id, id2) => {
    // API.get(`/api/cards/${id2}`, { params: { vk_id: vk_id } }).then((res) => {
    //   if (res.data) {
    //     selectCard(id);
    //   }
    // });
    selectCard(id);
    console.log('selection')
  };
  const showCardFinal = (id) => {
    setFinalCard(cards_list[id - 1]);
    setResultpage(true);
  };
  const closeCard = () => {
    setResultpage(false);
    setFinalCard(null);
    selectCard(undefined);
    props.setOPenedCardPage(false);
    if (props.state.coins < 2) {
      setPush(true)
    }
  };

  useEffect(() => {
    props.repost && setRepostDone(true);
    props.setFirstOpening();
  }, []);

  return (
    <>
      {resultPage ? (
        <>
          <div
            onClick={closeCard}
            className="to-menu btn-type btn-type-with-icon text-white"
          >
            Назад
          </div>
          <ResultPage
            setOPenedCardPage={props.setOPenedCardPage}
            item={cards_list[selected] || openedFinalCard}
            id={openedFinalCard ? openedFinalCard.id : selected}
            answer={answer}
            sex={props.state.user.sex}
            isTruth={isTruth}
            realanswer={realanswer}
            openedFinalCard={openedFinalCard}
          />
        </>
      ) : (
        <>
          {selected !== undefined 
          && (
            <h2 className="text-white text-centred mg-tp-1">
              Это правда или миф?{" "}
            </h2>
          )}

          <div className={selected !== undefined ? "select-true" : ""}>
            {selected !== undefined ? (
              <SelectAnswer id={selected} checkAnswer={checkAnswer} />
            ) : (
              <h2 className="text-white text-centred mg-tp-1 mg-bt-2">
                {end ? `Все карты раскрыты!` : `Переверни карту за 2 балла`}
              </h2>
            )}
            <Cards
              cards_list={cards_list}
              selected={selected}
              selectCard={cardSelection}
              openedFinalCard={openedFinalCard}
              showCardFinal={showCardFinal}
              coins={props.state.coins}

            />
            {selected === undefined && (
              <StartScreen
                {...props}
                end={end}
                link={props.state.link}
                didRepost={didRepost}
                checkRandom={checkRandom}
                vk_id={vk_id}
                setRepostDone={setRepostDone}
                setPush={setPush}
                setCoins={props.setCoins}
              />
            )}
          </div>
        </>
      )}
      {/* {push ? (
        <Push didRepost={didRepost} setRepostDone={setRepostDone} link={props.state.link} vk_id={vk_id} setPush={setPush} setCoins={props.setCoins}/>
      ) : defaultPush ?
        <PushDefault /> : null
      } */}
    </>
  );
}

export default Game;
