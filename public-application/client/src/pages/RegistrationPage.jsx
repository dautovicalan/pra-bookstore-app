import React, { useState } from "react";
import styles from "../styles/RegistrationPage.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../context/AuthContextCustomer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";
import { useEffect } from "react";

const language = {
  english: {
    hdrRegistration: "Registration",
    txtName: "Name",
    txtPrezime: "Surname",
    swalTitle: "Success",
    txtPassword: "Password",
    txtRepPassword: "Repeat password",
    swalText: "Success creating an account. You can now login",
    errPassword: "Passwords do not match",
    lblAcceptTerms: "I accept terms and conditions",
    btnReg: "Register",
  },
  croatian: {
    hdrRegistration: "Registracija",
    txtName: "Ime",
    txtPrezime: "Prezime",
    txtPassword: "Zaporka",
    txtRepPassword: "Ponovite zaporku",
    swalTitle: "Uspjeh",
    swalText: "Uspjesno kreiran account. Mozete se ulogirat",
    errPassword: "Zaporke se ne podudaraju",
    lblAcceptTerms: "Prihvacam uvjete koristenja",
    btnReg: "Registriraj se",
  },
};

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const navigate = useNavigate();

  const { currentUser, register } = useAuth();

  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, []);

  const submitHanlder = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      return setError(currentLanguage.errPassword);
    }

    setError(null);
    setIsLoading(true);

    const result = await register(registerEmail, password, firstName, lastName);
    const data = await result.json();

    if (!data.error) {
      setIsLoading(false);
      Swal.fire({
        title: currentLanguage.swalTitle,
        text: currentLanguage.swalText,
        icon: "success",
        confirmButtonText: "Cool",
      });
      return navigate("/login");
    }
    setIsLoading(false);
    setError(data.error);
  };

  return (
    <form className={styles.forma} onSubmit={submitHanlder}>
      <h2>{currentLanguage.hdrRegistration}</h2>
      <TextField
        id="outlined-basic"
        label={currentLanguage.txtName}
        variant="outlined"
        required
        autoFocus
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label={currentLanguage.txtPrezime}
        variant="outlined"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="E-mail"
        type="email"
        variant="outlined"
        required
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label={currentLanguage.txtPassword}
        type="password"
        variant="outlined"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label={currentLanguage.txtRepPassword}
        type="password"
        variant="outlined"
        required
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox required />}
        label={currentLanguage.lblAcceptTerms}
      />
      <Button
        variant="contained"
        color="success"
        type="submit"
        disabled={isLoading}
      >
        {currentLanguage.btnReg}
      </Button>
      {isLoading && <CircularProgress />}
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
    </form>
  );
};

export default RegistrationPage;
