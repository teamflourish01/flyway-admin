import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Image,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
const Price = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const url = process.env.REACT_APP_DEV_URL;

  const handleDelete = async (id) => {
    try {
      let data = await fetch(`${url}/price/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      getTestimonials();
      getCount();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async () => {
    try {
      let data = await fetch(`${url}/price`);
      data = await data.json();
      setCount(data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getTestimonials = async () => {
    try {
      let data = await fetch(`${url}/price?page=${page}`);
      data = await data.json();
      console.log(data, "data");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTestimonials();
    getCount();
  }, [page]);
  return (
    <div>
      <Box p="4">
        <Flex gap={5} justifyContent={"space-between"}>
          <Button
            leftIcon={<AddIcon />}
            variant={"ghost"}
            bgColor={"black"}
            _hover={{ color: "black", bgColor: "#add8e6" }}
            color="#add8e6"
            border={"1px solid #cfcccc"}
            onClick={() => navigate("/admin/price/add")}
          >
            Add New
          </Button>
          
        </Flex>
        <br />
        <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
          <Table variant="simple">
            <TableCaption
              borderTop={"1px solid #161616"}
              bgColor={"#add8e6"}
              color={"black"}
            >
              There Are {count} Price
            </TableCaption>
            <Thead bgColor={"black"}>
              <Tr>
                <Th color={"#add8e6"}>#</Th>
                <Th color={"#add8e6"}>Name</Th>
                <Th color={"#add8e6"}>Flat Price</Th>
                <Th color={"#add8e6"}>Discounted Price</Th>
                <Th color={"#add8e6"}>Actions</Th>

              </Tr>
            </Thead>
            <Tbody>
              {product?.map((e, i) => {
                return (
                  <Tr key={e._id}>
                    <Td> {i + 1} </Td>
                    <Td>{e?.name}</Td>
                    <Td>{e?.flatPrice}</Td>
                    <Td>{e?.discPrice}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          leftIcon={<ViewIcon />}
                          bgColor={"black"}
                          _hover={{ bgColor: "#add8e6", color: "black" }}
                          variant="solid"
                          color="#add8e6"
                          onClick={() =>
                            navigate(`/admin/price/${e._id}`)
                          }
                        >
                          View
                        </Button>
                        <Button
                          leftIcon={<BiEditAlt />}
                          border="1px solid #add8e6"
                          variant={"outline"}
                          _hover={{ bgColor: "#add8e6", color: "black" }}
                          onClick={() =>
                            navigate(`/admin/price/edit/${e._id}`)
                          }
                        >
                          Edit
                        </Button>
                        <DeleteBtn handleDelete={() => handleDelete(e._id)} />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <br />
        <Flex justifyContent={"center"}>
          {flag && (
            <div>
              <Button
                border="1px solid #add8e6"
                bgColor={"black"}
                isDisabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <BsArrowLeft color="#add8e6" />
              </Button>
              <Button>{page}</Button>
              <Button
                variant={"outline"}
                border="1px solid #add8e6"
                bgColor={"black"}
                isDisabled={page >= count / 12}
                onClick={() => setPage(page + 1)}
              >
                <BsArrowRight color="#add8e6" />
              </Button>
            </div>
          )}
        </Flex>
      </Box>
    </div>
  );
};

export default Price;
