import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewBlog = () => {
  const navigate = useNavigate();
  const { slugname } = useParams();
  const [blog, setBlog] = useState({});
  const url = process.env.REACT_APP_DEV_URL;

  const getBlog = async () => {
    try {
      let data = await fetch(`${url}/blog/${slugname}`);
      data = await data.json();
      console.log(data.data);
      setBlog(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      let data = await fetch(`${url}/blog/delete/${slugname}`, {
        method: "DELETE",
      });
      data = await data.json();
      console.log(data);
      navigate("/admin/blog");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlog();
  }, []);
  return (
    <>
   
    <Box textAlign={"left"} p="4" ml={5}>
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Blog Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/blog/edit/${slugname}`)}
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
        {blog?.meta_title}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Meta Description
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {blog?.meta_description}
      </Box>
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
        {blog?.name}
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
        {url + "/blog/" + blog?.slug}
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
        {blog?.category?.name}
      </Text>
      <br />

      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Banner Image
      </Text>
      <Image src={`${url}/blog/${blog?.banner_image}`} />
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        First Text
      </Text>
      <br />

      <br />
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        // fontSize={"medium"}
      >
        <div dangerouslySetInnerHTML={{__html:blog?.text1}} >
          
        </div>
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        First Image
      </Text>
      <Image src={`${url}/blog/${blog?.first_image}`} />
      <br />

      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Second Image
      </Text>
      <Image src={`${url}/blog/${blog?.second_image}`} />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Second Text
      </Text>
      <br />
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        dangerouslySetInnerHTML={{ __html: blog?.text2 }}
        fontSize={"medium"}
      ></Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Third Image
      </Text>
      <Image src={`${url}/blog/${blog?.third_image}`} />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Third Text
      </Text>
      <br />
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        dangerouslySetInnerHTML={{ __html: blog?.text3 }}
        fontSize={"medium"}
      ></Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Created at
      </Text>
      {blog?.createdAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(blog.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Updated at
      </Text>
      {blog?.modifiedAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(blog.modifiedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
    </Box>
      
    </>
  );
};

export default ViewBlog;
