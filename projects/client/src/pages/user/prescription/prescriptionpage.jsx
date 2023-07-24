import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";

import { apiRequest } from "../../../helper/api";
import { swalFailed, swalSuccess } from "../../../helper/index";
import { useDispatch, useSelector } from "react-redux";
import { addCourier, addAddress } from "../../../redux/cartSlice";
import Swal from "sweetalert2";
import React from "react";

const ModalPrescription = () => {

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropBlur="2px"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const [isOpen, setIsOpen] = useState(false);
  const [courier, setCourier] = useState("JNE");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState([]);
  const userId = useSelector((state) => state.userSlice.value.id);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    if (userId) {
      setIsOpen(true);
    } else {
      Swal.fire(
        'Silahkan Daftar dan Masuk Kembali',
      )
    }
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const addPrescription = async () => {
    try {
      let image = document.getElementById("image").files[0];
      let address_id = document.getElementById("address_id").value;
      let formData = new FormData();
      let data = {
        createdBy: userId,
        user_id: userId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);
      formData.append("shipping", courier);
      formData.append("address_id", address_id);

      const tokenUser = JSON.parse(localStorage.getItem("user"));
      let result = await apiRequest.post("/prescription", formData, {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      });
      alert(result.data.message);
      Swal.fire({
        icon: "success",
        title: "Upload Prescription Success",
        customClass: {
          container: "my-swal",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed Attempt",
        text: error.message,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const getAddresses = async () => {
    try {

      const tokenUser = JSON.parse(localStorage.getItem("user"));
      const result = await apiRequest.get("/address", {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      });
      setAddress(result.data.data);
      const defaultAddress = address.filter((address) => {
        return address.is_default == true;
      });
      setSelectedAddress(defaultAddress[0]);
    } catch (error) {
    }
  };

  useEffect(() => {
    getAddresses();
  }, [userId]);

  return (
    <Box>
      <Button
        fontSize="20px"
        color="white"
        backgroundColor="blue.800"
        fontWeight="bold"
        onClick={() => {
          setOverlay(<OverlayTwo />);
          handleOpenModal();
        }}
      >
        Unggah Resep
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        {overlay}
        <ModalContent>
          <ModalHeader textAlign={"center"} color="blue.800">
            Unggah Resep Anda!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl>
              <FormLabel>Unggah Resep</FormLabel>
              <Input type="file" placeholder="Image" id="image" />
            </FormControl>
            <FormControl>
              <FormLabel>Alamat Pengiriman</FormLabel>
              <Select
                id="address_id"
                onChange={(e) => {
                  setSelectedAddress(address);
                  dispatch(addAddress({ address_id: address.id }));
                }}
              >
                {address.map((address, index) => (
                  <option key={address.id} value={address.id}>
                    {address.label +
                      " " +
                      address.address_name +
                      " " +
                      address.province_name +
                      " " +
                      address.city_name +
                      " " +
                      address.postal_code}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Jasa Kurir</FormLabel>
              <Select
                value={courier}
                onChange={(e) => {
                  setCourier(e.target.value);
                  dispatch(addCourier({
                    courier: e.target.value
                  }));
                }}
                id="shipping"
              >
                <option value="JNE">JNE</option>
                <option value="POS">POS</option>
                <option value="TIKI">TIKI</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              color="white"
              backgroundColor="blue.800"
              onClick={addPrescription}
            >
              Unggah Resep
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>
              Batalkan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ModalPrescription;
