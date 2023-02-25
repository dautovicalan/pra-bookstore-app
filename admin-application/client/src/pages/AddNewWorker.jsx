import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "../styles/AddNewWorker.module.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const AddNewWorker = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { register, setupProfile } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (passwordRepeat !== password) {
      return setError("Passwords do not match");
    }
    setIsLoading(true);  
    try {
      const response = await register(email, password);
      const responseAgain = await setupProfile(name, surname);

      Swal.fire({
        title: "Uspjeh",
        text: "Uspjesno ste dodali novog zaposlenika",
        icon: "success",
        confirmButtonText: "Cool"
      })
      navigate("/workers");  
    } catch (error) {
      setError(error.message);
    }    

    setIsLoading(false);
  };

  return (
    <form onSubmit={submitHandler} className={styles.add_worker_form}>
      <TextField
        id="outlined-basic"
        label="Ime"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="Prezime"
        variant="outlined"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="E-mail"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="Repeat password"
        type="password"
        variant="outlined"
        value={passwordRepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
        required
      />
      <Button variant="contained" color="success" type="submit">
        Dodaj radnika
      </Button>
      {error && (
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        )}
    </form>
  );
};

export default AddNewWorker;
