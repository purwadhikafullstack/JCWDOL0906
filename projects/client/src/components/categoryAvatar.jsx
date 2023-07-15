import { Avatar, Box, Flex, keyframes, Text, VStack } from "@chakra-ui/react";
import React from "react";

const AvatarCategory = ({ image, name }) => {
  const size = "96px";
  const color = "teal";

  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="150px"
      w="150px"
      overflow="hidden"
    >
      {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
      <VStack>
        <Box
          as="div"
          position="relative"
          w={size}
          h={size}
          _before={{
            content: "''",
            position: "relative",
            display: "block",
            width: "300%",
            height: "300%",
            boxSizing: "border-box",
            marginLeft: "-100%",
            marginTop: "-100%",
            borderRadius: "50%",
            bgColor: color,
            animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
          }}
        >
          <Avatar src={image} size="full" position="absolute" top={0} />
        </Box>
        <Text
          color={"blue.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize="9px"
          letterSpacing={1.1}
          textAlign="center"
        >
          {name}
        </Text>
      </VStack>
    </Flex>
  );
};

export default AvatarCategory;
