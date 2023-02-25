import React from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/BookDetails.module.css";
import useFetch from "../hooks/useFetch";
import { Button, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LoanComponent from "../components/LoanComponent";
import { useState } from "react";
import PurchaseComponent from "../components/PurchaseComponent";
import { useAuth } from "../context/AuthContextCustomer";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const language = {
  english: {
    smthWrongLabel: "Something went wrong",
    nameLabel: "Name:",
    surnameLabel: "Surname:",
    summaryLabel: "Summary:",
    pageNumberLabel: "Number of pages:",
    priceLabel: "Price for buy:",
    priceLoanLabel: "Price for loan",
    publisherLabel: "Publisher:",
    btnBuy: "Buy",
    btnLoan: "Loan",
    lagerCount: "Stock:",
    logInLabel: "For buying or loaning a book you have to login",
    authorLabel: "Author:",
  },
  croatian: {
    smthWrongLabel: "Nešto je pošlo po zlu",
    nameLabel: "Ime:",
    surnameLabel: "Prezime:",
    summaryLabel: "Kratak sadržaj:",
    pageNumberLabel: "Broj stranica:",
    priceLabel: "Cijena za kupovinu:",
    priceLoanLabel: "Cijena za posudbu",
    publisherLabel: "Izdavač:",
    btnBuy: "Kupi",
    btnLoan: "Posudi",
    lagerCount: "Dostupnost:",
    logInLabel: "Za kupovinu ili posudbu ulogiraj te se",
    authorLabel: "Autor:",
  },
};

const BookDetails = () => {
  const { id } = useParams();
  const [formToRender, setFormToRender] = useState();

  const { languageId } = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const [singleBook, setSingleBook] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { currentUser } = useAuth();

  console.log(currentUser);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/books/${id}`);
        const data = await response.json();
        console.log(data);
        setSingleBook(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className={styles.bookdetails_container}>
        {loading && <CircularProgress />}
        {error ? (
          <h2>{currentLanguage.smthWrongLabel}</h2>
        ) : (
          singleBook && (
            <div className={styles.book_information}>
              <img
                src={singleBook?.pictureUrl}
                alt="Nema picture"
                width={200}
                height={200}
              />
              <p>
                {currentLanguage.nameLabel} <span>{singleBook?.name}</span>
              </p>
              <p>
                {currentLanguage.authorLabel}{" "}
                <span>{singleBook?.authorName}</span>
              </p>
              <Accordion sx={{ width: "40%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{currentLanguage.summaryLabel}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{singleBook?.shortDescription}</Typography>
                </AccordionDetails>
              </Accordion>
              <p>
                {currentLanguage.pageNumberLabel}{" "}
                <span>{singleBook?.pagesNumber}</span>
              </p>
              <p>
                {currentLanguage.priceLabel} <span>{singleBook?.price} KN</span>
              </p>
              <p>
                {currentLanguage.priceLoanLabel}{" "}
                <span>{singleBook?.loanPrice} KN</span>
              </p>
              <p>
                {currentLanguage.publisherLabel}{" "}
                <span>{singleBook?.publisher}</span>
              </p>
              <p>
                {currentLanguage.lagerCount}{" "}
                <span>{singleBook?.lagerCount}</span>
              </p>
              {currentUser ? (            
                <Stack direction="row" spacing={2}>
                  {singleBook?.lagerCount !== 0 ? (
                    <Button
                      variant="contained"
                      onClick={() =>
                        setFormToRender(
                          <PurchaseComponent
                            bookName={singleBook?.name}
                            bookPrice={singleBook?.price}
                            setFormToRender={setFormToRender}
                            bookId={id}
                          />
                        )
                      }
                    >
                      {currentLanguage.btnBuy}
                    </Button>
                  ) : (
                    <p>Not availible</p>
                  )}
                  {singleBook.lagerCount !== 0 ? (
                    <Button
                      variant="contained"
                      onClick={() =>
                        setFormToRender(
                          <LoanComponent
                            bookId={id}
                            setFormToRender={setFormToRender}
                            bookName={singleBook?.name}
                            bookPrice={singleBook?.loanPrice}
                          />
                        )
                      }
                    >
                      {currentLanguage.btnLoan}
                    </Button>
                  ) : (
                    <p>Not availible</p>
                  )}
                </Stack>
              ) : (
                <p
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "green",
                    fontSize: "1.5em",
                  }}
                >
                  {currentLanguage.logInLabel}
                </p>
              )}
            </div>
          )
        )}
      </div>
      {currentUser && formToRender && formToRender}
    </React.Fragment>
  );
};
export default BookDetails;
