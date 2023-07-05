import { Button, Collapse, Flex, HStack, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue, Image } from '@chakra-ui/react';

import React from 'react'

const TableCRUD = ({ menu, data, header, dataFill, action, activePage}) => {
    console.log(action)
    const textColor = useColorModeValue("gray.700", "white");
    const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textTableColor = useColorModeValue("gray.500", "white");
    // const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <>
            {
                data.length > 0 ? <Table>
                    <Thead>
                        <Tr bg={tableRowColor}>
                            <Th color='gray.400' borderColor={borderColor}>
                                No
                            </Th>
                            {
                                header.map(i => <Th color='gray.400' borderColor={borderColor}>
                                    {i}
                                </Th>)
                            }

                            <Th color='gray.400' borderColor={borderColor} isNumeric>
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
                                        fontSize='sm'
                                        fontWeight='bold'
                                        borderColor={borderColor}
                                        border={index === arr.length - 1 ? "none" : null}>
                                        {(activePage - 1) * 5 + index + 1}
                                    </Td>
                                    {dataFill.map(i => <Td
                                        color={textTableColor}
                                        fontSize='sm'
                                        border={index === arr.length - 1 ? "none" : null}
                                        borderColor={borderColor}>
                                        { i === "image" ?
                                        <Image boxSize='50px'
                                        src= {el[i]} />: el[i]}
                                    </Td>)}
                                    {menu === "category" ?
                                        <Td
                                            color={textTableColor}
                                            fontSize='sm'
                                            border={index === arr.length - 1 ? "none" : null}
                                            borderColor={borderColor} isNumeric>
                                            <HStack spacing='5px'>
                                                <Button colorScheme='teal' onClick={action[1]} id={el.id}>
                                                    Update
                                                </Button>
                                                <Button colorScheme='red' onClick={action[2]} id={el.id}>
                                                    Delete
                                                </Button>
                                            </HStack>
                                        </Td> :
                                        <Td
                                            color={textTableColor}
                                            fontSize='sm'
                                            border={index === arr.length - 1 ? "none" : null}
                                            borderColor={borderColor} isNumeric>
                                            <Button colorScheme='teal' onClick={action[0]} id={el.id}>
                                                Edit
                                            </Button>
                                        </Td>
                                    }

                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table> : <Table>
                    <Tr><Td color={textTableColor}
                        fontSize='sm'
                        fontWeight='bold'
                        borderColor={borderColor}>Data Not Found</Td></Tr>
                </Table>
            }
        </>
    )
}

export default TableCRUD