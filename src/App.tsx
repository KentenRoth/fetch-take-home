import "./sass/app.sass";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { Login } from "./Pages/Login";
import { Main } from "./Pages/Main";
import { DataProvider } from "./context/dataContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DataProvider>
                <Main />
              </DataProvider>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
