import React, { useEffect } from "react";
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
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { useNavigate } from "react-router-dom";

const publicKey = "public_dwFW+ZSfUrtITQDROUNoJATDjH8=";
const authenticationEndpoint = "http://localhost:5000/auth";
const urlEndpoint = " https://ik.imagekit.io/w9ea8djcn/";

const AddBookPage = () => {
  const [name, setName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [pagesNumber, setPagesNumber] = useState("");
  const [price, setPrice] = useState("");
  const [loanPrice, setLoanPrice] = useState("");
  const [publisher, setPublisher] = useState("");
  const [uploadedPicture, setUploadedPicture] = useState(null);
  const [isNew, setisNew] = useState("yes");
  const [lagerCount, setLagerCount] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const [loading, setLoading] = useState(false);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    setisNew(event.target.value);
  };

  console.log(isNew);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!uploadedPicture) {
      return Swal.fire({
        title: "Error!",
        text: "Molimo postavite sliku",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    setLoading(true);

    try {
      const response = await fetch("/api-admin/books/create-book", {
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
          pictureUrl: uploadedPicture.url,
          isNew: isNew === "yes" ? true : false,
          lagerCount,
        }),
      });
      const result = await response.json();

      console.log(result);

      Swal.fire({
        title: "Success!",
        text: "Uspjesno kreirana knjiga",
        icon: "success",
        confirmButtonText: "Cool",
      });
      return navigate("/books");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  console.log(loading);

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
        type="number"
        value={lagerCount}
        required
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
          defaultValue="yes"
          name="radio-buttons-group"
          value={isNew}
          onChange={handleChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="DA" />
          <FormControlLabel value="no" control={<Radio />} label="NE" />
        </RadioGroup>
      </FormControl>
      <p className={styles.textPicture}>Dokument slike:</p>
      <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticationEndpoint={authenticationEndpoint}
      >
        <IKUpload
          fileName={`${Date.now()}.png`}
          onError={onError}
          onSuccess={onSuccess}
          onChange={onSelectFile}
          required
        />
      </IKContext>
      {selectedFile && (
        <div>
          <p>Pregled slike</p>
          <img src={preview} width={450} height={100} />
        </div>
      )}
      <Button variant="contained" type="submit" disabled={loading}>
        Dodaj knjigu
      </Button>
    </form>
  );
};

export default AddBookPage;
