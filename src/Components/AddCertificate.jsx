import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Flex,
  Spinner,
  useToast,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const AddCertificate = () => {
  const [certificate, setCertificate] = useState({
    image: "",
    imgdescription: "",
  });
  const [selectedImages, setSelectedImages] = useState("");
  const [ctimage, setctImage] = useState({});
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const url = process.env.REACT_APP_DEV_URL;

  const handleInput = (e) => {
    let { name, value, file } = e.target;
    if (name === "image") {
      value = file;
    }
    setCertificate({ ...certificate, [name]: value });
  };

  const handleSingleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setctImage(file);
      // selected image Display
      const imageUrl = URL.createObjectURL(file);
      setSelectedImages(imageUrl);
    }
    
  };
  const handleDeleteSingleImage = () => {
    setctImage({});
    setSelectedImages("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("imgdescription", certificate.imgdescription);
      formdata.append("image", ctimage);

      let res = await axios.post(`${url}/certificate/add`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast({
          title: "Data Added Successfuly",
          description: res.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/certificate");
      } else {
        toast({
          title: "Data Not Added ",
          description: res.data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response?.data?.msg || "An error occurred.",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box p="4">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <center>
            <Box
              backgroundColor={"white"}
              w={["100%", "100%", "100%", "50%", "50%"]}
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              padding={"20px"}
              borderRadius={"20px"}
            >
              <FormControl isRequired>
                <FormLabel  htmlFor="image" color={"#add8e6"}>
                  Certificate Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleSingleImageChange}
                  mb={1}
                />
                <Text mb={5}>
                  <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                  Should Be Upto 243x344px size will allow Only
                </Text>
              </FormControl>
              <FormControl>
                {selectedImages && (
                  <Flex>
                    <img
                      src={selectedImages}
                      alt="selected img"
                      style={{
                        width: "200px",

                        margin: "5px",
                      }}
                    />
                    <MdDelete
                      color="red"
                      cursor={"pointer"}
                      size={"30px"}
                      onClick={handleDeleteSingleImage}
                    />
                  </Flex>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="imgdescription" color={"#add8e6"}>
                  Certificate Description
                </FormLabel>
                <Textarea
                  id="imgdescription"
                  placeholder="Enter your Description"
                  mb={4}
                  name="imgdescription"
                  value={certificate.imgdescription}
                  onChange={handleInput}
                  maxLength={120}
                />
              </FormControl>
            </Box>
          </center>
          <br />
          <center>
            <Button
              type="submit"
              variant={"solid"}
              bgColor={"gray"}
              color="add8e6"
              _hover={{
                color: "black",
                bgColor: "#add8e6",
                border: "1px solid #add8e6",
              }}
              isLoading={isLoading}
              spinner={<Spinner color="blue.500" />}
            >
              Add New
            </Button>
          </center>
        </form>
      </Box>
    </>
  );
};

export default AddCertificate;
