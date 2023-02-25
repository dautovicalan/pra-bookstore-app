import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import EncouragementContainer from "../components/EncouragementContainer";
import useFetch from "../hooks/useFetch";
import styles from "../styles/AllBooksPage.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../context/AuthContextCustomer";
import { Stack, Switch, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    searchLabel: "Search",
    byBookName: "By book name",
    byAuthorName: "By authors name",
  },
  croatian: {
    searchLabel: "Pretraži",
    byBookName: "Po imenu knjiga",
    byAuthorName: "Po imenu autora",
  },
};

const AllBooksPage = () => {
  const { data: books, loading, error } = useFetch("/api/books/");
  const { currentUser } = useAuth();

  const {languageId} = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  console.log(books);

  const [displayedBooks, setDisplayedBooks] = useState(books);
  const [bookAuthors, setBookAuthors] = useState();
  const [displayedAuthors, setDisplayedAuthors] = useState();
  const [searched, setSearched] = useState("");

  useEffect(() => {
    setDisplayedBooks(books);

    if (books) {
      const authors = books.map((element) => {
        return element.authorName;
      });

      const uniqueAuthors = [...new Set(authors)];
      setBookAuthors(uniqueAuthors);
      setDisplayedAuthors(uniqueAuthors);
    }
  }, [books]);

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    let filteredRows;

    if (checked) {
      filteredRows = bookAuthors.filter((row) => {
        return row.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setDisplayedAuthors(filteredRows);
    } else {
      filteredRows = books.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setDisplayedBooks(filteredRows);
    }
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    setDisplayedBooks(books);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setSearched("");
    setChecked(event.target.checked);
    setDisplayedBooks(books);
    setDisplayedAuthors(bookAuthors);
  };

  console.log(bookAuthors);

  return (
    <React.Fragment>
      {!currentUser && <EncouragementContainer />}
      <div style={{ padding: "1.5em" }}>
        <TextField
          id="standard-basic"
          label={currentLanguage.searchLabel}
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
          variant="filled"
          fullWidth
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{currentLanguage.byBookName}</Typography>
          <Switch checked={checked} onChange={handleChange} />
          <Typography>{currentLanguage.byAuthorName}</Typography>
        </Stack>
      </div>
      <div className={styles.books_container}>
        {loading && <CircularProgress />}
        {displayedBooks != null &&
          checked === false &&
          displayedBooks.map((singleBook) => {
            return (
              !singleBook.isDeleted && (
                <Book
                  key={singleBook._id}
                  _id={singleBook._id}
                  name={singleBook.name}
                  shortDescription={singleBook.shortDescription}
                  pagesNumber={singleBook.pagesNumber}
                  price={singleBook.price}
                  publisher={singleBook.publisher}
                  pictureUrl={singleBook.pictureUrl}
                  isNew={singleBook.isNew}
                  lagerCount={singleBook.lagerCount}
                />
              )
            );
          })}
        <div className={styles.books_container}>
          {displayedBooks &&
            displayedAuthors != null &&
            checked === true &&
            displayedAuthors.map((singleAuthor) => {
              const filteredBooks = displayedBooks.filter(
                (bookElement) => bookElement.authorName === singleAuthor
              );
              return (
                <div key={singleAuthor} className={styles.author_container}>
                  <h3>{singleAuthor}</h3>
                  <p>Knjige autora:</p>
                  {filteredBooks.map((element) => {
                    return (
                      <div key={element._id}>
                        <Link to={`/books/${element._id}`}>{element.name}</Link>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllBooksPage;
