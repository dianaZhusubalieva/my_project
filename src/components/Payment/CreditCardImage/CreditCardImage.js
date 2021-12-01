import React, { useState, useEffect } from "react";
import "./CreditCardImage.css";

const CreditCardImage = (props) => {
  const [rotateCard, setRotateCard] = useState(true);
  const [logoCard, setLogoCard] = useState("visa");

  const rotatecreditCard = (e) => {
    setRotateCard(!rotateCard);
  };

  const numCard01 = props.creditCardInfo.numCard01;
  const numCard02 = props.creditCardInfo.numCard02;
  const numCard03 = props.creditCardInfo.numCard03;
  const numCard04 = props.creditCardInfo.numCard04;
  const nameCard = props.creditCardInfo.nameCard;
  const monthCard = props.creditCardInfo.monthCard;
  const yearCard = props.creditCardInfo.yearCard;
  const ccvCard = props.creditCardInfo.ccvCard;

  useEffect(() => {
    if (numCard01) {
      if (numCard01[0] === "4") {
        setLogoCard("visa");
      } else if (numCard01[0] === "5") {
        setLogoCard("mastercard");
      }
    }
  }, [numCard01]);

  return (
    <React.Fragment>
      <section
        onClick={rotatecreditCard}
        className={rotateCard ? "creditCard" : "creditCard active"}
      >
        <div className="creditCard front">
          <div className="group-logo">
            <div
              className={
                logoCard === "mastercard" ? "logo mastercard" : "logo visa"
              }
            ></div>
          </div>
          <div className="group-chip">
            <div className="chip"></div>
          </div>
          <div className="group-num">
            <p className="label">номер карты:</p>
            <div className="group-numCard">
              <p className="num">{!numCard01 ? "0000" : numCard01}</p>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <p className="num">{!numCard02 ? "0000" : numCard02}</p>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <p className="num">{!numCard03 ? "0000" : numCard03}</p>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <p className="num">{!numCard04 ? "0000" : numCard04}</p>
            </div>
          </div>
          <div className="group-nameDate">
            <div className="group-name">
              <p className="label">ID</p>
              <p className="name">{!nameCard ? "ID number" : nameCard}</p>
            </div>
            <div className="group-date">
              <p className="label">Expiration</p>
              <p className="date">
                <span>{!monthCard ? "16" : monthCard}</span>/
                <span>{!yearCard ? "22" : yearCard}</span>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="creditCard back">
          <div className="group-tape">
            <div className="tape-div"></div>
          </div>
          <div className="group-sign-ccv">
            <div className="group-sign">
              <p className="label">cvv</p>
              <div className="sign-div">{!nameCard ? "" : nameCard}</div>
            </div>
            <div className="group-ccv">
              <p className="label">CCV</p>
              <div className="ccv-div">
                <span id="cvv-span">{!ccvCard ? "123" : ccvCard}</span>
              </div>
            </div>
          </div>
          <div className="group-info">
            <p className="info">
              Imposed approximately one month after a purchase is made (except
              in cases where there is a 0% APR introductory offer in place for
              an initial period of time after account opening), unless previous
            </p>
            <p className="info">www.visa-cardsA.com</p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreditCardImage;
