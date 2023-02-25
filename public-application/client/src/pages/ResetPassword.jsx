import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../styles/ResetPassword.module.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContextCustomer";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    swalTitle: "Success",
    swalText: "A reset password link was sent to your email",
    errEmailExists: "The account with given e-mail does not exists",
    pResetPass: "Reset password",
    txtEmail: "Insert email",
    btnChangePass: "Change password",
  },
  croatian: {
    swalTitle: "Uspjeh",
    swalText: "Na email vam je poslan link za resetiranje lozinke",
    errEmailExists: "Račun sa danim e-mailom ne postoji",
    pResetPass: "Resetirajte lozinku",
    txtEmail: "Unesite email",
    btnChangePass: "Promijenite lozinku",
  },
};

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const navigate = useNavigate();

  const { currentUser, resetPassword } = useAuth();

  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, [currentUser]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setError(null);
      setIsLoading(true);
      await resetPassword(email);
      Swal.fire({
        title: currentLanguage.swalTitle,
        text: currentLanguage.swalText,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      setError(currentLanguage.errEmailExists);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.fields}>
      <form onSubmit={submitHandler}>
        <p>{currentLanguage.pResetPass}</p>
        <TextField
          id="outlined-basic"
          label={currentLanguage.txtEmail}
          type="email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={isLoading}
        >
          {currentLanguage.btnChangePass}
        </Button>
        {isLoading && <CircularProgress />}
        {error && (
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
