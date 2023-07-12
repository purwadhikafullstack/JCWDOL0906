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
import ModalProductUnit from "../../components/modalProductUnit";
import { useSelector } from "react-redux";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ModalProductStock from "../../components/modalProductStock";
import { apiRequest } from "../../../../helper/api";

const ProductList = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const [dataDetail, setDataDetail] = useState([]);
  const [productId, setProductId] = useState(0);
  const [products, setProducts] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [categories, setCategories] = useState([]);

  // const [sortType, setSortType] = useState('')
  // const [query, setQuery] = useState()
  const [optionDefaultUnit, setOptionDefaultUnit] = useState([]);
  const [optionConversionUnit, setOptionConversionUnit] = useState([]);

  //Product unit Data
  const [conversionUnit, setConversionUnit] = useState(0);
  const [defaultUnit, setDefaultUnit] = useState(0);
  const [conversionUnitQty, setConversionUnitQty] = useState(0);
  const [defaultUnitQty, setDefaultUnitQty] = useState(1);

  //Modal Events
  const modalUnits = useDisclosure();
  const modalStock = useDisclosure();
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
      let category = document.getElementById("category_id").value;
      let formData = new FormData();
      let data = {
        product_name: product_name,
        category_id: category,
        price: price,
        description: description,
        indication: indication,
        dose: dose,
        rules: rules,
        createdBy: adminId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);

      let result = await apiRequest.post("/product", formData);
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
      let result = await apiRequest.get("/product?page=" + activePage);
      setProducts(result.data.data);
      setTotalPage(Math.ceil(result.data.count / 6));
    } catch (error) {
      swalFailed(error.response.data.message);
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      let result = await apiRequest.get("/categories");
      setCategories(result.data.data);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const getDropdownUnits = async () => {
    try {
      let resultDefault = await apiRequest.get("/unit/default");
      setOptionDefaultUnit(resultDefault.data.data);
      let resultConversion = await apiRequest.get("/unit/conversion");
      setOptionConversionUnit(resultConversion.data.data);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const getDataUnit = async (e) => {
    try {
      setProductId(e.target.id);
      let result = await apiRequest.get("/unit/product/" + e.target.id);
      const data = result.data.dataValues;
      setDefaultUnit(data.default_unit_id);
      setConversionUnit(data.conversion_unit_id);
      setConversionUnitQty(data.conversion_unit_qty);
      setDefaultUnitQty(data.default_unit_qty);
      modalUnits.onOpen();
    } catch (error) {
      modalUnits.onOpen();
      setDefaultUnit(0);
      setConversionUnit(0);
      setConversionUnitQty(0);
      setDefaultUnitQty(1);
    }
  };

  const getProductById = async (e) => {
    try {
      setProductId(e.target.id);
      let result = await apiRequest.get("/product/" + e.target.id);
      setDefaultUnitQty(result.data.data.defaultQty);
      modalStock.onOpen();
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const updateProductUnit = async () => {
    try {
      let result = await apiRequest.post("/unit/product/" + productId, {
        default_unit_qty: defaultUnitQty,
        default_unit_id: defaultUnit,
        conversion_unit_qty: conversionUnitQty,
        conversion_unit_id: conversionUnit,
      });
      swalSuccess(result.data.message);
      getData();
      modalUnits.onClose();
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const updateProductStock = async () => {
    try {
      let result = await apiRequest.post("/product/" + productId + "/stock", {
        qty: defaultUnitQty,
      });
      swalSuccess(result.data.message);
      getData();
      modalStock.onClose();
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const updateDetailProduct = async (e) => {
    try {
      let image = document.getElementById("image").files[0];
      let product_name = document.getElementById("product_name").value;
      let price = document.getElementById("price").value;
      let description = document.getElementById("description").value;
      let indication = document.getElementById("indication").value;
      let dose = document.getElementById("dose").value;
      let rules = document.getElementById("rules").value;
      let category = document.getElementById("category_id").value;

      let formData = new FormData();
      let data = {
        product_name: product_name,
        category_id: category,
        price: price,
        description: description,
        indication: indication,
        dose: dose,
        rules: rules,
        updatedBy: adminId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);

      let result = await apiRequest.patch("/product/" + e.target.id, formData, {
        product_name: product_name,
        category_id: category,
        price: price,
        description: description,
        indication: indication,
        dose: dose,
        rules: rules,
        updatedBy: adminId,
      });
      modalUpdate.onClose();
      getData();
      swalSuccess(result.data.message);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  async function deleteOperation(e) {
    try {
      let result = await apiRequest.delete("/product/" + e.target.id);
      getData();
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  }

  useEffect(() => {
    getData();
  }, [activePage]);

  useEffect(() => {
    getAllCategory();
  }, []);

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
                "Category",
                "Price",
                "Image",
                "Description",
                "Indication",
                "Dose",
                "Rules",
                "Default Qty",
                "Conversion Qty",
                "Default Unit",
                "Conversion Unit",
              ]}
              dataFill={[
                "product_name",
                "category",
                "price",
                "image",
                "description",
                "indication",
                "dose",
                "rules",
                "defaultQty",
                "conversionQty",
                "defaultUnit",
                "conversionUnit",
              ]}
              action={[
                (e) => {
                  modalAdd.onOpen();
                  getData(e);
                },
                (e) => {
                  // modalUpdate.onOpen();
                  getProductById(e.target.id);
                },
                (e) => {
                  deleteOperation(e);
                },
                (e) => {
                  getDataUnit(e);
                  getDropdownUnits();
                },
              ]}
            />
          </Box>
        </Flex>
      </Card>

      <Flex justifyContent={"center"} mt={"20px"}>
        <Pagination
          defaultActivePage={activePage}
          totalPages={totalPage}
          onPageChange={(event, pageInfo) => {
            setActivePage(pageInfo.activePage);
          }}
        />
      </Flex>

      <ModalAddProduct
        Tittle="New Product"
        Open={modalAdd.isOpen}
        Close={modalAdd.onClose}
        Data={dataDetail}
        categories={categories}
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

      <ModalProductUnit
        Title="Product Unit"
        Open={modalUnits.isOpen}
        Close={() => {
          modalUnits.onClose();
        }}
        Submit={() => updateProductUnit()}
        DefaultUnit={optionDefaultUnit}
        ConversionUnit={optionConversionUnit}
        conversionUnit={conversionUnit}
        defaultUnit={defaultUnit}
        conversionUnitQty={conversionUnitQty}
        defaultUnitQty={defaultUnitQty}
        SetDefaultUnit={(e) => setDefaultUnit(e.target.value)}
        SetConversionUnit={(e) => setConversionUnit(e.target.value)}
        SetConversionUnitQty={(e) => setConversionUnitQty(e.target.value)}
        SetDefaultUnitQty={(e) => setDefaultUnitQty(e.target.value)}
      />

      <ModalProductStock
        Title="Product Add Stock"
        Open={modalStock.isOpen}
        Close={() => {
          modalStock.onClose();
        }}
        defaultUnitQty={defaultUnitQty}
        Submit={() => updateProductStock()}
        setDefaultUnitQty={(e) => setDefaultUnitQty(e.target.value)}
      />
    </>
  );
};

export default ProductList;
