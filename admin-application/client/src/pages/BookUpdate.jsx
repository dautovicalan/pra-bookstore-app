import React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styles from "../styles/AddBookPage.module.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";

const publicKey = "public_dwFW+ZSfUrtITQDROUNoJATDjH8=";
const authenticationEndpoint = "http://localhost:5000/auth";
const urlEndpoint = " https://ik.imagekit.io/w9ea8djcn/";

const BookUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBookData() {
      const response = await fetch(`/api-admin/books/get-book/${id}`);

      if (response.status === 400) {
        Swal.fire({
          title: "Error!",
          text: "Knjiga ne postoji",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return navigate("/books");
      }

      const result = await response.json();

      console.log(result);

      setName(result.name);
      setPagesNumber(result.pagesNumber);
      setIsbn(result.isbn);
      setShortDescription(result.shortDescription);
      setPrice(result.price);
      setLoanPrice(result.loanPrice);
      setPublisher(result.publisher);
      setPictureUrl(result.pictureUrl);
      setAuthorName(result.authorName);
      setLagerCount(result.lagerCount);
      setIsNew(result.isNew);
    }

    getBookData();
  }, []);

  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [pagesNumber, setPagesNumber] = useState("");
  const [price, setPrice] = useState("");
  const [loanPrice, setLoanPrice] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [lagerCount, setLagerCount] = useState("");
  const [isNew, setIsNew] = useState(true);

  const [loading, setLoading] = useState(false);

  const [uploadedPicture, setUploadedPicture] = useState(null);

  const handleChange = (event) => {
    setIsNew(event.target.value === "yes" ? true : false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api-admin/books/update-book/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          authorName,
          isbn,
          shortDescription,
          pagesNumber,
          price,
          loanPrice,
          publisher,
          lagerCount,
          isNew,
          pictureUrl: uploadedPicture?.url,
        }),
      });

      const result = await response.json();

      Swal.fire({
        title: "Success!",
        text: "Uspjesno updateana knjiga",
        icon: "success",
        confirmButtonText: "Cool",
      });

      return navigate("/books");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onSuccess = (res) => {
    Swal.fire({
      title: "Success!",
      text: "Uspjesno uploadana knjiga",
      icon: "success",
      confirmButtonText: "Cool",
    });
    setUploadedPicture(res);
  };

  return (
    <form className={styles.formica} onSubmit={submitHandler}>
      <TextField
        label="Naslov:"
        variant="outlined"
        required
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Ime autora:"
        variant="outlined"
        required
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
      />
      <TextField
        label="ISBN Broj:"
        variant="outlined"
        required
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <TextField
        label="Sadržaj:"
        variant="outlined"
        required
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />
      <TextField
        label="Broj stranica:"
        variant="outlined"
        required
        type="number"
        value={pagesNumber}
        onChange={(e) => setPagesNumber(e.target.value)}
      />
      <TextField
        label="Izdavač:"
        variant="outlined"
        required
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
      />
      <TextField
        label="Cijena za kupovinu:"
        variant="outlined"
        required
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Cijena za najam:"
        variant="outlined"
        required
        type="number"
        value={loanPrice}
        onChange={(e) => setLoanPrice(e.target.value)}
      />
      <TextField
        label="Dostupnost:"
        variant="outlined"
        required
        value={lagerCount}
        type="number"
        onChange={(e) => setLagerCount(e.target.value)}
      />
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          className={styles.lastLabel}
        >
          Nova knjiga:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={isNew ? "yes" : "no"}
          onChange={handleChange}
          name="radio-buttons-group"
        >
          <FormControlLabel value="yes" control={<Radio />} label="DA" />
          <FormControlLabel value="no" control={<Radio />} label="NO" />
        </RadioGroup>
      </FormControl>
      <p className={styles.textPicture}>Nova slika:</p>
      <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticationEndpoint={authenticationEndpoint}
      >
        <IKUpload
          fileName={`${Date.now()}.png`}
          onError={onError}
          onSuccess={onSuccess}
        />
      </IKContext>
      <p>Trenutna slika</p>
      <img src={pictureUrl} alt="Nema" />
      <Button variant="contained" type="submit" disabled={loading}>
        Update knjigu
      </Button>
    </form>
  );
};

export default BookUpdate;
