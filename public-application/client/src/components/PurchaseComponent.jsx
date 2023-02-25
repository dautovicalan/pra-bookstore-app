import React, { useRef } from "react";
import styles from "../styles/PurchaseComponent.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import PayPal from "./PayPal";
import { handlePurchaseEmail } from "../functions/handlePurchaseEmail";
import { useAuth } from "../context/AuthContextCustomer";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    swalTitle: "Payment successful",
    swalText:
      "You successfuly bought a book. Confirmation will be sent to your email.",
    lblPayMeth: "Choose payment method:",
    lblOnArr: "On arrival",
    lblAcceptTerms: "",
    pCijena: "Price for purchase:",
    lblAcceptTerms: "I accept terms and conditions",
    btnBuy: "Buy",
    addressStuff: "Please fill your address data in profile settings",
  },
  croatian: {
    swalTitle: "Uspješna kupovina",
    swalText: "Uspješno ste kupili knjigu. Potvrda stiže na email.",
    lblPayMeth: "Izaberite način plaćanja",
    lblOnArr: "Pri preuzimanju",
    pCijena: "Cijena za kupovinu:",
    lblAcceptTerms: "Prihvaćam uvjete korištenja",
    btnBuy: "Kupi",
    addressStuff: "Molimo postavite adresu na svom profilu",
  },
};

const PurchaseComponent = ({
  bookName,
  bookPrice,
  setFormToRender,
  bookId,
}) => {
  const { languageId } = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const [checkOut, setCheckOut] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");

  const { currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("hello");
    if (selectedItem !== "priPreuzimanju") {
      setIsLoading(false);

      return setCheckOut((prevValue) => !prevValue);
    }
    const data = await handlePurchaseEmail(
      currentUser,
      bookId,
      bookPrice,
      "PREUZIMANJE"
    );
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
    <div className={styles.purchase_container}>
      <form onSubmit={submitHandler}>
        <FormLabel id="demo-radio-buttons-group-label">
          {currentLanguage.lblPayMeth}
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
            label={currentLanguage.lblOnArr}
          />
          <FormControlLabel
            value="PayPal"
            control={<Radio required />}
            label="PayPal"
          />
        </RadioGroup>
        <p className={styles.cijena}>
          {currentLanguage.pCijena}{" "}
          <span className={styles.actualPrice}>{bookPrice} KN</span>
        </p>
        <FormControlLabel
          control={<Checkbox required />}
          label={currentLanguage.lblAcceptTerms}
        />
        {selectedItem === "PayPal" && checkOut ? (
          <PayPal
            setCheckOut={setCheckOut}
            bookName={bookName}
            bookPrice={bookPrice}
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
            {currentLanguage.btnBuy}
          </Button>
        )}

        {isLoading && <CircularProgress />}
      </form>
    </div>
  );
};

export default PurchaseComponent;
