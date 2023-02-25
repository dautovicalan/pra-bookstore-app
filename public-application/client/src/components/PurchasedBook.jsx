import React from "react";
import styles from "../styles/PurchasedBook.module.css";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    name: "Name",
    price: "Price",
    date: "Purchase Date"
  },
  croatian: {
    name: "Ime",
    price: "Cijena",
    date: "Datum kupovine"
  }
}

const PurchasedBook = ({ bookData, price, purchaseDate }) => {
  const dt = new Date(purchaseDate);

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  return (
    <div className={styles.book_section}>
      <img src={bookData?.pictureUrl} />
      <div className={styles.book_information}>
        <h4>{currentLanguage.name}: {bookData?.name}</h4>
        <p>{currentLanguage.price}: {price} kn</p>
        <p>
          {currentLanguage.date}: {dt.getDate()}.{dt.getMonth() + 1}.{dt.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default PurchasedBook;
