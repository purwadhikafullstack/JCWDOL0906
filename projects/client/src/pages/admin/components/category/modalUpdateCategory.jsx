import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const ModalUpdateCategory = ({
	Open,
	Close,
	isError,
	Title,
	Cancel,
	Submit,
}) => {
	return (
		<>
			<Modal
				isOpen={Open}
				onClose={Close}
				size='md'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{Title}</ModalHeader>
					<ModalCloseButton onClose={Close} />
					<ModalBody pb={6}>
						<FormControl isInvalid={isError}>
							<FormLabel>Category Name</FormLabel>
							<Input
								type='text'
								placeholder='Category Name'
								id='category_name'
							/>
							{isError ? (
								<FormErrorMessage>Field is required.</FormErrorMessage>
							) : (
								""
							)}
						</FormControl>
						<FormControl isInvalid={isError}>
							<FormLabel>Image</FormLabel>
							<Input
								type='file'
								placeholder='Image'
								id='image'
							/>
							{isError ? (
								<FormErrorMessage>Field is required.</FormErrorMessage>
							) : (
								""
							)}
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={Submit}>
							Save
						</Button>
						<Button onClick={Cancel}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default ModalUpdateCategory;
