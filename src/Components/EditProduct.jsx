import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import EditPermalink from "./EditPermalink";
import generateSlug from "../util/generateSlug";
import ReactQuill from "react-quill";
import "../styles/checkbox.css";
import switchAudio from "../audio/light-switch.mp3";

const EditProduct = () => {
  const { slugname } = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([]);
  const [spec, setSpec] = useState({});
  const [newParameter, setNewParameter] = useState("");
  const [newValue, setNewValue] = useState("");
  const [dataUrl, setDataUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [markUrl, setMarkUrl] = useState([]);
  const [mark, setMark] = useState([]);
  const [markText, setMarkText] = useState([]);
  const [imgText, setImgText] = useState([]);
  const [detail, setDetail] = useState({});
  const [detailParameter, setDetailParameter] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [feature, setFeature] = useState({});
  const [featureParameter, setFeatureParameter] = useState("");
  const [featureValue, setFeatureValue] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [price, setPrice] = useState([]);
  const [service, setService] = useState([]);
  let audio = new Audio(switchAudio);

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

  //                         getting data

  const getCategory = async () => {
    try {
      let data = await fetch(`${url}/category`);
      data = await data.json();
      console.log(data.data);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      let data = await fetch(`${url}/product/${slugname}`);
      data = await data.json();
      console.log(data);
      setProduct(data.data);
      setText1(data?.data.text1);
      setText2(data?.data.text2);
      setText3(data?.data.text3);
      setSlug(data.data?.slug);
    } catch (error) {
      console.log(error);
    }
  };

  //                    handle changer

  const addNewEntry = () => {
    if (newParameter && newValue) {
      setSpec((prevData) => ({
        ...prevData,
        [newParameter]: newValue,
      }));
      setNewParameter("");
      setNewValue("");
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleValueChange = (parameter, value) => {
    setSpec((prevData) => ({
      ...prevData,
      [parameter]: value,
    }));
  };

  const handleImageLocal = (index) => {
    // let dup = [...image];
    // let dupUrl = [...dataUrl];
    // let dupText = [...imgText];
    // dupText.splice(i, 1);
    // dup.splice(i, 1);
    // dupUrl.splice(i, 1);
    // setImage(dup);
    // setDataUrl(dupUrl);
    // setImgText(dupText);

    // //remove image_Alt
    // let dupProductAlt = [...product.image_alt];
    // dupProductAlt.splice(i, 1);
    // setProduct({ ...product, image_alt: dupProductAlt });

    setImage((prev) => prev.filter((_, i) => i !== index));
    setDataUrl((prev) => prev.filter((_, i) => i !== index));
    setImgText((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImage = (index) => {
    let dup = [...product.image];
    dup.splice(index, 1);

    // Remove imag_alt
    let dupProductAlt = [...product.image_alt];
    dupProductAlt.splice(index, 1);
    setProduct({ ...product, image: dup, image_alt: dupProductAlt });
  };

  const handleFileChanger = (e) => {
    let file = e.target.files[0];
    console.log(file);
    // setImage(file);
    setImage([...image, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        // setDataUrl(reader.result);
        setDataUrl([...dataUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleMarkText = (e, i) => {
    // let markText = [...product.mark_text];
    // markText[i] = e.target.value;
    // setProduct({ ...product, mark_text: markText });
    let marktext = [...markText];
    marktext[i] = e.target.value;
    setMarkText([...marktext]);
  };
  const handleImgText = (e, i) => {
    let imagetext = [...imgText];
    imagetext[i] = e.target.value;
    setImgText([...imagetext]);
  };

  const handleImgTextData = (e, i) => {
    let dup = [...product.image_alt];
    dup[i] = e.target.value;
    setProduct({ ...product, image_alt: dup });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    debugger;
    if (!slug) {
      toast({
        title: "Please Add Slug",
        description: "Permalink is Required please add",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
      return;
    }
    let formData = new FormData();
    let dup = { ...product };
    if (text1) {
      dup.text1 = text1;
    }
    if (text2) {
      dup.text2 = text2;
    }
    if (text3) {
      dup.text3 = text3;
    }
    if (image.length > 0) {
      // dup.image=[...dup.image,...image]
      for (let x of image) {
        formData.append("image", x);
      }
    }
    if (imgText.length > 0) {
      dup.image_alt = [...dup.image_alt, ...imgText];
    }

    let newSlug = generateSlug(slug);
    dup.slug = newSlug;
    console.log(dup, "dup");
    formData.append("dup", JSON.stringify(dup));
    try {
      let response = await axios.post(
        `${url}/product/edit/${slugname}`,
        formData
      );
      if (response.status == 200) {
        toast({
          title: "Product Edited Successfully",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/product");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Product Not Edited ",
        description: error.response?.data?.msg || "An error occurred",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };
  const handleServiceCheck = (e) => {
    audio.play();
    let updatedProduct = [...product.service];
    let index = updatedProduct?.findIndex((i) => i._id == e._id);
    console.log(index);
    if (index > -1) {
      updatedProduct.splice(index, 1);
    } else {
      if (updatedProduct.length >= 4) {
        updatedProduct.pop();
      } else {
        // setProduct([...product, e._id]);
        updatedProduct.push(e);
      }
    }
    setProduct({ ...product, service: updatedProduct });
  };
  const handleMenuCheck = (e) => {
    audio.play();

    let updatedProduct = [...product.price];
    console.log(updatedProduct, "updatedProduct");

    let index = updatedProduct?.findIndex((i) => i._id == e._id);
    console.log(index);
    if (index > -1) {
      updatedProduct.splice(index, 1);
    } else {
      if (updatedProduct.length >= 4) {
        updatedProduct.pop();
      } else {
        // setProduct([...product, e._id]);
        updatedProduct.push(e);
      }
    }
    setProduct({ ...product, price: updatedProduct });
  };
  const getServiceCheck = useCallback(
    (id) => {
      let exist = product.service?.findIndex((e) => e._id === id);
      if (exist > -1) {
        return true;
      } else {
        return false;
      }
    },
    [product.service]
  );
  const getMenuCheck = useCallback(
    (id) => {
      let exist = product.price?.findIndex((e) => e._id === id);
      if (exist > -1) {
        return true;
      } else {
        return false;
      }
    },
    [product.price]
  );
  const getData = async () => {
    try {
      let data = await fetch(`${url}/price`);
      data = await data.json();
      console.log(data.data);
      setPrice(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getService = async () => {
    try {
      let data = await fetch(`${url}/service`);
      data = await data.json();
      console.log(data.data);
      setService(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    getCategory();
    getData();
    getService();
  }, []);

  return (
    <Box>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <Flex justifyContent={"space-around"} gap="20px" padding={"10px"}>
          <Box
            backgroundColor={"white"}
            w="700px"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            borderRadius={"20px"}
          >
            <FormControl isRequired>
              <FormLabel>Meta Title</FormLabel>
              <Input
                variant={"flushed"}
                type="text"
                name="meta_title"
                value={product.meta_title}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Meta Description</FormLabel>
              <Textarea
                variant="flushed"
                name="meta_description"
                value={product.meta_description}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                variant={"flushed"}
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => handleChange(e)}
                maxLength={40}
              />
            </FormControl>
            <br />
            <EditPermalink slug={slug} setSlug={setSlug} folder={"product"} />
            <FormControl>
              <FormLabel>Category</FormLabel>
              <select
                style={{
                  width: "200px",
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid #add8e6",
                  borderRadius: "20px",
                }}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                <option value={product?.category?._id}>
                  {product?.category?.name}
                </option>
                {category &&
                  category.map((e) => (
                    <option key={e?._id} value={e?._id}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel color={"#add8e6"}>Language</FormLabel>
              <select
                style={{
                  width: "200px",
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid #add8e6",
                  borderRadius: "20px",
                }}
                onChange={(e) => {
                  setProduct({ ...product, language: e.target.value });
                }}
              >
                <option value={product?.language}>{product?.language}</option>
                <option value="English">English</option>
                <option value="Gujarati">Gujarati</option>
              </select>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel color={"#add8e6"}>Type</FormLabel>
              <select
                style={{
                  width: "200px",
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid #add8e6",
                  borderRadius: "20px",
                }}
                onChange={(e) => {
                  setProduct({ ...product, type: e.target.value });
                }}
              >
                <option value={product?.type}>{product?.type}</option>
                <option value="Video">Video</option>
                <option value="PDF">PDF</option>
              </select>
            </FormControl>
            <br />
            <FormControl >
              <FormLabel>Video Url</FormLabel>
              <Input
                variant={"flushed"}
                type="text"
                name="videoLink"
                value={product?.videoLink}
                onChange={(e) => handleChange(e)}
                maxLength={40}
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                variant="flushed"
                name="description"
                value={product.description}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <br />
          </Box>
          <Box
            backgroundColor={"white"}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            borderRadius={"20px"}
            width={"50%"}
          >
            <FormControl isRequired>
              <FormLabel>Product Image</FormLabel>
              {dataUrl &&
                dataUrl?.map((e, i) => {
                  return (
                    <>
                      <Flex key={i}>
                        <Box>
                          <Image src={e} width="200px" />
                          <Input
                            value={imgText[i]}
                            onChange={(event) => handleImgText(event, i)}
                          />
                        </Box>
                        <MdDelete
                          color="red"
                          size={"30px"}
                          onClick={() => handleImageLocal(i)}
                        />
                      </Flex>
                    </>
                  );
                })}
              {product?.image &&
                product.image.map((e, i) => {
                  return (
                    <>
                      <Flex gap="20px">
                        <Box>
                          <Image width="200px" src={`${url}/product/${e}`} />
                          <Input
                            value={product?.image_alt[i]}
                            onChange={(event) => handleImgTextData(event, i)}
                          />
                        </Box>
                        <MdDelete
                          color="red"
                          cursor="pointer"
                          size={"30px"}
                          onClick={() => handleImage(i)}
                        />
                      </Flex>
                    </>
                  );
                })}
              <br />
              <input
                type="file"
                name="image"
                onChange={(e) => handleFileChanger(e)}
              />
              <Text>
                <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                Should Be Less than 500KB and 500x500px size will allow Only
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <SimpleGrid
                ml={["10%"]}
                columns={[1, 2, 3, 3, 4]}
                spacing={"40px"}
              >
                {price?.map((x, i) => (
                  <Flex gap="20px" alignItems={"center"}>
                    {/* <input
                            style={{}}
                            type="checkbox"
                            onChange={() => handleCheck(x)}
                            checked={getCheck(x._id)}
                          /> */}
                    <div class="checkbox-wrapper-55">
                      <label class="rocker rocker-small">
                        <input
                          type="checkbox"
                          onChange={() => handleMenuCheck(x)}
                          checked={getMenuCheck(x._id)}
                        />
                        <span class="switch-left">Yes</span>
                        <span class="switch-right">No</span>
                      </label>
                    </div>
                    <Text>{x?.name}</Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </FormControl>
            <FormControl>
              <FormLabel>Service</FormLabel>

              <SimpleGrid
                ml={["10%"]}
                columns={[1, 2, 3, 3, 4]}
                spacing={"40px"}
              >
                {service?.map((x, i) => (
                  <Flex gap="20px" alignItems={"center"}>
                    {/* <input
                                        style={{}}
                                        type="checkbox"
                                        onChange={() => handleCheck(x)}
                                        checked={getCheck(x._id)}
                                      /> */}
                    <div class="checkbox-wrapper-55">
                      <label class="rocker rocker-small">
                        <input
                          type="checkbox"
                          onChange={() => handleServiceCheck(x)}
                          checked={getServiceCheck(x._id)}
                        />
                        <span class="switch-left">Yes</span>
                        <span class="switch-right">No</span>
                      </label>
                    </div>
                    <Text>{x?.name}</Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </FormControl>
            <FormControl>
              <FormLabel color={"#add8e6"}>First Text</FormLabel>
              <ReactQuill
                modules={module}
                theme="snow"
                value={text1}
                onChange={setText1}
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel color={"#add8e6"}>Second Text</FormLabel>
              <ReactQuill
                modules={module}
                theme="snow"
                value={text2}
                onChange={setText2}
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel color={"#add8e6"}>Third Text</FormLabel>
              <ReactQuill
                modules={module}
                theme="snow"
                value={text3}
                onChange={setText3}
              />
            </FormControl>
          </Box>
        </Flex>
        <br />
        <center>
          <Button
            type="submit"
            variant={"solid"}
            bgColor={"#161616"}
            color="white"
            _hover={{
              color: "black",
              bgColor: "white",
              border: "1px solid #161616",
            }}
            leftIcon={isLoading && <Spinner color="blue.500" />}
            // onClick={() => handleUpdate()}
          >
            Save
          </Button>
        </center>
      </form>
    </Box>
  );
};

export default EditProduct;
