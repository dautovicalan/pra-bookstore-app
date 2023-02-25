import Footer from "./components/Footer";
import TermsAndConditions from "./pages/TermsAndConditions";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllBooksPage from "./pages/AllBooksPage";
import BookDetails from "./pages/BookDetails";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPassword";
import { AuthContextCustomerProvider } from "./context/AuthContextCustomer";
import PrivateRoute from "./private-routes/PrivateRoute";
import CustomerBooksPage from "./pages/CustomerBooksPage";
import { LanguageContextProvider } from "./context/LanguageContext";
import ContactUsPage from "./pages/ContactUsPage";

function App() {
  return (
    <LanguageContextProvider>
      <AuthContextCustomerProvider>
        <div className="App">
          <BrowserRouter>
            <NavigationBar />
            <Routes>
              <Route path="*" />
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/books" element={<AllBooksPage />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/contact-us" element={<ContactUsPage />}/>
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/your-books"
                element={
                  <PrivateRoute>
                    <CustomerBooksPage />
                  </PrivateRoute>
                }
              />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/change-password" element={<ResetPassword />} />
            </Routes>
            <Footer />
          </BrowserRouter>          
        </div>
      </AuthContextCustomerProvider>
    </LanguageContextProvider>
  );
}

export default App;
