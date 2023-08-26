import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withAuthentication from "./withAuthenication";
import {
  Box,
  Heading,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { backend_url } from "./backendURL";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Please log in to access the profile.");
        navigate("/login");
        return;
      }

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${backend_url}/${userId}/profile`, {
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        alert("Error fetching user profile");
      }
    } catch (error) {
      alert("An error occurred:", error);
    }
  }, [userId, navigate]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditedData({
      fullName: userData?.data?.fullName || "",
      email: userData?.data?.email || "",
      phone: userData?.data?.phone || "",
      password: userData?.data?.password || "",
      confirmPassword: userData?.data?.confirmPassword || "",
    });
  };

  const handleFieldChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Please log in to access the profile.");
        navigate("/login");
        return;
      }

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      headers.append("Content-Type", "application/json");

      const res = await fetch(`${backend_url}/${userId}/profile`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(editedData),
      });

      const response = await res.json();
      if (res.ok) {
        setEditMode(false);
        fetchUserProfile();
        alert("Data successfully Update");
      } else if (response.message) {
        alert(response.message);
      }
    } catch (error) {
      alert("An error occurred:", error);
    }
  };

  return (
    <Box textAlign="center">
      <Heading mb="10px">Here is Your Details</Heading>
      <form style={{ textAlign: "center" }}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel textAlign="center">FULL NAME</FormLabel>
            {editMode ? (
              <Input
                className="input-field"
                w="300px"
                type="text"
                placeholder="Full Name"
                value={editedData.fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
              />
            ) : (
              <Input
                className="input-field"
                w="300px"
                type="text"
                placeholder="Full Name"
                value={userData?.data?.fullName || ""}
                isReadOnly
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">EMAIL</FormLabel>
            {editMode ? (
              <Input
                className="input-field"
                w="300px"
                type="text"
                placeholder="Email"
                value={editedData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
            ) : (
              <Input
                className="input-field"
                w="300px"
                type="text"
                placeholder="Email"
                value={userData?.data?.email || ""}
                isReadOnly
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">PHONE NUMBER</FormLabel>
            {editMode ? (
              <Input
                className="input-field"
                w="300px"
                type="number"
                placeholder="Phone"
                value={editedData.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
              />
            ) : (
              <Input
                className="input-field"
                w="300px"
                type="number"
                placeholder="Phone"
                value={userData?.data?.phone || ""}
                isReadOnly
              />
            )}
          </FormControl>
          {editMode && (
            <>
              <FormControl>
                <FormLabel textAlign="center">PASSWORD</FormLabel>
                <Input
                  className="input-field"
                  w="300px"
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel textAlign="center">CONFIRM PASSWORD</FormLabel>
                <Input
                  className="input-field"
                  w="300px"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    handleFieldChange("confirmPassword", e.target.value)
                  }
                />
              </FormControl>
            </>
          )}
        </Stack>
        {editMode ? (
          <Button style={{ marginTop: "20px" }} onClick={saveChanges}>
            Update Details
          </Button>
        ) : (
          <Button style={{ marginTop: "20px" }} onClick={toggleEditMode}>
            Edit Details
          </Button>
        )}
      </form>
    </Box>
  );
};

export default withAuthentication(Dashboard);
