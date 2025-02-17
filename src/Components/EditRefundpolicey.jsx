import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Textarea,
  Flex,
  Spinner,
  useToast,
  Image,
  Text,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import ReactQuill from "react-quill";

const EditRefundpolicey = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    content: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "formula"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };
  const getAboutusById = async () => {
    try {
      const response = await fetch(`${url}/refundpolicy/${id}`);
      const data = await response.json();
      setItem(data.data);
      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAboutusById();
  }, [id]);
  

  // const handleInput = (e) => {
  //   const { name, value } = e.target;

  //   setItem({ ...item, [name]: value });
  //   // setItem((prevItem) => ({
  //   //   ...prevItem,
  //   //   [name]: value,
  //   // }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!item.content.trim()) {
      alert("Content cannot be empty!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`${url}/refundpolicy/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast({
          title: "Data Added Successfuly",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/page/");
      } else {
        throw new Error("Faild to update Data");
      }
    } catch (error) {
      console.error("Update faild", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box p="4">
        <Flex
          justifyContent={"space-around"}
          gap="35px"
          flexDirection={["column", "column", "column", "row", "row"]}
        >
          <Box
            backgroundColor={"#white"}
            w={["100%", "100%", "100%", "100%", "100%"]}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            borderRadius={"20px"}
          >
            <form encType="multipart/form-data">
              <FormControl isRequired>
                <FormLabel htmlFor="description" color={"#add8e6"}>
                  Page Content
                </FormLabel>
                <ReactQuill
                  modules={module}
                  theme="snow"
                  value={item.content}
                  onChange={(newContent) =>
                    setItem((prevItem) => ({
                      ...prevItem,
                      content: newContent,
                    }))
                  }
                />
              </FormControl>
            </form>
          </Box>
          {/* <Box
            backgroundColor={"#white"}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            w={["100%", "100%", "100%", "100%", "100%"]}
            borderRadius={"20px"}
          >
            
          </Box> */}
        </Flex>
        <br />
        <center>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Button
              variant={"solid"}
              bgColor={"#161616"}
              color="white"
              _hover={{
                color: "black",
                bgColor: "white",
                border: "1px solid #161616",
              }}
              type="submit"
              isLoading={isLoading}
              spinner={<Spinner color="blue.500" />}
            >
              Save
            </Button>
          </form>
        </center>
      </Box>
    </>
  );
};

export default EditRefundpolicey;
