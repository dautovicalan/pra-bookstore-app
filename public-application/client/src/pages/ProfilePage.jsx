import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomerAddressForm from "../components/CustomerAddressForm";
import styles from "../styles/ProfilePage.module.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ModalWindow from "../components/ModalWindow";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContextCustomer";
import UpdatePassword from "../components/UpdatePassword";
import Skeleton from "@mui/material/Skeleton";
import { useLanguage } from "../context/LanguageContext";
import selectLanguage from "../functions/selectLanguage";

const language = {
  english: {
    hdrKorPodaci: "User data",
    pIme: "Name:",
    pPrezime: "Surname:",
    pUlicaIBroj: "Street name and number:",
    pPostanski: "Postal broj:",
    pGrad: "City:",
    btnProfilDetalji: "Change profile details",
    btnPromjeniZaporku: "Change password",
    btnObrisiProfil: "Delete profile",
  },
  croatian: {
    hdrKorPodaci: "Korisnicki podaci",
    pIme: "Ime:",
    pPrezime: "Prezime:",
    pUlicaIBroj: "Ulica i broj:",
    pPostanski: "Postanski code:",
    pGrad: "Grad:",
    btnProfilDetalji: "Promijeni profil detalje",
    btnPromjeniZaporku: "Promijeni zaporku",
    btnObrisiProfil: "Obriši profil",
  },
};

const ProfilePage = () => {
  const navigate = useNavigate();

  const { languageId } = useLanguage();
  let currentLanguage = selectLanguage(languageId, language);

  const { currentUser } = useAuth();
  const [addressData, setAddressData] = useState();

  useEffect(() => {
    setAddressData(currentUser);
  }, [currentUser]);

  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);

  const [formToRender, setFormToRender] = useState();

  console.log(currentUser);

  return (
    <React.Fragment>
      <div className={styles.main}>
        <div className={styles.profile_container}>
          <div>
            <PersonOutlineIcon className={styles.user_icon} />
            <h2>{currentLanguage.hdrKorPodaci}</h2>
            <p>
              {currentLanguage.pIme}{" "}
              <span>{currentUser?.displayName.split(" ")[0]}</span>
            </p>
            <p>
              {currentLanguage.pPrezime}{" "}
              <span>{currentUser?.displayName.split(" ")[1]}</span>
            </p>
            <p>
              E-Mail <span>{currentUser?.email}</span>
            </p>
          </div>
          <div>
            <p>
              {currentLanguage.pUlicaIBroj}{" "}
              <span>{addressData?.streetAddress}</span>
            </p>
            <p>
              {currentLanguage.pPostanski}{" "}
              <span>{addressData?.postNumber}</span>
            </p>
            <p>
              {currentLanguage.pGrad} <span>{addressData?.cityName}</span>
            </p>
          </div>
          <div>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() =>
                  setFormToRender(
                    <CustomerAddressForm
                      setFormVisible={setFormToRender}
                      customer={currentUser}
                      addressData={addressData}
                      setAddressData={setAddressData}
                    />
                  )
                }
              >
                {currentLanguage.btnProfilDetalji}
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  setFormToRender(
                    <UpdatePassword setFormVisible={setFormToRender} />
                  )
                }
              >
                {currentLanguage.btnPromjeniZaporku}
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() =>
                  setIsVisibleDeleteModal((prevValue) => !prevValue)
                }
              >
                {currentLanguage.btnObrisiProfil}
              </Button>
            </Stack>
          </div>
        </div>
        {formToRender && formToRender}
        <ModalWindow
          setFormVisible={setIsVisibleDeleteModal}
          visible={isVisibleDeleteModal}
        />
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
