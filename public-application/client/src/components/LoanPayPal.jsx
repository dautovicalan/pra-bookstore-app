import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContextCustomer";
import {handleLoanEmail} from "../functions/handlePurchaseEmail";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    swalTitle: "Succefull loan",
    swalText: "You loaned the book. You will receive your receipt on your email"
  },
  croatian: {
    swalTitle: "Uspjesna posudba",
    swalText: "Uspjesno ste posudili knjigu. Potvrda stize na email."
  }
}

const LoanPayPal = ({
  bookName,
  loanDuration,
  loanPrice,
  bookId,
  setCheckOut,
  setFormToRender,
}) => {
  const paypal = useRef();

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const { currentUser } = useAuth();  

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: bookName,
                amount: {
                  value: loanPrice,
                  currency_code: "EUR",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if (order.status === "COMPLETED") {
            await handleLoanEmail(currentUser, 
              bookId, 
              loanDuration,
              loanPrice,              
               "PAYPAL");
            Swal.fire({
              title: currentLanguage.swalTitle,
              text: currentLanguage.swalText,
              icon: "success",
              confirmButtonText: "Cool",
            });
            setCheckOut(false);
            setFormToRender(null);
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default LoanPayPal;
