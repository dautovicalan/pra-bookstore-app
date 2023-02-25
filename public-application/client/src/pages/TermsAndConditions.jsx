import React from "react";
import styles from "../styles/TermsAndConditions.module.css";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const language = {
  english: {
    hdrTermsAndConditions: "Terms and conditions",
    btnBack: "Back to home page",
  },
  croatian: {
    hdrTermsAndConditions: "Opća pravila i uvjeti korištenja",
    btnBack: "Povratak na naslovnu",
  },
};

function TermsAndConditions() {
  const { languageId } = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const navigate = useNavigate();

  return (
    <div className={styles.main_container}>
      <h1>{currentLanguage.hdrTermsAndConditions}</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
        consequuntur sapiente minus delectus rem expedita beatae, ab cumque a,
        nostrum exercitationem quibusdam temporibus sint illo quos natus!
        Facilis, voluptas sed? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Veniam accusantium similique consequuntur sunt quam
        nisi modi ut suscipit facere deserunt cum assumenda, eos ipsa excepturi
        officia, reprehenderit provident porro repudiandae. Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Sequi consequuntur sapiente minus
        delectus rem expedita beatae, ab cumque a, nostrum exercitationem
        quibusdam temporibus sint illo quos natus! Facilis, voluptas sed? Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Veniam accusantium
        similique consequuntur sunt quam nisi modi ut suscipit facere deserunt
        cum assumenda, eos ipsa excepturi officia, reprehenderit provident porro
        repudiandae. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Sequi consequuntur sapiente minus delectus rem expedita beatae, ab
        cumque a, nostrum exercitationem quibusdam temporibus sint illo quos
        natus! Facilis, voluptas sed? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Veniam accusantium similique consequuntur sunt quam
        nisi modi ut suscipit facere deserunt cum assumenda, eos ipsa excepturi
        officia, reprehenderit provident porro repudiandae. Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Sequi consequuntur sapiente minus
        delectus rem expedita beatae, ab cumque a, nostrum exercitationem
        quibusdam temporibus sint illo quos natus! Facilis, voluptas sed? Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Veniam accusantium
        similique consequuntur sunt quam nisi modi ut suscipit facere deserunt
        cum assumenda, eos ipsa excepturi officia, reprehenderit provident porro
        repudiandae.
        <br />
        <br />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
        consequuntur sapiente minus delectus rem expedita beatae, ab cumque a,
        nostrum exercitationem quibusdam temporibus sint illo quos natus!
        Facilis, voluptas sed? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Veniam accusantium similique consequuntur sunt quam
        nisi modi ut suscipit facere deserunt cum assumenda, eos ipsa excepturi
        officia, reprehenderit provident porro repudiandae.Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Sequi consequuntur sapiente minus
        delectus rem expedita beatae, ab cumque a, nostrum exercitationem
        quibusdam temporibus sint illo quos natus! Facilis, voluptas sed? Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Veniam accusantium
        similique consequuntur sunt quam nisi modi ut suscipit facere deserunt
        cum assumenda, eos ipsa excepturi officia, reprehenderit provident porro
        repudiandae.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Sequi consequuntur sapiente minus delectus rem expedita beatae, ab
        cumque a, nostrum exercitationem quibusdam temporibus sint illo quos
        natus! Facilis, voluptas sed? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Veniam accusantium similique consequuntur sunt quam
        nisi modi ut suscipit facere deserunt cum assumenda, eos ipsa excepturi
        officia, reprehenderit provident porro repudiandae.Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Sequi consequuntur sapiente minus
        delectus rem expedita beatae, ab cumque a, nostrum exercitationem
        quibusdam temporibus sint illo quos natus! Facilis, voluptas sed? Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Veniam accusantium
        similique consequuntur sunt quam nisi modi ut suscipit facere deserunt
        cum assumenda, eos ipsa excepturi officia, reprehenderit provident porro
        repudiandae.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Sequi consequuntur sapiente minus delectus rem expedita beatae, ab
        cumque a, nostrum exercitationem quibusdam temporibus sint illo quos
        natus! Facilis, voluptas sed? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Veniam accusantium similique consequuntur sunt quam
        nisi modi ut suscipit facere deserunt cum assumenda, eos ipsa excepturi
        officia, reprehenderit provident porro repudiandae.Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Sequi consequuntur sapiente minus
        delectus rem expedita beatae, ab cumque a, nostrum exercitationem
        quibusdam temporibus sint illo quos natus! Facilis, voluptas sed? Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Veniam accusantium
        similique consequuntur sunt quam nisi modi ut suscipit facere deserunt
        cum assumenda, eos ipsa excepturi officia, reprehenderit provident porro
        repudiandae.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Sequi consequuntur sapiente minus delectus rem expedita beatae, ab
        cumque a, nostrum exercitationem quibusdam temporibus sint illo quos
        natus! Facilis, voluptas sed? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Veniam accusantium similique consequuntur sunt quam
        nisi modi ut suscipit facere deserunt cum assumenda, eos ipsa excepturi
        officia, reprehenderit provident porro repudiandae.Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Sequi consequuntur sapiente minus
        delectus rem expedita beatae, ab cumque a, nostrum exercitationem
        quibusdam temporibus sint illo quos natus! Facilis, voluptas sed? Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Veniam accusantium
        similique consequuntur sunt quam nisi modi ut suscipit facere deserunt
        cum assumenda, eos ipsa excepturi officia, reprehenderit provident porro
        repudiandae.
      </p>
      <Button variant="contained" color="success" onClick={() => navigate("/")}>
        Go back Home
      </Button>
    </div>
  );
}

export default TermsAndConditions;
