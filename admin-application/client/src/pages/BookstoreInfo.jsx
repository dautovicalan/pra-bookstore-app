import React from "react";
import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "../styles/BookstoreInfo.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { async } from "@firebase/util";
import Swal from 'sweetalert2'


const BookstoreInfo = () => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [postNumber, setPostNumber] = useState("");
  const [city, setCity] = useState("");
  const [iban, setIban] = useState("");
  const [oib, setOib] = useState("");

  const [visible, setVisible] = useState(false);

  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api-admin/bookstore/get-infos");
      const result = await response.json();
      setData(result);
    }
    getData();
  }, []);

  console.log(data);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("/api-admin/bookstore/update-infos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, street, postNumber, city, iban, oib, id: data[0]._id})            
        });
        const result = await response.json();
        Swal.fire({
          title: "Uspjeh",
          text: "Uspjesno ste promijenili adresu",
          icon: "success",
          confirmButtonText: "Cool"
        })
        console.log(result)
        setVisible(false);
    } catch (error) {
        console.log(error);
    }

  };

  return (
    <div className={styles.main_container}>
      {data && (
        <div className={styles.info_container}>
          <img />
          <h4>Name: {data[0].name}</h4>
          <address>
            {data[0].street}
            <br />
            {data[0].postNumber}
            <br />
            {data[0].city}
          </address>
          <p>IBAN: {data[0].iban}</p>
          <p>OIB: {data[0].oib}</p>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
                setVisible((prevVal) => !prevVal);
                setName(data[0].name);
                setStreet(data[0].street);
                setPostNumber(data[0].postNumber);
                setCity(data[0].city);
                setIban(data[0].iban);
                setOib(data[0].oib);
            }}
          >
            Edit details
          </Button>
        </div>
      )}
      {visible && (
        <div className={styles.form_container}>
          <form onSubmit={submitHandler}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
              focused
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              id="outlined-basic"
              label="Street and Number"
              variant="outlined"
              required
              onChange={(e) => setStreet(e.target.value)}
              value={street}
            />
            <TextField
              id="outlined-basic"
              label="Postnumber"
              variant="outlined"
              required
              onChange={(e) => setPostNumber(e.target.value)}
              value={postNumber}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              required
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <TextField
              id="outlined-basic"
              label="IBAN"
              variant="outlined"
              required
              onChange={(e) => setIban(e.target.value)}
              value={iban}
            />
            <TextField
              id="outlined-basic"
              label="OIB"
              variant="outlined"
              required
              onChange={(e) => setOib(e.target.value)}
              value={oib}
            />
            <Stack spacing={2} direction="row">
              <Button variant="contained" color="success" type="submit">
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setVisible(false)}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookstoreInfo;
