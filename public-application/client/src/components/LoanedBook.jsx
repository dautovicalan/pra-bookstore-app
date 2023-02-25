import React from "react";
import styles from "../styles/LoanedBook.module.css";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    name: "Name",
    loanStart: "Loan start",
    loanEnd: "Loan end",
    duration: "Loan duration",
    week: "week",
    underlineText: "For each date over loan end 1 KN more"
  },
  croatian: {
    name: "Ime",
    loanStart: "Datum posudbe:",
    loanEnd: "Datum kraja posudbe",
    duration: "Trajanje posudbe",
    week: "tjedana",
    underlineText: "Zakasnina 1kn po svakom zakasnjenom danu"
  }
}

const LoanedBook = ({ bookData, loanDateStart, loanDateEnd, loanDuration }) => {

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const loanStart = new Date(loanDateStart);
  const loanEnd = new Date(loanDateEnd);

  return (
    <div className={styles.book_section}>
      <img src={bookData?.pictureUrl} />
      <div className={styles.book_information}>
        <h4>{currentLanguage.name}: {bookData?.name}</h4>
        <p>
          {currentLanguage.loanStart}: {loanStart.getDate()}.{loanStart.getMonth() + 1}.
          {loanStart.getFullYear()}
        </p>
        <p>
          {currentLanguage.loanEnd}: {loanEnd.getDate()}.{loanEnd.getMonth() + 1}.
          {loanEnd.getFullYear()}
        </p>
        <p>{currentLanguage.duration}: {loanDuration} {currentLanguage.week}</p>
        <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
          {currentLanguage.underlineText}
        </p>
      </div>
    </div>
  );
};

export default LoanedBook;
