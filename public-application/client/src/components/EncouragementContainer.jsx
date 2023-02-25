import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EncouragementContainer.module.css";
import Button from "@mui/material/Button";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    register: "Register for all benefits",
    registerText: "Please register for buying and loaning books",
    btnText: "Register"
  },
  croatian: {
    register: "Registrirajte se",
    registerText: "Registrirajte se kako biste kupovali i posuđivali knjige.",
    btnText: "Registriraj se"
  }
}

function EncouragementContainer() {

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.uppercontainer}>{currentLanguage.register}</div>
      <div className={styles.lowercontainer}>
        <p>{currentLanguage.registerText}</p>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/registration")}
        >
          {currentLanguage.btnText}
        </Button>
      </div>
    </div>
  );
}

export default EncouragementContainer;
