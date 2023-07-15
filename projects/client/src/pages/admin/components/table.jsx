import {
  Button,
  Collapse,
  Flex,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Image,
  Box,
} from "@chakra-ui/react";

import React from "react";

const TableCRUD = ({ menu, data, header, dataFill, action, activePage, show, collapseId }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  function rupiah(price) {
    if (!price) price = 0;
    const priceString = price.toString();
    const len = priceString.length;
    let str = "";
    for (let i = 0; i < len; i++) {
      str += priceString[i];
      if ((len - i - 1) % 3 === 0 && i !== len - 1) {
        str += ".";
      }
    }
    return `Rp ${str}`;
  }


  return (
    <Box overflowX='scroll'>
      {data.length > 0 ? (
        <Table >
          <Thead>
            <Tr bg={tableRowColor}>
              <Th color="gray.400" borderColor={borderColor}>
                No
              </Th>
              {header.map((i, idx) => (
                <Th color="gray.400" borderColor={borderColor} key={idx}>
                  {i}
                </Th>
              ))}

              <Th color="gray.400" borderColor={borderColor} isNumeric>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((el, index, arr) => {
              return (
                <Tr key={index}>
                  <Td
                    color={textTableColor}
                    fontSize="sm"
                    fontWeight="bold"
                    borderColor={borderColor}
                    border={index === arr.length - 1 ? "none" : null}
                  >
                    {activePage ? (activePage - 1) * 6 + index + 1 : index + 1}
                  </Td>
                  {dataFill.map((i, idx) => (
                    <Td key={idx}
                      color={textTableColor}
                      fontSize="sm"
                      border={index === arr.length - 1 ? "none" : null}
                      borderColor={borderColor}
                    >
                      {i === "price" ? (
                        rupiah(el[i])
                      ) : i === "image" ? (
                        <Image
                          boxSize="100px"
                          objectFit="cover"
                          src={process.env.REACT_APP_IMAGE_API + el[i]}
                          alt=""
                        />
                      ) : (
                        el[i]
                      )}
                    </Td>
                  ))}
                  {menu === "product" ? (
                    <Td
                      color={textTableColor}
                      fontSize="sm"
                      border={index === arr.length - 1 ? "none" : null}
                      borderColor={borderColor}
                      isNumeric
                    >
                      <HStack spacing="5px">
                        <Button
                          colorScheme="teal"
                          onClick={action[0]}
                          id={el.id}
                        >
                          Update
                        </Button>
                        <Button
                          colorScheme="linkedin"
                          onClick={action[1]}
                          id={el.id}
                        >
                          Update Stock
                        </Button>
                        <Button
                          colorScheme="purple"
                          onClick={action[3]}
                          id={el.id}
                        >
                          Units
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={action[2]}
                          id={el.id}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Td>
                  ) : (
                    <Td
                      color={textTableColor}
                      fontSize="sm"
                      border={index === arr.length - 1 ? "none" : null}
                      borderColor={borderColor}
                      isNumeric
                    >
                      <Button colorScheme="teal" onClick={action[0]} id={el.id}>
                        Edit
                      </Button>
                    </Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      ) : (
        <Table>
          <Tbody>
            <Tr>
              <Td
                color={textTableColor}
                fontSize="sm"
                fontWeight="bold"
                borderColor={borderColor}
              >
                Data Not Found
              </Td>
            </Tr>
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default TableCRUD;
