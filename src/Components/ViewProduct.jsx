import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
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
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewProduct = () => {
  const { slugname } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const toast = useToast();
  const url = process.env.REACT_APP_DEV_URL;
  const handleDelete = async (id) => {
    try {
      let data = await fetch(`${url}/product/delete/${id}`, {
        method: "DELETE",
      });
      data = await data.json();
      console.log(data);
      navigate("/admin/product");
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      let data = await fetch(`${url}/product/${slugname}`);
      data = await data.json();
      console.log(data.data, "single");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Box textAlign={"left"} p="4" ml={5}>
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Product Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/product/edit/${slugname}`)}
        >
          Edit
        </Button>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<RiDeleteBin6Line />}
          onClick={() => handleDelete(slugname)}
        >
          Delete
        </Button>
      </Flex>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Meta Title
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {product?.meta_title}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Meta Description
      </Text>
      <Textarea
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        value={product?.description}
        fontSize={"medium"}
      />
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
        {product?.name}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        PermaLink
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {url + "/product/" + product?.slug}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Category
      </Text>
      <Text
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {product?.category?.name}
      </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Video Url
      </Text>
        <Text
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {product?.videoLink}
        </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Description
      </Text>
      <Textarea
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        value={product?.description}
        fontSize={"medium"}
      />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Image
      </Text>
      <SimpleGrid columns={[1, 1, 1, 2, 2]} rowGap={"9"}>
        {product?.image &&
          product?.image.map((e) => <Image src={`${url}/product/${e}`} />)}
      </SimpleGrid>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Image Alt Text
      </Text>

      {product?.image_alt?.map((e) => (
        <Text
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {e}
        </Text>
      ))}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Text 1 Description
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        dangerouslySetInnerHTML={{__html:product?.text1}}
        fontSize={"medium"}
      >
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Text 2 Description
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        dangerouslySetInnerHTML={{__html:product?.text2}}
        fontSize={"medium"}
      >
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Text 3 Description
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        dangerouslySetInnerHTML={{__html:product?.text3}}
        fontSize={"medium"}
      >
      </Box>
      <br />

      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Created at
      </Text>
      {product?.createdAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(product.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Updated at
      </Text>
      {product?.updatedAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(product.updatedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
    </Box>
  );
};

export default ViewProduct;
