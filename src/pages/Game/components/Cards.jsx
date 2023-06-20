import React from "react";
import CardBackSide from "./CardBackSide";

function Cards({
  selected,
  selectCard,
  cards_list,
  showCardFinal,
  coins
}) {

  return (
    <div
      className={`cards-container mg-tp-1 ${
        selected !== undefined ? "hideContainer" : ""
      }`}
    >
      {cards_list.map((item, id) => (
        <div
          className={`${id == selected ? "selected" : ""} cardCont ${
            item.opened ? "disabled" : ""
          } ${coins < 2 ? 'closed' : ''}`}
          key={id}
          onClick={() =>
            selected === undefined && !item.opened 
              ? selectCard(id, item.id)
              : showCardFinal(item.id)
          }
        >
          <div
            className={`card card-front card-${id + 1} `}
            data-card={`Миф ${id + 1}`}
          ></div>
          <CardBackSide item={item} id={item.id} />
        </div>
      ))}
    </div>
  );
}

export default Cards;
