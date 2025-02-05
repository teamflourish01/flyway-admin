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
import { CloseIcon, DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import ReactQuill from "react-quill";

const EditAboutus = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [logoUrl, setlogoUrl] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const [singletwoImg, setSingletwoImg] = useState("");
  const [selctSintwoImg, setselectSingtwoImg] = useState("");
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
      const response = await fetch(`${url}/aboutus/${id}`);
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

  // edit logic
  const handleSingleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setSingleImg(file);

      // Display selected Img
      const imageUrl = URL.createObjectURL(file);
      setselectSingImg(imageUrl);
    } else {
      setSingleImg("");
      setselectSingImg("");
    }
  };
  const handleDeleteSingleImage = () => {
    setSingleImg("");
    setselectSingImg("");
  };
  // two Image
  const handleSingletwoImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setSingletwoImg(file);

      // Display selected Img
      const imageUrl = URL.createObjectURL(file);
      setselectSingtwoImg(imageUrl);
    } else {
      setSingletwoImg("");
      setselectSingtwoImg("");
    }
  };
  const handleDeleteSingletwoImage = () => {
    setSingletwoImg("");
    setselectSingtwoImg("");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    // setItem({ ...item, [name]: value });
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  //ourjurney section

  const handleJourneyChange = (index, e) => {
    const { name, value } = e.target;
    setItem((prevItem) => {
      let updatedJourney = [...prevItem.ourjouerney];
      updatedJourney[index][name] = value;
      return { ...prevItem, ourjouerney: updatedJourney };
    });
  };

  const handleDataChange = (jIndex, dIndex, e) => {
    const { name, value } = e.target;
    setItem((prevItem) => {
      let updatedJourney = [...prevItem.ourjouerney];
      updatedJourney[jIndex].data[dIndex][name] = value;
      return { ...prevItem, ourjouerney: updatedJourney };
    });
  };
  // Add New Journey Section
  const addJourneySection = () => {
    setItem((prevItem) => ({
      ...prevItem,
      ourjouerney: [
        ...prevItem.ourjouerney,
        { heading: "", data: [{ number: "", text: "" }] },
      ],
    }));
  };

  // Remove Journey Section
  const removeJourneySection = (index) => {
    setItem((prevItem) => {
      let updatedJourney = [...prevItem.ourjouerney];
      updatedJourney.splice(index, 1);
      return { ...prevItem, ourjouerney: updatedJourney };
    });
  };

  //Add More Data Fields Inside a Journey Section
  const addDataField = (jIndex) => {
    setItem((prevItem) => {
      let updatedJourney = [...prevItem.ourjouerney];
      updatedJourney[jIndex].data.push({ number: "", text: "" });
      return { ...prevItem, ourjouerney: updatedJourney };
    });
  };

  //Remove Data Field from a Journey Section
  const removeDataField = (jIndex, dIndex) => {
    setItem((prevItem) => {
      let updatedJourney = [...prevItem.ourjouerney];
      updatedJourney[jIndex].data.splice(dIndex, 1);
      return { ...prevItem, ourjouerney: updatedJourney };
    });
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    setIsLoading(true);
    let dup = { ...item };
    if (singleImg) {
      formData.append("banner", singleImg);
    }
    if (singletwoImg) {
      formData.append("banner_two", singletwoImg);
    }

    formData.append("dup", JSON.stringify(dup));
    formData.append("ourjouerney", JSON.stringify(dup.ourjouerney || []));
    try {
      const response = await axios.put(`${url}/aboutus/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        toast({
          title: "Data Edit Successfuly",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/page/");
      }
    } catch (error) {
      console.error("Update faild", error);
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
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="meta_title" color={"#add8e6"}>
                  Meta Title
                </FormLabel>
                <Input
                  id="meta_title"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="meta_title"
                  value={item.meta_title}
                  onChange={handleInput}
                  mb={2}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="meta_description" color={"#add8e6"}>
                  Meta Description
                </FormLabel>
                <Textarea
                  id="meta_description"
                  placeholder="Enter your Description"
                  mb={4}
                  name="meta_description"
                  value={item.meta_description}
                  onChange={handleInput}
                />
              </FormControl>

              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="generalheading" color={"#add8e6"}>
                  Heading
                </FormLabel>
                <Input
                  id="heading"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="heading"
                  value={item.heading}
                  onChange={handleInput}
                  mb={1}
                  maxLength={160}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description" color={"#add8e6"}>
                  Description
                </FormLabel>
                {/* <Textarea
                  id="description"
                  placeholder="Enter your message"
                  mb={4}
                  name="description"
                  value={item.description}
                  onChange={handleInput}
                  maxLength={750}
                /> */}
                <ReactQuill
                  modules={module}
                  theme="snow"
                  value={item.description}
                  onChange={(newContent) =>
                    setItem((prevItem) => ({
                      ...prevItem,
                      description: newContent,
                    }))
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="banner" color={"#add8e6"} mt={2}>
                  AboutUs Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="banner"
                  type="file"
                  name="banner"
                  accept="image/*"
                  onChange={handleSingleImage}
                  mb={1}
                />
                <Text mb={5}>
                  <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                  Should Be Upto 1320x693px size will allow Only
                </Text>
              </FormControl>
              <FormControl>
                {selctSinImg && (
                  <Flex>
                    <img
                      src={selctSinImg}
                      alt="selected img"
                      style={{
                        width: "200px",
                        marginBottom: "10px",
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
              {!selctSinImg && item.banner && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`${url}/aboutus/${item.banner}`}
                      alt="selected img"
                      style={{
                        width: "200px",

                        margin: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  </Flex>
                </FormControl>
              )}
              <FormControl isRequired>
                <FormLabel htmlFor="heading_two" color={"#add8e6"}>
                  Founder Heading
                </FormLabel>
                <Input
                  variant="flushed"
                  id="heading_two"
                  type="text"
                  placeholder="Enter your Heading"
                  mb={4}
                  name="heading_two"
                  value={item.heading_two}
                  onChange={handleInput}
                  maxLength={160}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description_two" color={"#add8e6"}>
                  Founder Message
                </FormLabel>
                {/* <Textarea
                  id="description_two"
                  placeholder="Enter your Description"
                  mb={4}
                  name="description_two"
                  value={item.description_two}
                  onChange={handleInput}
                  maxLength={750}
                /> */}
                <ReactQuill
                  modules={module}
                  theme="snow"
                  value={item.description_two}
                  onChange={(newContent) =>
                    setItem((prevItem) => ({
                      ...prevItem,
                      description_two: newContent,
                    }))
                  }
                />
              </FormControl>
            </form>
          </Box>
          <Box
            backgroundColor={"#white"}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            w={["100%", "100%", "100%", "100%", "100%"]}
            borderRadius={"20px"}
          >
            <form encType="multipart/form-data">
              <FormControl isRequired mt={2}>
                <FormLabel htmlFor="vision" color={"#add8e6"}>
                  vision
                </FormLabel>
                <Textarea
                  id="vision"
                  placeholder="Enter your Description"
                  mb={4}
                  name="vision"
                  value={item.vision}
                  onChange={handleInput}
                  maxLength={345}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="mission" color={"#add8e6"}>
                  Mission
                </FormLabel>
                <Textarea
                  id="mission"
                  placeholder="Enter your Description"
                  mb={4}
                  name="mission"
                  value={item.mission}
                  onChange={handleInput}
                  maxLength={345}
                />
              </FormControl>

              {/* <FormControl isRequired>
                <FormLabel htmlFor="goals" color={"#add8e6"}>
                  Goals
                </FormLabel>
                <Textarea
                  id="goals"
                  placeholder="Enter your Description"
                  mb={4}
                  name="goals"
                  value={item.goals}
                  onChange={handleInput}
                  maxLength={345}
                />
              </FormControl> */}

              <FormControl>
                <FormLabel htmlFor="banner_two" color={"#add8e6"}>
                  Founder Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="banner_two"
                  type="file"
                  name="banner_two"
                  accept="image/*"
                  onChange={handleSingletwoImage}
                  mb={1}
                />
                <Text mb={5}>
                  <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                  Should Be Upto 1320x693px size will allow Only
                </Text>
              </FormControl>
              <FormControl>
                {selctSintwoImg && (
                  <Flex>
                    <img
                      src={selctSintwoImg}
                      alt="selected img"
                      style={{
                        width: "200px",
                        marginBottom: "10px",
                        margin: "5px",
                      }}
                    />
                    <MdDelete
                      color="red"
                      cursor={"pointer"}
                      size={"30px"}
                      onClick={handleDeleteSingletwoImage}
                    />
                  </Flex>
                )}
              </FormControl>
              {!selctSintwoImg && item.banner_two && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`${url}/aboutus/${item.banner_two}`}
                      alt="selected img"
                      style={{
                        width: "200px",

                        margin: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  </Flex>
                </FormControl>
              )}
              {/* ourjouerney Fields */}
              {item.ourjouerney?.map((journey, jIndex) => (
                <Box key={jIndex} border="1px solid #ccc" p={4} mb={4}>
                  <Flex justifyContent="flex-end">
                    <MdDelete
                      color="red"
                      cursor={"pointer"}
                      size={"30px"}
                      ml="auto"
                      onClick={() => removeJourneySection(jIndex)}
                    />
                  </Flex>
                  <Input
                    type="text"
                    name="heading"
                    placeholder="Enter Heading"
                    value={journey.heading}
                    onChange={(e) => handleJourneyChange(jIndex, e)}
                  />

                  {/* <Button
                    colorScheme="red"
                    onClick={() => removeJourneySection(jIndex)}
                  >
                    Remove Section
                  </Button> */}

                  {journey.data.map((data, dIndex) => (
                    <Box key={dIndex} display="flex" gap="10px" mt={3}>
                      <Input
                        type="text"
                        name="number"
                        placeholder="Enter Number"
                        value={data.number}
                        onChange={(e) => handleDataChange(jIndex, dIndex, e)}
                      />
                      <Input
                        type="text"
                        name="text"
                        placeholder="Enter Description"
                        value={data.text}
                        onChange={(e) => handleDataChange(jIndex, dIndex, e)}
                      />
                      <MdDelete
                        color="red"
                        cursor={"pointer"}
                        size={"40px"}
                        onClick={() => removeDataField(jIndex, dIndex)}
                      />
                      {/* <Button
                        colorScheme="red"
                        onClick={() => removeDataField(jIndex, dIndex)}
                      >
                        Remove
                      </Button> */}
                    </Box>
                  ))}
                  {/* <IoIosAdd onClick={() => addDataField(jIndex)}/> */}
                  <Button
                    colorScheme="blue"
                    onClick={() => addDataField(jIndex)}
                    mt={1}
                  >
                    Add More
                  </Button>
                </Box>
              ))}
              <Button colorScheme="green" onClick={addJourneySection}>
                Add New Section
              </Button>
            </form>
          </Box>
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

export default EditAboutus;
