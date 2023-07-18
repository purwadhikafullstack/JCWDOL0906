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
import TableCRUD from "../../../admin/components/category/table";
import axios from "axios";
import { swalFailed, swalSuccess } from "../../../../helper/index";
import ModalAddCategory from "../../../admin/components/category/modalAddCategory";
import ModalUpdateCategory from "../../../admin/components/category/modalUpdateCategory";
import { useSelector } from "react-redux";
// import { AddIcon } from "@chakra-ui/icons";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { apiRequest } from "../../../../helper/api";

const CategoryList = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const [categories, setCategories] = useState([]);
  const modalAdd = useDisclosure();
  const modalUpdate = useDisclosure();
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const adminId = useSelector((state) => state.userSlice.value.id);

  const addCategory = async () => {
    try {
      let category_name = document.getElementById("category_name").value;
      let image = document.getElementById("image").files[0];
      const formData = new FormData();
      let data = {
        category_name: category_name,
        createdBy: adminId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);
      let result = await apiRequest.post("/categories", formData);
      // console.log("adminId",adminId);
      console.log(result);
      modalAdd.onClose();
      getAllCategory();
      swalSuccess(result.data.message);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const getAllCategory = async () => {
    try {
      let result = await apiRequest.get("/categories?page=" + activePage);
      setCategories(result.data.data);
      setTotalPage(Math.ceil(result.data.count / 5));
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };
  const updateCategory = async (e) => {
    try {
      let image = document.getElementById("image").files[0];
      let category_name = document.getElementById("category_name").value;
      let formData = new FormData();
      let data = {
        category_name: category_name,
        updatedBy: adminId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);

      let result = await apiRequest.patch(
        "/categories/" + selectedCategoryId,
        formData,
        {}
      );

      modalUpdate.onClose();
      getAllCategory();
      swalSuccess(result.data.message);
    } catch (error) {
      console.log("error", error);
      swalFailed(error.response.data.message);
    }
  };

  const deleteCategory = async (e) => {
    try {
      let result = await apiRequest.delete("/categories/" + e.target.id);
      // console.log(result)
      getAllCategory();
      swalSuccess(result.data.message);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  // setTotalPage(Math.ceil(result.data.count / 5));
  useEffect(() => {
    getAllCategory();
  }, [activePage]);

  return (
    <>
      <Card p="0px" mt="20" maxW={{ sm: "320px", md: "100%" }}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Category
            </Text>
            <Button variant="primary" maxH="30px" onClick={modalAdd.onOpen}>
              Add New
            </Button>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <TableCRUD
              activePage={activePage}
              menu="category"
              data={categories}
              header={["Name", "Image"]}
              dataFill={["category_name", "image"]}
              action={[
                (e) => {
                  modalAdd.onOpen();
                  getAllCategory(e);
                },
                (e) => {
                  modalUpdate.onOpen();
                  setSelectedCategoryId(e.target.id);
                },
                (e) => {
                  deleteCategory(e);
                },
              ]}
            />
          </Box>
        </Flex>
      </Card>
      <Flex justifyContent={"center"} mt={"20px"}>
        <Pagination
          activePage={activePage}
          totalPages={totalPage}
          //untuk mengganti halaman
          onPageChange={(event, pageInfo) => {
            setActivePage(pageInfo.activePage);
            console.log(pageInfo);
          }}
        />
      </Flex>
      <ModalAddCategory
        Title="New Category"
        Open={modalAdd.isOpen}
        Close={modalAdd.onClose}
        Cancel={() => { modalAdd.onClose(); }}
        Submit={() => addCategory()}
      />
      <ModalUpdateCategory
        Title="Update Category"
        Open={modalUpdate.isOpen}
        Close={modalUpdate.onClose}
        Cancel={() => { modalUpdate.onClose(); }}
        Submit={(e) => updateCategory(e)}

      />
    </>
  );
};

export default CategoryList;
