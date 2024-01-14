import React, { useContext, useState, useEffect } from 'react';
import StripePayment from './../Stripe';
// import PaymentStub from './../PaymentStub'

export const useStripeLib = false;

const PaymentForm = ({ amount, senderId, patientId, email, setAmount }) => {

    return (<>
        <StripePayment
          amount={amount}
          senderId={senderId}
          patientId={patientId}
          email={email}
          setAmount={setAmount}
        />
        {/* <PaymentStub
          amount={amount}
          senderId={senderId}
          patientId={patientId}
          email={email}
          setAmount={setAmount}
        /> */}
    </>)
}

export default PaymentForm;