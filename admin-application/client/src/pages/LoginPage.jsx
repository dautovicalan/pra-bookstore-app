import React, { useEffect, useState } from "react";
import styles from "../styles/LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser, login } = useAuth();

//   useEffect(() => {
//     if (currentUser) {
//       return navigate("/");
//     }
//   }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setIsLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Wrong email or password");
    }
    setIsLoading(false);
  };
  return (
    <div className={styles.login_container}>
      <h2>Login to Bookstore</h2>
      <form onSubmit={submitHandler}>
        <TextField
          label="E-mail adresa"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="success" type="submit">
          Login
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

export default LoginPage;
