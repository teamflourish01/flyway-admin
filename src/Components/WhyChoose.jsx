import { AddIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import DeleteBtn from './DeleteBtn';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const WhyChoose = () => {
      const navigate = useNavigate();
      const [flag, setFlag] = useState(true);
      const [product, setProduct] = useState([]);
      const [page, setPage] = useState(1);
      const [search, setSearch] = useState("");
      const [count, setCount] = useState(0);
      const url = process.env.REACT_APP_DEV_URL;

      const handleDelete = async (id) => {
        try {
          let data = await fetch(`${url}/whychoose/delete/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          data = await data.json();
          getData();
          getCount();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };

      const getCount = async () => {
        try {
          let data = await fetch(`${url}/whychoose`);
          data = await data.json();
          console.log(data.data.length,"length");
          
          setCount(data.data.length);
        } catch (error) {
          console.log(error);
        }
      };

      const getData=async()=>{
        try {
            let data = await fetch(`${url}/whychoose`);
            data = await data.json();
            console.log(data, "data");
            setProduct(data.data);
            getCount()
          } catch (error) {
            console.log(error);
          }
      }
      useEffect(()=>{
        getData()
       
      },[])
    
    
  return (
    <Box p="4">
      <Flex gap={5} justifyContent={"space-between"}>
        <Button
          leftIcon={<AddIcon />}
          variant={"ghost"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          color="#add8e6"
          border={"1px solid #cfcccc"}
          onClick={() => navigate("/admin/whychoose/add")}
        >
          Add New
        </Button>
        {/* <Box>
          <span>Search:</span>
          <Input
            color={"black"}
            onBlur={() => setFlag(true)}
            w="150px"
            onChange={(e) => {
              setSearch(e.target.value);
              setFlag(false);
            }}
            value={search}
            onKeyUp={handleSearch}
          />
        </Box> */}
        {/* <Button border={"1px solid #cfcccc"} rightIcon={<DeleteIcon/>}>
            Bulk Delete
        </Button> */}
      </Flex>
      <br />
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <TableCaption
            borderTop={"1px solid #161616"}
            bgColor={"#add8e6"}
            color={"black"}
          >
            There Are {count} Reasons
          </TableCaption>
          <Thead bgColor={"black"}>
            <Tr>
              <Th color={"#add8e6"}>#</Th>
              <Th color={"#add8e6"}>Title</Th>
              <Th color={"#add8e6"}>Text</Th>
              <Th color={"#add8e6"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {product?.map((e, i) => {
              return (
                <Tr key={e._id}>
                  <Td> {i + 1} </Td>
                  <Td>{e?.title}</Td>
                  <Td>{e?.text}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        leftIcon={<ViewIcon />}
                        bgColor={"black"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        variant="solid"
                        color="#add8e6"
                        onClick={() => navigate(`/admin/whychoose/${e._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        leftIcon={<BiEditAlt />}
                        border="1px solid #add8e6"
                        variant={"outline"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        onClick={() =>
                          navigate(`/admin/whychoose/edit/${e._id}`)
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
     
    </Box>
  )
}

export default WhyChoose