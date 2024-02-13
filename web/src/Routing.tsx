import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, SignUp } from "./pages";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
