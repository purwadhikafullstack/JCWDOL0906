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
import TableCRUD from "../../components/table";
import axios from "axios";
import { swalFailed, swalSuccess } from "../../../../helper";
// import ModalEditForm from "../Modals/Modal";
import ModalProductUpdate from "../../components/ModalProductUpdate";
import ModalAddProduct from "../../components/ModalAddProduct";
// import ModalProductUnit from '../../components/modalProductUnit';
import { useSelector } from "react-redux";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const ProductList = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const [dataDetail, setDataDetail] = useState([]);
  const [product_name, description, indication, dose, rules] = useState({});
  const [NewProduct, setNewProduct] = useState("");
  const [productId, setProductId] = useState(0);
  const [products, setProducts] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [category, setCategory] = useState(0);
  // const [sortType, setSortType] = useState('')
  // const [query, setQuery] = useState()

  // const [defaultUnit, setDefaultUnit] = useState(0);
  // const [conversionUnitQty, setConversionUnitQty] = useState(0);
  // const [defaultUnitQty, setDefaultUnitQty] = useState(0);

  //Modal Events
  const { onOpen } = useDisclosure();
  // const modalUnits = useDisclosure();
  // const modalStock = useDisclosure();
  const modalAdd = useDisclosure();
  const modalUpdate = useDisclosure();

  const adminId = useSelector((state) => state.userSlice.value.id);

  const addProduct = async () => {
    try {
      let image = document.getElementById("image").files[0];
      let product_name = document.getElementById("product_name").value;
      let price = document.getElementById("price").value;
      let description = document.getElementById("description").value;
      let indication = document.getElementById("indication").value;
      let dose = document.getElementById("dose").value;
      let rules = document.getElementById("rules").value;
      let formData = new FormData();
      let data = {
        product_name: product_name,
        price: price,
        description: description,
        indication: indication,
        dose: dose,
        rules: rules,
        createdBy: adminId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);

      let result = await axios.post(
        "http://localhost:8000/api/product/add",
        formData
      );
      console.log(result);
      getData();
      modalAdd.onClose();
      swalSuccess(result.data.message);
    } catch (error) {
      console.log(error);
      swalFailed(error.response.data.message);
    }
  };

  const getData = async () => {
    try {
      let result = await axios.get(
        "http://localhost:8000/api/product" + `?page=${activePage}`
      );
      setProducts(result.data.data);
      console.log(result.data);
      setTotalPage(Math.ceil(result.data.count / 6));
    } catch (error) {
      swalFailed(error.response.data.message);
      console.log(error);
    }
  };

  // const getDataDetail = async (e) => {
  //   try {
  //     let result = await axios.get(
  //       "http://localhost:8000/api/product/detail?detail=" + e.target.id
  //     );
  //     console.log(result);
  //     setDataDetail(result.data.dataValues);
  //   } catch (error) {
  //     swalFailed(error.response.data.message);
  //   }
  // };

  const updateDetailProduct = async (e) => {
    try {
      let image = document.getElementById("image").files[0];
      let product_name = document.getElementById("product_name").value;
      let price = document.getElementById("price").value;
      let description = document.getElementById("description").value;
      let indication = document.getElementById("indication").value;
      let dose = document.getElementById("dose").value;
      let rules = document.getElementById("rules").value;
      let formData = new FormData();
      let data = {
        product_name: product_name,
        price: price,
        description: description,
        indication: indication,
        dose: dose,
        rules: rules,
        updatedBy: adminId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);

      let result = await axios.patch(
        "http://localhost:8000/api/product/" + e.target.id,
        data,
        {
          product_name: product_name,
          description: description,
          indication: indication,
          dose: dose,
          rules: rules,
          updatedBy: adminId,
        }
      );
      modalUpdate.onClose();
      getData();
      swalSuccess(result.data.message);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  async function deleteOperation(e) {
    try {
      let result = await axios.delete(
        "http://localhost:8000/api/product/delete/" + e.target.id
      );
      getData();
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  }

  useEffect(() => {
    getData();
  }, [activePage]);

  return (
    <>
      <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Product
            </Text>
            <Button variant="primary" maxH="30px" onClick={modalAdd.onOpen}>
              Add New
            </Button>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <TableCRUD
              activePage={activePage}
              menu="product"
              data={products}
              header={[
                "Name",
                "Price",
                "Image",
                "Description",
                "Indication",
                "Dose",
                "Rules",
                "Category",
              ]}
              dataFill={[
                "product_name",
                "price",
                "image",
                "description",
                "indication",
                "dose",
                "rules",
                "category",
              ]}
              action={[
                (e) => {
                  modalAdd.onOpen();
                  getData(e);
                },
                (e) => {
                  updateDetailProduct(e);
                },
                (e) => {
                  deleteOperation(e);
                },
              ]}
            />
          </Box>
        </Flex>
      </Card>

      <Flex justifyContent={"center"} mt={"20px"}>
        <Pagination
          defaultActivePages={activePage}
          totalPages={totalPage}
          onPageChange={(event, pageInfo) => {
            setActivePage(pageInfo.activePage);
            console.log(pageInfo);
          }}
        />
      </Flex>

      <ModalAddProduct
        Tittle="New Product"
        Open={modalAdd.isOpen}
        Close={modalAdd.onClose}
        Data={dataDetail}
        SetUnit={() => {}}
        Submit={() => addProduct()}
      />

      <ModalProductUpdate
        Title="Product Detail"
        Open={modalUpdate.isOpen}
        Close={modalUpdate.onClose}
        Data={dataDetail}
        SetUnit={() => {}}
        Cancel={() => {
          modalUpdate.onClose();
        }}
        Submit={() => updateDetailProduct()}
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
