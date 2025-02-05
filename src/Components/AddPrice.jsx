import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import generateSlug from '../util/generateSlug';
import EditPermalink from './EditPermalink';
import { useNavigate } from 'react-router-dom';

const AddPrice = () => {
    let url = process.env.REACT_APP_DEV_URL;
    const [price, setPrice] = useState({
      name: "",
      flatPrice:"",
      discPrice:""
    });
    const navigate = useNavigate();
    const toast = useToast();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setPrice({ ...price, [name]: value });
    };
    const handleSave = async () => {
      try {
        let data = await fetch(`${url}/price/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...price }),
        });
        console.log(data);
        data = await data.json();
  
        if (data.data) {
          toast({
            title: "Price Added",
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
      } catch (error) {
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
  return (
    <Box p="4">
    <Flex justifyContent={"center"}>
      <Box
        border={"1px solid #add8e6"}
        width={["100%", "80%", "60%", "50%"]}
        padding={"20px"}
        borderRadius="20px"
      >
        <FormControl isRequired>
          <FormLabel color={"#add8e6"} m={"0"}>
            Name
          </FormLabel>
          <Input
            type="text"
            color={"black"}
            borderColor={"#add8e6"}
            value={price?.name}
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
            maxLength={30}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel color={"#add8e6"} m={"0"}>
            Flat Price
          </FormLabel>
          <Input
            type="text"
            color={"black"}
            borderColor={"#add8e6"}
            value={price?.flatPrice}
            name="flatPrice"
            onChange={(e) => {
              handleChange(e);
            }}
            maxLength={30}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel color={"#add8e6"} m={"0"}>
            Discounted Price
          </FormLabel>
          <Input
            type="text"
            color={"black"}
            borderColor={"#add8e6"}
            value={price?.discPrice}
            name="discPrice"
            onChange={(e) => {
              handleChange(e);
            }}
            maxLength={30}
          />
        </FormControl>
        <br />
        <ButtonGroup gap="40px">
          <Button
            variant={"solid"}
            bgColor={"#161616"}
            color="#add8e6"
            _hover={{
              color: "black",
              bgColor: "#add8e6",
              border: "1px solid #add8e6",
            }}
            onClick={handleSave}
            isDisabled={!price.discPrice}
          >
            Save
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  </Box>
  )
}

export default AddPrice