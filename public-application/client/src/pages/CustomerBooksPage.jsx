import React from "react";
import styles from "../styles/CustomerBooksPage.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContextCustomer";
import PurchasedBook from "../components/PurchasedBook";
import LoanedBook from "../components/LoanedBook";
import { async } from "@firebase/util";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";
import moment from "moment";
import Swal from "sweetalert2";

const language = {
  english: {
    boughtBooksLabel: "Bought books",
    noPurchasedBooksLabel: "No purchased books",
    loansLabel: "Loans:",
    noLoanedBooksLabel: "No loaned books",
    swalTitle: "The return date is getting closer for this books",
  },
  croatian: {
    boughtBooksLabel: "Kupljene knjige",
    noPurchasedBooksLabel: "Nema kupljenih knjiga",
    loansLabel: "Posudbe:",
    noLoanedBooksLabel: "Nema posuđenih knjiga",
    swalTitle: "Blizi se rok vracnja za ove knjige",
  },
};

const CustomerBooksPage = () => {
  const { currentUser } = useAuth();

  const { languageId } = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const [purchasedBooks, setPurchasedBooks] = useState();
  const [loanedBooks, setLoanedBooks] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const fetchData = async () => {
      const purchasedBooksResponse = await fetch("/api/books/purchased-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify({ userUid: currentUser.uid }),
      });

      const purchasedBooksData = await purchasedBooksResponse.json();

      if (purchasedBooksData.error) {
        return setPurchasedBooks(null);
      }
      setPurchasedBooks(purchasedBooksData);
      setIsLoading(false);
    };

    const fetchLoanedBooks = async () => {
      const loanedBooksResponse = await fetch("/api/books/loaned-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify({ userUid: currentUser.uid }),
      });

      const loanedBooksData = await loanedBooksResponse.json();

      let nearReturnBooks = [];

      loanedBooksData.forEach((element) => {
        let a = moment(element.loanDateEnd);
        let b = moment(Date.now());

        let test = moment(new Date("2022-07-25"));

        let result = a.diff(test, "days");

        if (result < 5) {
          nearReturnBooks.push(element);
        }
      });

      if (nearReturnBooks.length !== 0) {
        Swal.fire({
          title: currentLanguage.swalTitle,
          text: nearReturnBooks
            .map((element) => element.bookId.name)
            .toString(),
          icon: "info",
          confirmButtonText: "OK",
        });
      }

      if (loanedBooksData.error) {
        return setLoanedBooks(null);
      }
      setLoanedBooks(loanedBooksData);
      setIsLoading(false);
    };

    fetchData();
    fetchLoanedBooks();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.loan_books_container}>
        <h2>{currentLanguage.loansLabel}</h2>
        <div className={styles.loanBooks}>
          {loanedBooks && loanedBooks.length != 0 ? (
            loanedBooks.map((element) => {
              return (
                <LoanedBook
                  bookData={element.bookId}
                  loanDateStart={element.loanDateStart}
                  loanDateEnd={element.loanDateEnd}
                  loanDuration={element.loanDuration}
                  key={element._id}
                />
              );
            })
          ) : (
            <h2>{currentLanguage.noPurchasedBooksLabel}</h2>
          )}
        </div>
      </div>
      <div className={styles.buyed_books_container}>
        <h2>{currentLanguage.boughtBooksLabel}</h2>
        <div className={styles.buyedBooks}>
          {purchasedBooks && purchasedBooks.length != 0 ? (
            purchasedBooks.map((element) => {
              return (
                <PurchasedBook
                  key={element._id}
                  bookData={element.bookId}
                  price={element.price}
                  purchaseDate={element.purchaseDate}
                />
              );
            })
          ) : (
            <h2>{currentLanguage.noLoanedBooksLabel}</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerBooksPage;
