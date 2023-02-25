const selectLanguage = (languageId, componentLanguage = "HR") => {
    let language;
    switch (languageId) {
      case "EN":
        language = componentLanguage.english;
        break;
      case "HR":
        language = componentLanguage.croatian;
        break;
      default:
        language = componentLanguage.croatian;
        break;
    }
    return language;
  };
  
  export default selectLanguage;