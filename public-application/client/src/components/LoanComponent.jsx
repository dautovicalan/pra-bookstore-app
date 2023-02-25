import React from "react";
import styles from "../styles/LoanComponent.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { handleLoanEmail } from "../functions/handlePurchaseEmail";
import { useAuth } from "../context/AuthContextCustomer";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import LoanPayPal from "./LoanPayPal";
import { handlePurchaseEmail } from "../functions/handlePurchaseEmail";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    currentDate: "Current date",
    weekNumber: "Week number",
    week: "week",
    returnDate: "Return date",
    paymentMethod: "Payment method",
    preuzimanje: "On arival",
    price: "Price",
    conditions: "Accept Terms and Conditions",
    btnLoan: "Loan",
    swalTitle: "Success",
    swalText: "You loaned the book",
    swalErrTitle: "Error",
    swalErrText: "Cannot have more then 3 loans at the same time",
    addressStuff: "Please fill your address data in profile settings",
  },
  croatian: {
    currentDate: "Trenutni datum",
    weekNumber: "Broj tjedana",
    week: "tjedana",
    returnDate: "Datum vracanja",
    paymentMethod: "Nacin placanja",
    preuzimanje: "Preuzimanje",
    price: "Cijena",
    conditions: "Prihvacam uvjete koristenja",
    btnLoan: "Posudi",
    swalTitle: "Uspjeh",
    swalText: "Uspjesno ste posudili knjigu",
    swalErrTitle: "Greska",
    swalErrText: "Ne mozete imati vise od 3 knjige",
    addressStuff: "Molimo postavite adresu na svom profilu",
  },
};

const LoanComponent = ({ bookId, setFormToRender, bookName, bookPrice }) => {
  const { languageId } = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const [weekNumber, setWeekNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [checkOut, setCheckOut] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");

  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setWeekNumber(e.target.value);
  };

  const weekDateAdder = (numberOfWeeks) => {
    const dt = new Date();
    dt.setDate(dt.getDate() + numberOfWeeks * 7);
    return dt;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/books/loaned-books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify({
        userUid: currentUser.uid,
      }),
    });

    const loanedBooks = await response.json();

    if (loanedBooks && loanedBooks?.length === 3) {
      setIsLoading(false);
      return Swal.fire({
        title: currentLanguage.swalErrTitle,
        text: currentLanguage.swalErrText,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    if (selectedItem !== "priPreuzimanju") {
      setIsLoading(false);
      return setCheckOut((prevValue) => !prevValue);
    }
    const data = await handleLoanEmail(
      currentUser,
      bookId,
      weekNumber,
      bookPrice,
      "PREUZIMANJE"
    );

    console.log(data);
    setIsLoading(false);
    Swal.fire({
      title: currentLanguage.swalTitle,
      text: currentLanguage.swalText,
      icon: "success",
      confirmButtonText: "Cool",
    });
    setIsLoading(false);
    setFormToRender(null);
  };

  return (
    <div className={styles.loan_container}>
      <p>
        {currentLanguage.currentDate}: {new Date().toDateString()}
      </p>
      <form onSubmit={submitHandler}>
        <InputLabel id="week-number">{currentLanguage.weekNumber}</InputLabel>
        <Select
          labelId="week-number"
          value={weekNumber}
          label={currentLanguage.weekNumber}
          onChange={handleChange}
          required
        >
          <MenuItem value={2}>2 {currentLanguage.week}</MenuItem>
          <MenuItem value={3}>3 {currentLanguage.week}</MenuItem>
          <MenuItem value={4}>4 {currentLanguage.week}</MenuItem>
        </Select>
        <p>
          {currentLanguage.returnDate}:{" "}
          {weekDateAdder(weekNumber).toDateString()}
        </p>
        <FormLabel id="demo-radio-buttons-group-label">
          {currentLanguage.paymentMethod}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <FormControlLabel
            value="priPreuzimanju"
            control={<Radio required />}
            label={currentLanguage.preuzimanje}
          />
          <FormControlLabel
            value="PayPal"
            control={<Radio required />}
            label="PayPal"
          />
        </RadioGroup>
        <p className={styles.cijena}>
          {currentLanguage.price}:{" "}
          <span className={styles.actualPrice}>{bookPrice} KN</span>
        </p>
        <FormControlLabel
          control={<Checkbox required />}
          label={currentLanguage.conditions}
        />
        {selectedItem === "PayPal" && checkOut ? (
          <LoanPayPal
            setCheckOut={setCheckOut}
            loanDuration={weekNumber}
            bookName={bookName}
            loanPrice={bookPrice}
            setFormToRender={setFormToRender}
            bookId={bookId}
          />
        ) : (
          <Button
            variant="contained"
            className={styles.buyButton}
            color="success"
            type="submit"
            disabled={isLoading}
          >
            {currentLanguage.btnLoan}
          </Button>
        )}
        {isLoading && <CircularProgress />}
      </form>
    </div>
  );
};

export default LoanComponent;
