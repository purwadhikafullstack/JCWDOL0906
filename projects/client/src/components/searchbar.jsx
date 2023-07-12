import React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, children, ...rest } = props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("black", "black");
  const inputBg = useColorModeValue("blue.100", "black");
  return (
    <InputGroup borderRadius='8px' w='200px' {...rest}>
      <InputLeftElement
        children={
          <IconButton
            bg='inherit'
            borderRadius='10px'
            _hover='none'
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparant",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={
              <SearchIcon color={searchIconColor} w='15px' h='15px' />
            }></IconButton>
        }
      />
      <Input
        placeholder="type here..."
        variant='search'
        fontSize='sm'
        bg={inputBg}
        color='black'
        _placeholder={{color : 'inherit'}}
      />
    </InputGroup>
  );
}