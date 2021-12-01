import React, { useContext, useState } from "react";

import "./CreditCardForm.css";
import { useNavigate } from "react-router-dom";
const CreditCardForm = (props) => {
  const navigate = useNavigate();
  const [closeBtn, setCloseBtn] = useState(false);
  const [creditCardData, setcreditCardData] = useState({});

  const numCard01Ref = React.createRef();
  const numCard02Ref = React.createRef();
  const numCard03Ref = React.createRef();
  const numCard04Ref = React.createRef();
  const nameCardRef = React.createRef();
  const monthCardRef = React.createRef();
  const yearCardRef = React.createRef();
  const ccvCardRef = React.createRef();

  const addCloseForm = (e) => {
    setCloseBtn(!closeBtn);
  };

  const handleChange = (e) => {
    setcreditCardData({
      numCard01Ref: numCard01Ref.current.value,
      numCard02Ref: numCard02Ref.current.value,
      numCard03Ref: numCard03Ref.current.value,
      numCard04Ref: numCard04Ref.current.value,
      nameCardRef: nameCardRef.current.value,
      monthCardRef: monthCardRef.current.value,
      yearCardRef: yearCardRef.current.value,
      ccvCardRef: ccvCardRef.current.value,
    });
    props.creditCardData(creditCardData);
  };

  // const { clearCountOfCart } = useContext(clientContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success");
  };

  return (
    <>
      <div
        className={!closeBtn ? "close-form" : "close-form active"}
        onClick={addCloseForm}
      ></div>
      <form
        onKeyUp={handleChange}
        onSubmit={handleSubmit}
        className={closeBtn ? "creditCardForm activeForm" : "creditCardForm"}
      >
        <div className="field-form">
          <label>Card number</label>
          <div className="field-form-numCard">
            <input
              required
              className="numCard-input"
              maxLength="4"
              ref={numCard01Ref}
              onChange={handleChange}
              type="text"
              placeholder="0000"
            />
            <span>-</span>
            <input
              required
              className="numCard-input"
              maxLength="4"
              ref={numCard02Ref}
              onChange={handleChange}
              type="text"
              placeholder="0000"
            />
            <span>-</span>
            <input
              required
              className="numCard-input"
              maxLength="4"
              ref={numCard03Ref}
              onChange={handleChange}
              type="text"
              placeholder="0000"
            />
            <span>-</span>
            <input
              required
              className="numCard-input"
              maxLength="4"
              ref={numCard04Ref}
              onChange={handleChange}
              type="text"
              placeholder="0000"
            />
          </div>
        </div>
        <div className="field-form">
          <label>card ID</label>
          <input
            required
            ref={nameCardRef}
            onChange={handleChange}
            type="text"
            placeholder="ID number"
            maxLength="16"
          />
        </div>
        <div className="field-form-container">
          <div className="field-form">
            <label>Expiration date</label>
            <select
              required
              ref={monthCardRef}
              onChange={handleChange}
              type="number"
            >
              <option value="мес">month</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="field-form">
            <select
              required
              ref={yearCardRef}
              onChange={handleChange}
              type="number"
            >
              <option value="год">год</option>
              <option value="20">2020</option>
              <option value="21">2021</option>
              <option value="22">2022</option>
              <option value="23">2023</option>
              <option value="24">2024</option>
              <option value="25">2025</option>
            </select>
          </div>
          <div className="field-form">
            <label>CCV</label>
            <input
              required
              ref={ccvCardRef}
              id="cvv"
              onChange={handleChange}
              type="text"
              placeholder="123"
              maxLength="3"
            />
          </div>
        </div>
        <div className="btn-form">
          <button className="btnSubmit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreditCardForm;
