import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const InquiryForm = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/inquiry/send",
        data
      );
      //alert(response.data);
      toast({
        title: "User Added",
        description: response.data,
        status: "success",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      console.error("There was an error sending the message!", error);
      //alert("Failed to send message.");
      toast({
        title: "User Added",
        description: "Failed to send message",
        status: "success",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  return (
    <Center>
      <Box
        backgroundColor="white"
        w={["100%", "100%", "100%", "50%", "50%"]}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        p="20px"
        borderRadius="20px"
        mt="50px"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl mb={4}>
          <FormLabel htmlFor="name" color="#add8e6">
            Name
          </FormLabel>
          <Input
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <Text color="red.500" textAlign="center">
              Name is required.
            </Text>
          )}
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="email" color="#add8e6">
            Email
          </FormLabel>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <Text color="red.500" textAlign="center">
              Email is required.
            </Text>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <Text color="red.500" textAlign="center">
              Invalid email format.
            </Text>
          )}
        </FormControl>

        <Flex gap="50px">
          <FormControl mb={4}>
            <FormLabel htmlFor="phone" color="#add8e6">
              phone
            </FormLabel>
            <Input
              type="number"
              id="phone"
              {...register("phone", {
                required: true,
                maxLength: 10,
                pattern: /^[0-9]{10}$/,
              })}
            />
            {errors.phone && errors.phone.type === "required" && (
              <Text color="red.500" textAlign="center">
                phone number is required.
              </Text>
            )}
            {errors.phone && errors.phone.type === "maxLength" && (
              <Text color="red.500" textAlign="center">
                phone number cannot exceed 10 digits.
              </Text>
            )}
            {errors.phone && errors.phone.type === "pattern" && (
              <Text color="red.500" textAlign="center">
                phone number must be exactly 10 digits.
              </Text>
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="city" color="#add8e6">
              City
            </FormLabel>
            <Input
              type="text"
              id="city"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <Text color="red.500" textAlign="center">
                City is required.
              </Text>
            )}
          </FormControl>
        </Flex>

        <FormControl mb={4}>
          <FormLabel htmlFor="message" color="#add8e6">
            Message
          </FormLabel>
          <Textarea id="message" {...register("message", { required: true })} />
          {errors.message && (
            <Text color="red.500" textAlign="center">
              Message is required.
            </Text>
          )}
        </FormControl>

        <Button
          type="submit"
          variant="solid"
          bgColor="black"
          color="#add8e6"
          mt="20px"
          _hover={{
            color: "black",
            bgColor: "#add8e6",
            border: "1px solid #add8e6",
          }}
        >
          Send Inquiry
        </Button>
      </Box>
    </Center>
  );
};

export default InquiryForm;
