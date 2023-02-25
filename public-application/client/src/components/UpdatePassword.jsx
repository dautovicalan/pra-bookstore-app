import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../context/AuthContextCustomer";
import { Stack } from "@mui/material";
import styles from '../styles/UpdatePassword.module.css';
import Swal from 'sweetalert2'
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    password: "Password",
    repeatPassword: "Repeat password",
    btnSubmit: "Change password",
    btnCancel: "Cancel",
    error: "Passwords do not match",
    swalTitle: "Success",
    swalText: "You changed your password"
  },
  croatian: {
    password: "Zaporka",
    repeatPassword: "Ponovi zaporku",
    btnSubmit: "Promijeni zaporku",
    btnCancel: "Odustani",
    error: "Zaproke nisu iste",
    swalTitle: "Uspjeh",
    swalText: "Uspjesno ste promijenili zaporku"
  }
}

const UpdatePassword = ({setFormVisible}) => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateCustomerPassword } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== repeatPassword) {
      setIsLoading(false);
      return setError(currentLanguage.error);
    }

      updateCustomerPassword(password).then(() => {
        Swal.fire({
          title: currentLanguage.swalTitle,
          text: currentLanguage.swalText,
          icon: "success",
          confirmButtonText: "Cool"
        })
        setPassword("");
        setRepeatPassword("");
        setFormVisible(null);
      }).catch((error) => {
        console.log(error);
        setError("Please logout and login again");
      })
      
    setIsLoading(false);
  };

  return (
    <form onSubmit={submitHandler} className={styles.update_password_form}>
      <TextField
        label={currentLanguage.password}
        variant="outlined"
        type="password"
        required
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label={currentLanguage.repeatPassword}
        variant="outlined"
        type="password"
        required
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" type="submit" disabled={isLoading}>
          {currentLanguage.btnSubmit}
        </Button>
        <Button variant="contained" color="error" onClick={() => setFormVisible(null)}>
          {currentLanguage.btnCancel}
        </Button>
      </Stack>
      {isLoading && <CircularProgress />}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </form>
  );
};

export default UpdatePassword;
