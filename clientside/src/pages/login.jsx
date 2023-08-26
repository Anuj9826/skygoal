import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backend_url } from "./backendURL";
import { Box, Heading, Input } from "@chakra-ui/react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let { email, password } = formData;
    if (email === "" || password === "") {
      alert("Please Fill * required Field");
      return;
    }

    try {
      const res = await fetch(`${backend_url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const response = await res.json();
      if (res.ok) {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        alert("Login successful");
        navigate(`/${response.data.userId}/profile`);
      } else if (response.message) {
        alert(response.message);
      }
    } catch (err) {
      alert("An error occurred during login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId")
    if (token) {
      alert('you are already login, if you trying to the access the login page logout yourself first')
      navigate(`/${userId}/profile`)
    }
  }, [navigate]);

  const { email, password } = formData;

  return (
    <Box style={{ textAlign: "center" }}>
      <Heading mb="10px" style={{ textAlign: "center" }}>
        {" "}
        Login For Existing Users{" "}
      </Heading>
      <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
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
        />
      </form>
      <p>
        Create an account?{" "}
        <Link
          style={{ textDecoration: "none", color: "green" }}
          to={"/register"}
        >
          {" "}
          Register{" "}
        </Link>
      </p>
    </Box>
  );
};

export default Login;