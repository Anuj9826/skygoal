import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./component/navbar";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom"; // Import Navigate
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:userId/profile/" element={<Dashboard />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Box>
  );
}

export default App;
