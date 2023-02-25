import React from "react";
import styles from "../styles/HomePage.module.css";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    welcomeHeader: "Welcome to first virtual library in Croatia",
    instructionsParagraph:
      "For navigation through out the application please use the navigation bar, and for buying or loaning the books log in or create an account",
  },
  croatian: {
    welcomeHeader: "Dobrodošli u prvu virtualnu knjižaru u Hrvatskoj",
    instructionsParagraph:
      "Za navigaciju kroz aplikaciju koristite navigacijsku traku, a za kupovinu ili posudbu knjiga ulogiraj te se ili kreirajte korisnički račun",
  },
};

const HomePage = () => {

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  return (
    <div className={styles.main_image_container}>
      <h2>{currentLanguage.welcomeHeader}</h2>
      <p>
        {currentLanguage.instructionsParagraph}
      </p>
      <img src="https://media.istockphoto.com/photos/wooden-brown-books-shelves-with-a-lamp-picture-id1085770318?k=20&m=1085770318&s=612x612&w=0&h=1MmiueCOCEEjQOGDLuUHAonGuFZQFz2BOicOs0cK1cY=" />
    </div>
  );
};

export default HomePage;
