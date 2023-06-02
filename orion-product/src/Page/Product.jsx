import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TableCard from "../Components/TableCard";

const Product = () => {
  const [totalData, setTotalData] = useState([]);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);

  //Getting Data ------------------------------------------
  const getData = async (q = "") => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${q}&limit=100`
      );
      const data = await res.json();
      //   console.log(data.products);
      setTotalData(data.products);
      //   console.log(totalData);
    } catch (error) {
      console.log(error);
    }
  };

  //Handling Scroll---------------------------------------
  const handleScroll = () => {
    const tableContainer = document.getElementById("tableContainer");
    const scrollPosition = tableContainer.scrollTop;
    const containerHeight = tableContainer.clientHeight;
    const tableBodyHeight = tableContainer.scrollHeight;
    // console.log(containerHeight, scrollPosition, tableBodyHeight);

    if (
      scrollPosition + containerHeight + 1 >= tableBodyHeight &&
      totalData.length > 19
    ) {
      setTimeout(() => {
        setPage((prev) => Math.min(prev + 1, 5));
        tableContainer.scrollTo(0, tableBodyHeight * 0.01);
      }, [2000]);
    } else if (scrollPosition === 0) {
      setTimeout(() => {
        setPage((prev) => Math.max(prev - 1, 1));
      }, 1000);
    }
  };

  const handleRest = () => {
    document.getElementById("type").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("gender").value = "";
    getData();
  };

  const handleCart = () => {
    if (cart.length < 1) {
      alert("No Data Selected");
    } else {
      alert(cart.length + "data is added");
      console.log(cart);
    }
  };
  const handleCartData = (val) => {
    setCart([...cart, val]);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.addEventListener("scroll", handleScroll);
    return () => tableContainer.removeEventListener("scroll", handleScroll);
  }, [totalData]);
  return (
    <Box width={"100%"} padding={0} margin={0}>
      <Heading
        background={"linear-gradient(90deg, red, black)"}
        backgroundClip="text"
        textFillColor=" transparent"
        fontFamily={"serif"}
        marginTop={"10px"}
      >
        Orion Products
      </Heading>
      <hr />

      <Box
        width={"90%"}
        // h={"100vh"}
        // border={"1px solid black"}
        margin={"auto"}
        marginTop={"5%"}
        padding={"20px"}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <Box
          width={"80%"}
          margin={"auto"}
          display={"flex"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Text>Filter</Text>
          <Select
            id="brand"
            placeholder="Brands"
            onChange={(e) => {
              getData(e.target.value);
              setPage(1);
            }}
          >
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Oppo">Oppo</option>
            <option value="TC Reusable">TC Reusable</option>
          </Select>
          <Select
            id="gender"
            placeholder="Gender"
            onChange={(e) => {
              getData(e.target.value);
              setPage(1);
            }}
          >
            <option value="Girl">Girl</option>
            <option value="women">Women</option>
            <option value="man">Man</option>
          </Select>
          <Select
            id="type"
            placeholder="Type"
            onChange={(e) => {
              getData(e.target.value);
              setPage(1);
            }}
          >
            <option value="Jewellery">Jewellery</option>
            <option value="Phone">Phone</option>
            <option value="Watch">Watch</option>
          </Select>
          <Button onClick={handleRest}>↻</Button>
          <Input
            border={"2px solid black"}
            borderRadius={"0px"}
            placeholder="Search Product"
            onChange={(e) => {
              getData(e.target.value);
              setPage(1);
            }}
          />
        </Box>

        <Box id="tableContainer" maxHeight="60vh" overflowY="auto">
          <Table>
            <Thead position="sticky" top={0} zIndex={9} background="white">
              <Tr textAlign={"center"}>
                <Th textAlign={"center"}>Image</Th>
                <Th textAlign={"center"}>Title</Th>
                <Th textAlign={"center"}>Brand</Th>
                <Th textAlign={"center"}>Description</Th>
                <Th isNumeric textAlign={"center"}>
                  Rating
                </Th>
                <Th isNumeric textAlign={"center"}>
                  Price
                </Th>
                <Th textAlign={"center"}>Buy</Th>
                <Th textAlign={"center"}>Add to Cart</Th>
                <Th textAlign={"center"}>Select</Th>
              </Tr>
            </Thead>
            <Tbody>
              {totalData.length > 0 &&
                totalData
                  .slice(page * 20 - 20, page * 20)
                  .map((el) => (
                    <TableCard
                      key={el.id}
                      handleCartData={handleCartData}
                      {...el}
                    />
                  ))}
            </Tbody>
          </Table>
        </Box>
        <Box width={"10%"} margin={"auto"} marginTop={"30px"}>
          <Button
            onClick={handleCart}
            bgColor={"blue.500"}
            color={"white"}
            _hover={{ bgColor: "blue.500", color: "white" }}
          >
            Add Selected to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
