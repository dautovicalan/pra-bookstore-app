import { Modal } from "react-bootstrap";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2'

function ModalWindow({ setFormVisible, setDeletingBookId, visible, bookId, setAllBooks }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState();

  const clickHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const response = await fetch(`/api-admin/books/delete-book/${bookId}`, {
            method: "DELETE"
        });
        const result = await response.json();
        if (!result?.error) {
            setIsLoading(false);
            setFormVisible(false);
            setDeletingBookId(null);
            setAllBooks(result);
            return Swal.fire({
                title: 'Success!',
                text: result.message,
                icon: 'success',
                confirmButtonText: 'Cool'
              })
        }
    } catch (error) {
        console.log(error);
    }
    setIsLoading(false);
    
  };

  console.log(bookId);
  return (
    <>
      <Modal
        show={visible}
        onHide={() => setFormVisible((prevValue) => !prevValue)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Brisanje knjige</Modal.Title>
        </Modal.Header>
        <Modal.Body>Jeste li sigurni da želite obrisati knjigu?</Modal.Body>
        <Modal.Footer>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setFormVisible((prevValue) => !prevValue);
                setDeletingBookId(null);
              }}
              disabled={isLoading}
            >
              Odustani
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={clickHandler}
              disabled={isLoading}
            >
              Da, siguran sam!
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow;
