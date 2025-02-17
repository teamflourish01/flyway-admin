import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

const Pages = () => {
  const [item, setItem] = useState([]);
  const [newsheading, setNewsheading] = useState([]);
  const [homeItem, sethomeItem] = useState([]);
  const [whyChooseUs, setWhyChooseUs] = useState([]);
  const [policy, setPolicy] = useState([]);
  const [terms, setTerms] = useState([]);
  const [refund, setRefund] = useState([]);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  useEffect(() => {
    const getAboutus = async () => {
      try {
        const response = await fetch(`${url}/aboutus`);
        const data = await response.json();
        setItem(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getNewsHeading = async () => {
      try {
        let res = await fetch(`${url}/newsheading`);
        const data = await res.json();
        setNewsheading(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getHome = async () => {
      try {
        let res = await fetch(`${url}/home`);
        const data = await res.json();
        sethomeItem(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getHomeBenifits = async () => {
      try {
        let res = await fetch(`${url}/whychoose`);
        const data = await res.json();
        setWhyChooseUs(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getPrivacyPolicyData = async () => {
      try {
        let res = await fetch(`${url}/policy`);        
        let data = await res.json();
        setPolicy(data.data);
        console.log("policy Data",data);
        
      } catch (error) {
        console.error(error);
      }
    };
    const getTermsConditionData = async () => {
      try {
        let res = await fetch(`${url}/termscondition`);        
        let data = await res.json();
        setTerms(data.data);
        console.log("policy Data",data);
        
      } catch (error) {
        console.error(error);
      }
    };
    const getRefundPolicyData = async () => {
      try {
        let res = await fetch(`${url}/refundpolicy`);        
        let data = await res.json();
        setRefund(data.data);
        console.log("policy Data",data);
        
      } catch (error) {
        console.error(error);
      }
    };
    getAboutus();
    getNewsHeading();
    getHome();
    getHomeBenifits();
    getPrivacyPolicyData();
    getTermsConditionData();
    getRefundPolicyData();
  }, []);

  return (
    <Box p="4">
      <br />
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <Thead bgColor={"black"}>
            <Tr>
              <Th color={"#add8e6"}>#</Th>
              <Th color={"#add8e6"}>Page Name</Th>
              <Th color={"#add8e6"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td> 1 </Td>
              <Td>About Us Page</Td>
              <Td>
                <ButtonGroup>
                  <Button
                    leftIcon={<BiEditAlt />}
                    border="1px solid #add8e6"
                    variant={"outline"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    onClick={() =>
                      navigate(
                        `/admin/aboutus/edit/${item.length > 0 && item[0]._id}`
                      )
                    }
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td> 2 </Td>
              <Td>News & Events Heading Section</Td>
              <Td>
                <ButtonGroup>
                  <Button
                    leftIcon={<BiEditAlt />}
                    border="1px solid #add8e6"
                    variant={"outline"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    onClick={() =>
                      navigate(`/admin/newsheading/edit/${newsheading[0]?._id}`)
                    }
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td> 3 </Td>
              <Td>Home</Td>
              <Td>
                <ButtonGroup>
                  {/* <Button
                    leftIcon={<ViewIcon />}
                    bgColor={"black"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    variant="solid"
                    color="#add8e6"
                    onClick={() => navigate(`/admin/home/${homeItem[0]._id}`)}
                  >
                    View
                  </Button> */}
                  <Button
                    leftIcon={<BiEditAlt />}
                    border="1px solid #add8e6"
                    variant={"outline"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    onClick={() =>
                      navigate(`/admin/home/edit/${homeItem[0]?._id}`)
                    }
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td> 4 </Td>
              <Td>Privacy Policy</Td>
              <Td>
                <ButtonGroup>
                  <Button
                    leftIcon={<BiEditAlt />}
                    border="1px solid #add8e6"
                    variant={"outline"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    onClick={() =>
                      navigate(
                        `/admin/privacy/edit/${policy.length > 0 && policy[0]._id}`
                      )
                    }
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td> 5 </Td>
              <Td>Terms & Condition</Td>
              <Td>
                <ButtonGroup>
                  <Button
                    leftIcon={<BiEditAlt />}
                    border="1px solid #add8e6"
                    variant={"outline"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    onClick={() =>
                      navigate(
                        `/admin/terms/edit/${terms.length > 0 && terms[0]._id}`
                      )
                    }
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td> 6 </Td>
              <Td>Refund Policy</Td>
              <Td>
                <ButtonGroup>
                  <Button
                    leftIcon={<BiEditAlt />}
                    border="1px solid #add8e6"
                    variant={"outline"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    onClick={() =>
                      navigate(
                        `/admin/refund/edit/${refund.length > 0 && refund[0]._id}`
                      )
                    }
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <br />
    </Box>
  );
};

export default Pages;
