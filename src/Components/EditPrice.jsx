import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

const EditPrice = () => {
  const { id } = useParams();
  const [price, setPrice] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  let url = process.env.REACT_APP_DEV_URL;

const handleChange = (e) => {
    let { value, name } = e.target;
    setPrice({ ...price, [name]: value });
};

  const getData = async () => {
    try {
      let data = await fetch(`${url}/price/${id}`);
      data = await data.json();
      console.log(data.data);
      setPrice(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async () => {
    try {
      let data = await fetch(`${url}/price/edit/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...price }),
      });
      data = await data.json();
      if (data.data) {
        toast({
          title: "Category Updated",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Invalid Response",
          description: data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
      navigate("/admin/price");
      // console.log(data.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Invalid Response",
        description: error.message,
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Box p="4">
        <center>
          <Box
            width={"50%"}
            padding="20px"
            border={"1px solid #add8e6"}
            borderRadius={"20px"}
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
            }
          >
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={price.name}
                onChange={(e) => handleChange(e)}
                maxLength={30}
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Flat Price</FormLabel>
              <Input
                type="text"
                name="flatPrice"
                value={price.flatPrice}
                onChange={(e) => handleChange(e)}
                maxLength={30}
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Discounted Price</FormLabel>
              <Input
                type="text"
                name="discPrice"
                value={price?.discPrice}
                onChange={(e) => handleChange(e)}
                maxLength={30}
              />
            </FormControl>
            <br />
            <Button
              bgColor={"black"}
              color="#add8e6"
              _hover={{ bgColor: "#add8e6", color: "black" }}
              onClick={editData}
            >
              Edit Item
            </Button>
          </Box>
        </center>
      </Box>
    </div>
  );
};

export default EditPrice;
