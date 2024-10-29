import React, { useState } from "react";
import { cards } from "../cards";

const FlipCard = () => {
  const [cardsArray, setCardsArray] = useState([
    ...cards?.map((ele) => {
      return {
        ...ele,
        show: false,
      };
    }),
  ]);
  const handleClick = (number, index) => {
    let newArray = [...cardsArray];
    let lastClickCard = [...cardsArray?.filter((ele) => ele.last === true)];
    if (lastClickCard?.length > 0) {
      setCardsArray(
        newArray?.map((ele, i) => {
          if (ele.number === number.number && i === index) {
            return {
              ...ele,
              show: true,
            };
          } else {
            return {
              ...ele,
            };
          }
        })
      );
      setTimeout(() => {
        setCardsArray(
          newArray?.map((ele, i) => {
            // console.log("here==>", number, ele.number);
            if (
              ele.number === number.number &&
              lastClickCard[0].number === number.number
            ) {
              return {
                ...ele,
                show: true,
                last: false,
                done: true,
              };
            } else if (ele.done !== true) {
              return {
                ...ele,
                show: false,
                last: false,
              };
            } else {
              return {
                ...ele,
              };
            }
          })
        );
      }, 2000);
      // setCardsArray();
    } else {
      setCardsArray(
        newArray?.map((ele, i) => {
          // console.log("here==>", number, ele.number);
          if (ele.number === number.number && i === index) {
            return {
              ...ele,
              show: true,
              last: true,
            };
          } else {
            return {
              ...ele,
            };
          }
        })
      );
    }
  };

  console.log("cards array==>", cardsArray);
  return (
    <div className="card-container">
      {cardsArray?.map((item, index) => (
        <div
          className={`card ${item?.show && 'is-flipped'}`}
          key={index}
          onClick={() => handleClick(item, index)}
        >
          {item?.show ? (
            <div className="back">{item?.number}</div>
          ) : (
            <div className="front"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FlipCard;
