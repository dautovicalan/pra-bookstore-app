import React, {useState} from "react";
import { CFooter, CLink } from "@coreui/react";
import styles from "../styles/Footer.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";


const Footer = () => {

  const {languageId, setLanguageId} = useLanguage();

  const [languageType, setLanguageType] = useState(languageId);

  const handleChange = (event) => {
    setLanguageType(event.target.value);
    switch (event.target.value) {
      case "EN":
        setLanguageId("EN");
        break;
      case "HR":
        setLanguageId("HR");
        break;
      default:
        setLanguageId("HR");
        break;
    }
    window.scrollTo(0, 0);
  };

  return (
    <CFooter className="bg-dark" style={{marginTop: "180px"}}>
      <div>
        <span className="text-white">
          Online Bookstore &copy; 2022 PRA.
        </span>
      </div>
      <div>
        <Link to="/contact-us" style={{textDecoration: "none", color: "white"}}>Contact</Link>
      </div>
      <div>
        <Link to="/terms-and-conditions" style={{textDecoration: "none", color: "white"}}>Terms And Conditions</Link>
      </div>
      <div>
      <InputLabel sx={{color: "white"}} id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={languageType}
              label="Language"
              sx={{backgroundColor: "white"}}
              onChange={handleChange}
              defaultValue="EN"
            >
              <MenuItem value={"EN"}>EN</MenuItem>
              <MenuItem value={"HR"}>HR</MenuItem>
            </Select>
      </div>
      <div>
        <span className="text-white">Powered by PRA22-TIM-06</span>
      </div>
    </CFooter>
  );
};

export default Footer;
