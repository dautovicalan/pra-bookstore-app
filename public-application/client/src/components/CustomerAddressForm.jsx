import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import style from "../styles/CustomerAddressForm.module.css";
import Swal from 'sweetalert2'
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../context/AuthContextCustomer";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    name: "Name",
    surname: "Surname",
    address: "Address",
    postalNumber: "Post Number",
    city: "City",
    btnText: "Change",
    btnCancel: "Cancel",
    swalText: "Successfuly changed profile infos. For new name please refresh site",
    swalTitle: "Success",
    error: "Please fill all data"
  },
  croatian: {
    name: "Ime",
    surname: "Prezime",
    address: "Adresa",
    postalNumber: "Postanski broj",
    city: "Grad",
    btnText: "Promjeni",
    btnCancel: "Odustani",
    swalText: "Uspjesno ste promijenili adresu. Za prikaz novog imena napravite refresh stranice",
    swalTitle: "Uspjeh",
    error: "Molimo popunite sva polja"
  }
}

const CustomerAddressForm = ({ setFormVisible, customer, setAddressData, addressData }) => {

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [postalNumber, setPostalNumber] = useState("");
  const [city, setCity] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {updateCustomerProfile} = useAuth();


  const submitHandler = async (e) => {
    e.preventDefault();
    if (address === "" || postalNumber === "" || city === "" || name === "" || surname === "") {
      setError(currentLanguage.error);
      return;
    }
    setError(null);
    
    setIsLoading(true);

    try {
      await updateCustomerProfile(name, surname);

      const result = await fetch("/api/customer/updateCustomerAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${customer.accessToken}`
        },
        body: JSON.stringify({
          userUid: customer.uid,
          streetAddress: address,
          postNumber: postalNumber,
          cityName: city,
        }),
      });
  
      const data = await result.json();
      if (!data.error) {
        setIsLoading(false);
        setAddressData(data);
        setFormVisible(null);      
        return Swal.fire({
          title: currentLanguage.swalTitle,
          text: currentLanguage.swalText,
          icon: "success",
          confirmButtonText: "Cool"
        })
      }      
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);  
  };

  return (
    <form className={style.address_form} onSubmit={submitHandler}>
      <TextField
        autoFocus
        id="outlined-basic"
        label={currentLanguage.name}
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label={currentLanguage.surname}
        variant="outlined"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label={currentLanguage.address}
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label={currentLanguage.postalNumber}
        variant="outlined"
        value={postalNumber}
        onChange={(e) => setPostalNumber(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label={currentLanguage.city}
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <Stack direction="row" spacing={2}>
        <Button color="success" variant="contained" type="submit" disabled={isLoading}>
          {currentLanguage.btnText}
        </Button>
        <Button
          color="error"
          variant="outlined"
          disabled={isLoading}
          onClick={() => setFormVisible(null)}
        >
          {currentLanguage.btnCancel}
        </Button>
      </Stack>
      {isLoading && <CircularProgress />}
        {error && (
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        )}
    </form>
  );
};

export default CustomerAddressForm;
