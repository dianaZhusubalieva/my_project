import React, { useState } from "react";
import CreditCardForm from "../components/Payment/CreditCardForm/CreditCardForm";
import CreditCardImage from "../components/Payment/CreditCardImage/CreditCardImage";

const PaymentPage = () => {
  const [creditCardInfo, setCreditCardInfo] = useState({});

  const creditCardData = (info) => {
    setCreditCardInfo({
      numCard01: info.numCard01Ref,
      numCard02: info.numCard02Ref,
      numCard03: info.numCard03Ref,
      numCard04: info.numCard04Ref,
      nameCard: info.nameCardRef,
      monthCard: info.monthCardRef,
      yearCard: info.yearCardRef,
      ccvCard: info.ccvCardRef,
    });
  };
  return (
    <div className="paymentPage">
      <CreditCardImage creditCardInfo={creditCardInfo} />
      <CreditCardForm creditCardData={creditCardData} />
    </div>
  );
};

export default PaymentPage;
