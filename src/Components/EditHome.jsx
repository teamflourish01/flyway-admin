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
  Image,
  Spinner,
  useToast,
  Text,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

const EditHome = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [bannerUrl, setbannerUrl] = useState([]);
  const [bImage, setbImage] = useState([]);
  const [bnrimgText, setbnrimgText] = useState([]);
  const [galleryUrl, setgalleryUrl] = useState([]);
  const [galleryImage, setgalleryImage] = useState([]);
  const [galleryText, setgalleryText] = useState([]);
  const [logoUrl, setlogoUrl] = useState([]);
  const [logoImg, setlogoImg] = useState([]);
  const toast = useToast();
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_DEV_URL;

  const getHomebyID = async () => {
    try {
      const response = await fetch(`${url}/home/${id}`);
      const data = await response.json();
      setItem(data.data);
      console.log(data.data,"item");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHomebyID();
  }, [id]);

  // edit logic

  // 3 images handle section
  const handleBannerInputImage = (e) => {
    const file = e.target.files[0];
    console.log("select file", file);
    setbImage([...bImage, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setbannerUrl([...bannerUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  const handleDeleteBannerImage = (index) => {
    // const dup = [...bannerUrl];
    // dup.splice(index, 1);
    // setbannerUrl(dup);

    setbImage((prev) => prev.filter((_, i) => i !== index));
    setbannerUrl((prev) => prev.filter((_, i) => i !== index));
    setbnrimgText((prev) => prev.filter((_, i) => i !== index));

  };
  const handledbbannerImage = (index) => {
    let dup = [...item.banner_image];
    dup.splice(index, 1);
    // Remove Banner_img & Alt_text set
    let dupBnrText = [...item.bannerimg_alt];
    dupBnrText.splice(index, 1);
    setItem({ ...item, banner_image: dup, bannerimg_alt: dupBnrText });
  };

  const handleBnrImgText = (e, i) => {
    let bannerText = [...bnrimgText];
    bannerText[i] = e.target.value;
    setbnrimgText([...bannerText]);
  };
  const handleBnrImgTextData = (e, i) => {
    let dup = [...item.bannerimg_alt];
    dup[i] = e.target.value;
    setItem({ ...item, bannerimg_alt: dup });
  };
  // Trust-factor-img handle section

  const handleTrustFactrImage = (e) => {
    const file = e.target.files[0];
    setgalleryImage([...galleryImage, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setgalleryUrl([...galleryUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  const handleTfimgText = (e, i) => {
    let dup = [...item.gallery_alt];
    dup[i] = e.target.value;
    setItem({ ...item, gallery_alt: dup });
  };
  const handleTrFacText = (e, i) => {
    let gallerytext = [...galleryText];
    gallerytext[i] = e.target.value;
    setgalleryText([...gallerytext]);
  };
  const handleDeleteTrustFactrImage = (index) => {
    // const dup = [...galleryImage];
    // let dupUrl = [...galleryUrl];
    // let dupText = [...galleryText];
    // dupText.splice(i, 1);
    // dup.splice(i, 1);
    // dupUrl.splice(i, 1);
    // setgalleryImage(dup);
    // setgalleryUrl(dupUrl);
    // setgalleryText(dupText);

    setgalleryImage((prev) => prev.filter((_, i) => i !== index));
    setgalleryUrl((prev) => prev.filter((_, i) => i !== index));
    setgalleryText((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteDBgalleryImage = (index) => {
    let dup = [...item.gallery];
    dup.splice(index, 1);

    // Remove TRF_img & Alt_text set
    let dupgalleryText = [...item.gallery_alt];
    dupgalleryText.splice(index, 1);
    setItem({
      ...item,
      gallery: dup,
      gallery_alt: dupgalleryText,
    });
  };

  // Logo-File-img handle section

  const handleLogoImage = (e) => {
    const file = e.target.files[0];
    setlogoImg([...logoImg, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setlogoUrl([...logoUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteLogoImage = (index) => {
    // const dup = [...logoUrl];
    // dup.splice(index, 1);
    // setlogoUrl(dup);
    setlogoUrl(logoUrl.filter((_, i) => i !== index));
    setlogoImg(logoImg.filter((_, i) => i !== index));
  };

  const handleDeleteDBLogoIMG = (index) => {
    let dup = [...item.our_distributor_logo];
    dup.splice(index, 1);
    setItem({ ...item, our_distributor_logo: dup });
  };

  const handleAddFeature = () => {
    setItem({ ...item, marque: [...item?.marque || [], ""] });
  };

  const handleKeyFeature = (e, i) => {
    let newFeature = [...item.marque];
    newFeature[i] = e.target.value;
    setItem({ ...item, marque: newFeature });
  };

  const handleremoveFeature = (i) => {
    let dup = [...item?.marque];
    dup.splice(i, 1);
    setItem({ ...item, marque: dup });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    setIsLoading(true);
    let dup = { ...item };
    if (bImage.length > 0) {
      for (let x of bImage) {
        formData.append("banner_image", x);
      }
    }
    if (bnrimgText.length > 0) {
      dup.bannerimg_alt = [...dup.bannerimg_alt, ...bnrimgText];
    }
    // trfacotr-image add logic
    if (galleryImage.length > 0) {
      for (let x of galleryImage) {
        formData.append("gallery", x);
      }
    }
    if (galleryText.length > 0) {
      dup.gallery_alt = [...dup.gallery_alt, ...galleryText];
    }
    // Logo-image add logic
    // if (logoImg.length > 0) {
    //   for (let x of logoImg) {
    //     formData.append("our_distributor_logo", x);
    //   }
    // }

    formData.append("dup", JSON.stringify(dup));
    try {
      const response = await axios.put(`${url}/home/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast({
          title: "Data Edit Successfuly",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/page/");
      } else {
        toast({
          title: "Data Not Update ",
          description: response.data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
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
      <Box p="4" marginLeft="20px">
        <Flex
          justifyContent={"space-around"}
          gap="40px"
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
                <FormLabel htmlFor="banner_heading" color={"#add8e6"}>
                  Banner Heading
                </FormLabel>
                <Input
                  id="banner_heading"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="banner_heading"
                  value={item?.banner_heading}
                  onChange={handleInput}
                  mb={4}
                  maxLength={65}
                />
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="banner_description" color={"#add8e6"}>
                  Banner Description
                </FormLabel>
                <Textarea
                  id="banner_description"
                  placeholder="Enter your Description"
                  mb={4}
                  name="banner_text"
                  value={item.banner_text}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="banner_images" color={"#add8e6"}>
                  Banner Images
                </FormLabel>
                <Input
                  variant="flushed"
                  id="banner_image"
                  type="file"
                  name="banner_image"
                  accept="image/*"
                  onChange={handleBannerInputImage}
                  mb={1}
                  multiple
                />
                <Text mb={5}>
                  <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                  Should Be 651x612px size will allow Only
                </Text>
                <Flex wrap="wrap">
                  {bannerUrl &&
                    bannerUrl?.map((e, i) => (
                      <Flex key={i} position="relative">
                        <Box>
                          <Image
                            src={e}
                            style={{
                              width: "200px",
                              marginRight: "10px",
                              marginBottom: "10px",
                            }}
                          />
                          <Input
                            value={bnrimgText[i]}
                            onChange={(event) => handleBnrImgText(event, i)}
                          />
                        </Box>
                        <MdDelete
                          color="red"
                          size={"40px"}
                          cursor="pointer"
                          onClick={() => handleDeleteBannerImage(i)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "5px",
                            marginTop: "-5px",
                            marginRight: "-8px",
                          }}
                        />
                      </Flex>
                    ))}
                  {item?.banner_image &&
                    item.banner_image.map((e, i) => (
                      <Flex key={i} position="relative">
                        <Box>
                          <Image
                            src={`${url}/home/${e}`}
                            style={{
                              width: "200px",
                              marginRight: "10px",
                            }}
                          />
                          <Input
                            value={item.bannerimg_alt[i]}
                            onChange={(event) => handleBnrImgTextData(event, i)}
                          />
                        </Box>
                        <MdDelete
                          color="red"
                          cursor="pointer"
                          size={"40px"}
                          onClick={() => handledbbannerImage(i)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "0",
                            marginTop: "-5px",
                            marginRight: "-8px",
                          }}
                        />
                      </Flex>
                    ))}
                </Flex>
              </FormControl>
              <br />
              <FormControl isRequired mb={4}>
                <Flex justifyContent={"space-between"}>
                  <FormLabel color={"#add8e6"}>Marque</FormLabel>
                  <Button onClick={handleAddFeature}>+</Button>
                </Flex>
                {item?.marque?.map((e, i) => {
                  return (
                    <Flex gap={"20px"} mt={"10px"}>
                      <Input
                        key={i}
                        value={e}
                        onChange={(event) => handleKeyFeature(event, i)}
                      />
                      <Button onClick={() => handleremoveFeature(i)}>-</Button>
                    </Flex>
                  );
                })}
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="about_video" color={"#add8e6"}>
                  About Video
                </FormLabel>
                <Input
                  id="about_video"
                  type="text"
                  placeholder="Enter your place"
                  variant="flushed"
                  mb={4}
                  name="about_video"
                  value={item?.about_video}
                  onChange={handleInput}
                />
              </FormControl>
              <br />
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
              <br />
              <FormControl>
                <FormLabel htmlFor="gallery" color={"#add8e6"}>
                  Product Gallery
                </FormLabel>
                <Input
                  variant="flushed"
                  id="gallery"
                  type="file"
                  name="gallery"
                  accept="image/*"
                  onChange={handleTrustFactrImage}
                  mb={1}
                  multiple
                />
                
                <Flex wrap="wrap">
                  {galleryUrl &&
                    galleryUrl?.map((e, i) => (
                      <Flex key={i} alignItems="center" position="relative">
                        <Image src={e} w={"200px"} />
                        <Input
                          value={galleryText[i]}
                          onChange={(event) => handleTrFacText(event, i)}
                        />
                        <MdDelete
                          size={"40px"}
                          color="red"
                          cursor="pointer"
                          top={0}
                          right={1}
                          zIndex={1}
                          onClick={() => handleDeleteTrustFactrImage(i)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "0",
                            marginTop: "-5px",
                            marginRight: "-8px",
                          }}
                        />
                      </Flex>
                    ))}
                  {item?.gallery &&
                    item.gallery.map((e, i) => (
                      <Flex key={i} alignItems="center" position="relative">
                        <Image src={`${url}/home/${e}`} w={"200px"} />
                        <Input
                          value={item.gallery_alt[i]}
                          onChange={(event) => handleTfimgText(event, i)}
                          maxLength={15}
                        />
                        <MdDelete
                          size={"40px"}
                          color="red"
                          cursor="pointer"
                          top={0}
                          right={1}
                          zIndex={1}
                          onClick={() => handleDeleteDBgalleryImage(i)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "0",
                            marginTop: "-5px",
                            marginRight: "-8px",
                          }}
                        />
                      </Flex>
                    ))}
                </Flex>
              </FormControl>

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

export default EditHome;
