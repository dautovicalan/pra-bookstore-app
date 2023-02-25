import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import styles from "../styles/ContactUsPage.module.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Form } from "react-bootstrap";

const language = {
  english: {
    header: "Send us a message",
    name: {
      label: "Name",
      placeholder: "Please enter your name",
    },
    surname: {
      label: "Surname",
      placeholder: "Please enter your surname",
    },
    email: {
      label: "Email",
      placeholder: "Please enter your Email",
    },
    message: {
      label: "Message",
      placeholder: "Please enter your message",
    },
    send: "Send",
    findUsHere: "You can visit us here",
  },
  croatian: {
    header: "Pošalji nam poruku",
    name: {
      label: "Ime",
      placeholder: "Unesite svoje ime",
    },
    surname: {
      label: "Prezime",
      placeholder: "Unesite svoje Prezime",
    },
    email: {
      label: "E-Mail",
      placeholder: "Unesite svoj E-Mail",
    },
    message: {
      label: "Poruka",
      placeholder: "Unesite svoju Poruka",
    },
    send: "Pošalji",
    findUsHere: "Naša lokacija",
  },
};

const ContactUsPage = () => {
  const { languageId } = useLanguage();
  let selectedLang = selectLanguage(languageId, language);

  console.log(selectedLang.name);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  return (
    <React.Fragment>
      <div style={{marginTop: "15px"}}>
        <h1 style={{textAlign: "center"}}>{selectedLang.header}</h1>
        <form
          data-netlify="true"
          className={styles.form_container}
          method="post"
          name="contact"
          onSubmit="submit"
          action="https://formsubmit.co/59088144edfe935e3e1de72dae1ff28c"
        >
          <input
            type="hidden"
            name="_autoresponse"
            value="We will reach out to you in shortest amount of time"
          ></input>
          <InputLabel htmlFor="name">{selectedLang?.name.label}</InputLabel>
          <TextField
            id="name"
            name="name"
            label={selectedLang?.name.placeholder}
            variant="outlined"
            required
            autoComplete="off"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <InputLabel htmlFor="email">{selectedLang.email.label}</InputLabel>
          <TextField
            id="email"
            label={selectedLang.email.placeholder}
            variant="outlined"
            type="email"
            name="email"
            required
            autoComplete="off"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
          <InputLabel htmlFor="message">
            {selectedLang.message.label}
          </InputLabel>
          <Form.Group className="mb-3">
            <Form.Control
              style={{ resize: "none" }}
              as="textarea"
              rows={5}
              id="message"
              name="message"
              required
              autoComplete="off"
              placeholder={selectedLang.message.placeholder}
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
            />
          </Form.Group>
          <Button variant="contained" endIcon={<SendIcon />} type="submit">
            {selectedLang.send}
          </Button>
        </form>
      </div>
      <div
        style={{
          marginTop: "5em",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: "1.5em",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        <h1>{selectedLang.findUsHere}</h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d355974.401406551!2d15.413781750000007!3d45.810256800000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6d74e265877%3A0x1a4f4eae9fc461c5!2sAlgebra%20University%20College!5e0!3m2!1sen!2shr!4v1656853211941!5m2!1sen!2shr"
          width="90%"
          height="450"
          style={{ margin: "auto", border: "1px solid black" }}
          title="Bookstore PRA06"
        ></iframe>
      </div>
    </React.Fragment>
  );
};

export default ContactUsPage;
