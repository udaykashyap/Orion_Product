import { Button, Checkbox, Image, Td, Tr } from "@chakra-ui/react";
import React, { useState } from "react";

const TableCard = ({ handleCartData, ...el }) => {
  const [count, setCount] = useState(1);
  const handleChange = (e) => {
    if (e) {
      handleCartData(el);
    }
  };
  return (
    <Tr>
      <Td display={"flex"} alignItems={"center"} fontWeight={500}>
        <Image
          transition={"0.5s"}
          _hover={{ width: "100px", height: "100px" }}
          src={el.thumbnail}
          alt={el.title}
          width={"50px"}
          h={"50px"}
          marginRight="10px"
        />

        {el.title}
      </Td>
      <Td textAlign={"center"}>{el.brand}</Td>
      <Td textAlign="center">{el.description}</Td>
      <Td textAlign="center">{el.rating}</Td>
      <Td textAlign="center" color={"blue.400"} fontWeight={800}>
        ₹{+el.price}
      </Td>

      <Td textAlign={"center"}>
        <Button
          width="10px"
          h={"20px"}
          padding={0}
          _hover={{ bgColor: "blue.500", color: "white" }}
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </Button>
        {count}
        <br />
        <Button
          width="10px"
          h={"20px"}
          padding={0}
          _hover={{ bgColor: "blue.500", color: "white" }}
          isDisabled={count === 1}
          onClick={() => setCount((prev) => prev - 1)}
        >
          -
        </Button>
      </Td>
      <Td>
        <Button
          onClick={() =>
            alert(el.title + el.description + " Added To the cart")
          }
          _hover={{ bgColor: "blue.500", color: "white" }}
        >
          Add to Cart
        </Button>
      </Td>
      <Td>
        <Checkbox
          onChange={(e) => {
            handleChange(e.target.checked);
          }}
          colorScheme="blue"
        ></Checkbox>
      </Td>
    </Tr>
  );
};

export default TableCard;
