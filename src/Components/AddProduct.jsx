import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
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
import React, { useEffect, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import EditPermalink from "./EditPermalink";
import generateSlug from "../util/generateSlug";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

const AddProduct = () => {
  const url = process.env.REACT_APP_DEV_URL;
  const [category, setCategory] = useState([]);
  const [imageurl, setImageurl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const toast = useToast();
  const [markImage, setMarkImage] = useState([]);
  const [markUrl, setMarkUrl] = useState([]);
  const [newParameter, setNewParameter] = useState("");
  const [newValue, setNewValue] = useState("");
  const [feature, setFeature] = useState({});
  const [featureParam, setFeatureParam] = useState("");
  const [featureValue, setFeatureValue] = useState("");
  const [detail, setDetail] = useState({});
  const [detailParameter, setDetailParameter] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    image: [],
    image_alt: [],
    text1: "",
    text2: "",
    text3: "",
    slug: "",
    meta_title: "",
    meta_description: "",
  });
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

  const [spec, setSpec] = useState({});
  const [slug, setSlug] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const navigate = useNavigate();

  let formData = new FormData();
  const getCategory = async () => {
    try {
      let data = await fetch(`${url}/category`);
      data = await data.json();
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImgText = (event, i) => {
    let imgText = [...product.image_alt];
    imgText[i] = event.target.value;
    setProduct({ ...product, image_alt: imgText });
  };

  const handleImageLocal = (i) => {
    console.log(i);
    let dup = [...imageurl];
    dup.splice(i, 1);
    setImageurl(dup);
    let dupImage = [...image];
    dupImage.splice(i, 1);
    setImage(dupImage);

    let dupText = [...product.image_alt];
    dupText.splice(i, 1);
    setProduct({ ...product, image_alt: dupText });
  };

  const handleImageChanger = (e) => {
    let file = e.target.files[0];
    setImage([...image, file]);
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        setImageurl([...imageurl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const submitFile = async () => {
    for (let x of image) {
      formData.append("image", x);
    }
    try {
      let data = await axios.post(`${url}/product/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data.data);
      return data.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    let dup = { ...product };
    ///// image upload here
    let formData = new FormData();

    let newSlug = generateSlug(slug);
    dup.slug = newSlug;
    dup.text1 = text1;
    dup.text2 = text2;
    dup.text3 = text3;
    if(image.length>0){
      for(let x of image){
       formData.append("image",x)
     }
    }
    formData.append("dup", JSON.stringify(dup));
    // console.log(formData.entries());

    try {
      let res = await axios.post(`${url}/product/add`, formData );

      console.log(res,"res");
      if (res.status==200) {
        toast({
          title: "Product Added",
          description: res.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/product");
      } else {
        toast({
          title: "Product Not Added ",
          description: res.data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <Box p="4">
      <form encType="multipart/form-data" onSubmit={(e) => handleAdd(e)}>
        <Flex
          justifyContent={"space-around"}
          gap="40px"
          flexDirection={["column", "column", "column", "row", "row"]}
        >
          <Box
            backgroundColor={"white"}
            w={["100%", "100%", "100%", "100%", "100%"]}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            borderRadius={"20px"}
          >
            <FormControl>
              <FormLabel color={"#add8e6"}>Meta Title</FormLabel>
              <Input
                variant={"flushed"}
                type="text"
                name="meta_title"
                value={product.meta_title}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel color={"#add8e6"}>Meta Description</FormLabel>
              <Textarea
                variant="flushed"
                name="meta_description"
                value={product.meta_description}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel color={"#add8e6"}>Name</FormLabel>
              <Input
                required
                variant={"flushed"}
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => {
                  handleChange(e);
                  setSlug(generateSlug(e.target.value));
                }}
                maxLength={40}
              />
            </FormControl>
            <br />
            <EditPermalink slug={slug} folder={"product"} setSlug={setSlug} />

            {/* <FormControl isRequired>
          <FormLabel color={"#add8e6"}> Caption</FormLabel>
          <Input
            required
            variant={"flushed"}
            type="text"
            name="caption"
            value={product.caption}
            onChange={(e) => handleChange(e)}
          />
        </FormControl>
        <br /> */}
            <FormControl>
              <FormLabel color={"#add8e6"}>Category</FormLabel>
              <select
                style={{
                  width: "200px",
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid #add8e6",
                  borderRadius: "20px",
                }}
                onChange={(e) => {
                  setProduct({ ...product, category: e.target.value });
                }}
              >
                <option>Select</option>
                {category &&
                  category.map((e) => (
                    <option key={e?._id} value={e?._id}>
                      {e?.name}
                    </option>
                  ))}
              </select>
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel color={"#add8e6"}>Description</FormLabel>
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
            w={["100%", "100%", "100%", "100%", "100%"]}
            borderRadius={"20px"}
          >
            <FormControl isRequired>
              <FormLabel color={"#add8e6"}>Product Images</FormLabel>
              {imageurl &&
                imageurl.map((e, i) => {
                  return (
                    <div key={i}>
                      <Flex gap="20px">
                        <Box>
                          <Image src={e} width="200px" />
                          <Input
                            value={product.image_alt[i]}
                            onChange={(event) => handleImgText(event, i)}
                            placeholder="Add IMG ALT Text"
                          />
                          <br />
                        </Box>
                        <MdDelete
                          color="red"
                          cursor={"pointer"}
                          size={"30px"}
                          onClick={() => handleImageLocal(i)}
                        />
                      </Flex>
                    </div>
                  );
                })}
              <br />

              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChanger(e)}
              />

              <Text>
                <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                Should Be Less than 500KB and 200x200px size will allow Only
              </Text>
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
            <FormControl>
              <FormLabel color={"#add8e6"}>Second Text</FormLabel>
              <ReactQuill
                modules={module}
                theme="snow"
                value={text2}
                onChange={setText2}
              />
            </FormControl>
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
            variant={"solid"}
            bgColor={"black"}
            type="submit"
            color="#add8e6"
            _hover={{
              color: "black",
              bgColor: "#add8e6",
              border: "1px solid #add8e6",
            }}
            leftIcon={isLoading && <Spinner color="blue.500" />}
            // onClick={() => submitFile().then((res) => handleAdd(res))}

            // isDisabled={!product.name}
          >
            Add New
          </Button>
        </center>
      </form>
    </Box>
  );
};

export default AddProduct;
