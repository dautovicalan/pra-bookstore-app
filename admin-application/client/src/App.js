import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewWorker from "./pages/AddNewWorker";
import PrivateRoute from "./private-route/PrivateRoute";
import { AuthContextProvider } from "./context/AuthContext";
import ShowAllWorkers from "./pages/ShowAllWorkers";
import LoginPage from "./pages/LoginPage";
import BookstoreInfo from "./pages/BookstoreInfo";
import AllBooks from "./pages/AllBooks";
import AddBookPage from "./pages/AddBookPage";
import BookUpdate from "./pages/BookUpdate";
import ShowReservations from "./pages/ShowReservations";
import NavigationBar from "./components/NavigationBar";
import ShowPurchases from "./pages/ShowPurchases";
import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "2em" }}>
                404 Url nije pronaden
              </h2>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div style={{width: "70%", margin: "auto"}}>
                  <h2 style={{ textAlign: "center", marginTop: "2em" }}>
                    Dobrodosli u Knjizara Admin
                  </h2>
                  <img src="https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg"/>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-worker"
            element={
              <PrivateRoute>
                <AddNewWorker />
              </PrivateRoute>
            }
          />
          <Route
            path="/workers"
            element={
              <PrivateRoute>
                <ShowAllWorkers />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/bookstore-info"
            element={
              <PrivateRoute>
                <BookstoreInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <AllBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-new-book"
            element={
              <PrivateRoute>
                <AddBookPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-book/:id"
            element={
              <PrivateRoute>
                <BookUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path="/loans"
            element={
              <PrivateRoute>
                <ShowReservations />
              </PrivateRoute>
            }
          />
          <Route
            path="/purchases"
            element={
              <PrivateRoute>
                <ShowPurchases />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
