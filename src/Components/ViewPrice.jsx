import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useLayoutEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

const ViewPrice = () => {
    const navigate = useNavigate();
    const [price, setPrice] = useState({});
    const { id } = useParams();
    let url = process.env.REACT_APP_DEV_URL;
    const toast = useToast();
  
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
    const handleDelete = async () => {
      try {
        let res = await fetch(`${url}/price/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        res = await res.json();
        //console.log(res);
        toast({
          title: "Price Deleted",
          description: res.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/price");
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
    <Box textAlign={"left"} p="4">
    <Flex gap="20px">
      <Text fontSize={"xl"} fontWeight={"semibold"}>
        View Category Details
      </Text>
      <Button
        borderRadius={"20px"}
        color={"#add8e6"}
        bgColor={"black"}
        _hover={{ color: "black", bgColor: "#add8e6" }}
        leftIcon={<BiEditAlt />}
        onClick={() => navigate(`/admin/price/edit/${id}`)}>
        Edit
      </Button>
      <Button
        borderRadius={"20px"}
        color={"#add8e6"}
        bgColor={"black"}
        _hover={{ color: "black", bgColor: "#add8e6" }}
        leftIcon={<RiDeleteBin6Line />}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </Flex>
    <br />
    <br />
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Name
    </Text>
    <Box
      padding="10px 20px"
      width="50%"
      bgColor={"#eef1f4"}
      fontSize={"medium"}
    >
      {price?.name}
    </Box>
    <br />
    <Text fontWeight={"semibold"} fontSize={"xl"}>
    Flat Price
    </Text>
    <Box
      padding="10px 20px"
      width="50%"
      bgColor={"#eef1f4"}
      fontSize={"medium"}
    >
      {price?.flatPrice}
    </Box>
    <br />
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Discount Price
    </Text>
    <Box
      padding="10px 20px"
      width="50%"
      bgColor={"#eef1f4"}
      fontSize={"medium"}
    >
      {price?.discPrice}
    </Box>
    <br />
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Created at
    </Text>
    {price?.createdAt ? (
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {new Date(price.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}
      </Box>
    ) : (
      <Text>No Records</Text>
    )}
    <br />
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Updated at
    </Text>
    {price?.updatedAt ? (
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {new Date(price.updatedAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}
      </Box>
    ) : (
      <Text>No Records</Text>
    )}
  </Box>
  )
}

export default ViewPrice