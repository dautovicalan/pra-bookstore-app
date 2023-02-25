import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Book.module.css";
import { Button } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    bookName: "Name",
    author: "Author",
    pagesNumber: "Page number",
    status: "New or Old",
    lagerCount: "Stock",
    buttonText: "Buy/Loan",
    noStock: "Book is not availible",
    price: "Price"
  },
  croatian: {
    bookName: "Ime",
    author: "Autor",
    pagesNumber: "Broj stranica",
    status: "Novo ili Rabljeno",
    lagerCount: "Dostupnost",
    buttonText: "Kupi/Posudi",
    noStock: "Knjiga trenutno nije dostupna",
    price: "Cijena"
  }
}

const Book = ({
  _id,
  name,
  shortDescription,
  pagesNumber,
  price,
  publisher,
  pictureUrl,
  isNew,
  lagerCount
}) => {
  const navigate = useNavigate();

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  console.log(currentLanguage);


  return (
    <div className={styles.book_section}>
      <img src={pictureUrl} alt="Slika trenutno ne postoji" />
      <div className={styles.book_information}>
        <h3>{currentLanguage.bookName}: {name}</h3>
        <p>{currentLanguage.author}: {name}</p>
        <p>{currentLanguage.price}: {price}</p>
        <p>{currentLanguage.status}: {isNew ? "Nova" : "Rabljena"}</p>
        <p>{currentLanguage.lagerCount}: {lagerCount}</p>
      </div>
      {lagerCount !== 0 ? (<Button variant="contained" onClick={() => navigate(`/books/${_id}`)}>
        {currentLanguage.buttonText}
      </Button>) : (
        <p>{currentLanguage.noStock}</p>
      )}
    </div>
  );
};

export default Book;
