import {
  Box,
  Button,
  Card,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TableCRUD from "../Modals/Table";
import axios from "axios";
import { swalFailed, swalSuccess } from "../Helper/index";
// import ModalEditForm from "../Modals/Modal";
import ModalProductDetail from "../Modals/ModalProduct";
import ModalAddProduct from "../Modals/ModalAddProduct";

const ProductList = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const [dataDetail, setDataDetail] = useState([]);
  const [description, indication, dose, rules] = useState({});
  const [NewProduct, setNewProduct] = useState("");
  const [productId, setProductId] = useState(0);
  const [products, setProducts] = useState(0);

  // const [defaultUnit, setDefaultUnit] = useState(0);
  // const [conversionUnitQty, setConversionUnitQty] = useState(0);
  // const [defaultUnitQty, setDefaultUnitQty] = useState(0);

  //Modal Events
  const { onOpen } = useDisclosure();
  // const modalUnits = useDisclosure();
  // const modalStock = useDisclosure();
  const modalAdd = useDisclosure();
  const modalDetail = useDisclosure();

  const addProduct = async () => {
    const data = {
      name: document.getElementById("product_name").value,
      price: document.getElementById("price").value,
      image: document.getElementById("image").value,
    };

    try {
      let result = await axios.post(
        "http://localhost:8000/api/product/add",
        data
      );
      getData();
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const getData = async () => {
    try {
      let result = await axios.get("http://localhost:8000/api/product");
      setProducts(result.data.data);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const getDataDetail = async (e) => {
    try {
      let result = await axios.get(
        "http://localhost:8000/api/product/detail?detail=" + e.target.id
      );
      console.log(result);
      setDataDetail(result.data.dataValues);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const updateDetailProduct = async () => {
    try {
      let result = await axios.post(
        "http://localhost:8000/api/product/detail/",
        {
          product_id: productId,
          description: description,
          indication: indication,
          dose: dose,
          rules: rules,
        }
      );
      swalSuccess(result.data.message);
      ModalProductDetail.onClose();
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Product
            </Text>
            <Button variant="primary" maxH="30px" onClick={onOpen}>
              Add New
            </Button>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <TableCRUD
              menu="product"
              data={products}
              header={["Name", "Price", "Image"]}
              dataFill={["product_name", "price", "image"]}
              action={[
                (e) => {
                  modalDetail.onOpen();
                  getDataDetail(e);
                },
              ]}
            />
          </Box>
        </Flex>
      </Card>

      <ModalAddProduct
        Tittle="New Product"
        Open={modalAdd.isOpen}
        Close={modalAdd.onClose}
        Data={dataDetail}
        SetUnit={() => {}}
        Submit={() => addProduct()}
      />

      <ModalProductDetail
        Title="Product Detail"
        Open={modalDetail.isOpen}
        Close={modalDetail.onClose}
        Data={dataDetail}
        SetUnit={() => {}}
        Cancel={() => {
          modalDetail.onClose();
        }}
        Submit={() => {}}
      />

      {/* <ModalProductUnit
                Title="Product Stock"
                Open={modalStock.isOpen}
                Close={() => { modalStock.onClose(); setDataUnit([]); setDefaultUnit([]); setConversionUnit([]) }}
                Data={dataUnit}
                DefaultUnit={optionDefaultUnit}
                ConversionUnit={optionConversionUnit}
                SetUnit={() => { }}
                Submit={() => updateProductUnitStock()}
                setDefaultUnit={(e) => setDefaultUnit(e.target.value)}
                SetConversionUnit={(e) => setConversionUnit(e.target.value)}
                setConversionUnitQty={(e) => setConversionUnitQty(e.target.value)}
                setDefaultUnitQty={(e) => setDefaultUnitQty(e.target.value)}
            /> */}
    </>
  );
};

export default ProductList;
