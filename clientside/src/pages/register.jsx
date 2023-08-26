import { Box, Heading, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backend_url } from "./backendURL";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
}; 

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (
      fullName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      phone === ""
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch(`${backend_url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful! You can now log in.");
        navigate("/login");
      } else if (data.message) {
        alert(data.message);
      }
    } catch (err) {
      alert("An error occurred during registration");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId")
    if (token) {
      alert('you are already registered user, if you trying to the access the register page logout yourself first')
      navigate(`/${userId}/profile`)
    }
  }, [navigate]);

  const { fullName, email, password, confirmPassword, phone } = formData;

  return (
    <Box style={{ textAlign: "center" }}>
      <Heading mb="10px" style={{ textAlign: "center" }}>
        Register
      </Heading>
      <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
        <Box className="input-icons">
          <i className="fa fa-user icon"></i>
          <Input
            className="input-field"
            w="300px"
            type="text"
            placeholder="Full Name"
            value={fullName}
            name="fullName"
            onChange={handleChange}
          />
        </Box>
        <Box className="input-icons">
          <i className="fa fa-envelope icon"></i>
          <Input
            className="input-field"
            w="300px"
            type={"email"}
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </Box>
        <Box className="input-icons">
          <i className="fa fa-key icon"></i>
          <Input
            className="input-field"
            w="300px"
            type={"password"}
            value={password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Box>
        <Box className="input-icons">
          <i className="fa fa-key icon"></i>
          <Input
            className="input-field"
            w="300px"
            type={"password"}
            value={confirmPassword}
            name="confirmPassword"
            placeholder="ConfirmPassword"
            onChange={handleChange}
          />
        </Box>
        <Box className="input-icons">
          <i className="fa fa-phone icon"></i>
          <Input
            className="input-field"
            w="300px"
            type="tel"
            placeholder="Phone"
            value={phone}
            name="phone"
            onChange={handleChange}
          />
        </Box>
        <Input
          w="300px"
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px",
          }}
          type={"submit"}
          value="Register"
        />
      </form>
      <p>
        Already a member?{" "}
        <Link style={{ textDecoration: "none", color: "green" }} to={"/login"}>
          Login
        </Link>
      </p>
    </Box>
  );
};

export default Register;
