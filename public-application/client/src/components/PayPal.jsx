import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContextCustomer";
import {handlePurchaseEmail} from "../functions/handlePurchaseEmail";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    swalTitle: "Succefull Purchase",
    swalText: "You purchased the book. You will receive your receipt on your email"
  },
  croatian: {
    swalTitle: "Uspjesna kupovina",
    swalText: "Uspjesno ste kupili knjigu. Potvrda stize na email."
  }
}

const PayPal = ({
  bookName,
  bookPrice,
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
                  value: bookPrice,
                  currency_code: "EUR",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if (order.status === "COMPLETED") {
            await handlePurchaseEmail(currentUser, bookId, bookPrice, "PAYPAL");
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

export default PayPal;
