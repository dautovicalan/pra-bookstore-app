import { Modal } from "react-bootstrap";
import { Stack, Button } from "@mui/material";
import { useAuth } from "../context/AuthContextCustomer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    modalTitle: "Profile delete",
    modalBody: "Are you sure you want to delete your profile?",
    btnYes: "Yes, I am",
    btnNo: "No",
    swalTitle: "Success",
    swalText: "You deleted your profile. We are sad that you are going",
  },
  croatian: {
    modalTitle: "Brisanje profila",
    modalBody: "Jeste li sigurni da zelite izbrisati profil?",
    btnYes: "Jesam, siguran sam",
    btnNo: "Ne",
    swalTitle: "Uspjeh",
    swalText: "Uspjesno ste obrisali svoj profil. Zao nam je sto odlazite",
  },
};

function ModalWindow({ setFormVisible, visible }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const { languageId } = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const [isLoading, setIsLoading] = useState();

  const clickHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setIsLoading(false);
    setFormVisible(false);
    await logout();
    const response = await fetch("/api/customer/deleteCustomer", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify({
        userUid: currentUser.uid,
        userEmail: currentUser.email,
      }),
    });

    const data = await response.json();
    setIsLoading(false);
    setFormVisible(false);
    Swal.fire({
      title: currentLanguage.swalTitle,
      text: currentLanguage.swalText,
      icon: "success",
      confirmButtonText: "Ok",
    });
    return navigate("/login");
  };

  return (
    <>
      <Modal
        show={visible}
        onHide={() => setFormVisible((prevValue) => !prevValue)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{currentLanguage.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{currentLanguage.modalBody}</Modal.Body>
        <Modal.Footer>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setFormVisible((prevValue) => !prevValue)}
              disabled={isLoading}
            >
              {currentLanguage.btnNo}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={clickHandler}
              disabled={isLoading}
            >
              {currentLanguage.btnYes}
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow;
