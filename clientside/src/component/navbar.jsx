import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import "./navbar.css";
import "../styles/common.css";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const isProfilePage = location.pathname === `/${userId}/profile`;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [email]);

  return (
    <Box bg={useColorModeValue("goldenrod", "gray.900")} px={4} mb="5%">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to="/register">
          <Image className="icon" w="80px" src="./logo.png" alt="logo" />
        </Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button className="icon" onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                className="icon"
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={"profile"} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar size={"2xl"} src={"profile"} />
                </Center>
                <br />
                <Center>
                  <p>{email}</p>
                </Center>
                <br />
                <MenuDivider />
                {isProfilePage ? (
                  <>
                    <MenuItem>
                      <Link to = {`/${userId}/profile`} className="Link">
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                    <Link to="/login" className="Link" onClick={handleLogout}>
                        Logout
                      </Link>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Link to="/login" className="Link">
                        Login
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/register" className="Link">
                        New User?
                      </Link>
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
