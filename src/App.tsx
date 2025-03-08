import "./sass/app.sass";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { Login } from "./Pages/Login";
import { Main } from "./Pages/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
