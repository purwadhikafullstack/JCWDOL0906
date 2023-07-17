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
import { swalFailed, swalSuccess } from "../../../../helper";

import { useSelector } from "react-redux";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { apiRequest } from "../../../../helper/api";

const TransactionList = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [transaction, setTransaction] = useState([]);

  const getData = async () => {
    try {
      const result = await apiRequest.get('/transaction/admin?page=' + activePage)

      console.log(result.data)
      setTransaction(result.data.data)
      setTotalPage(Math.ceil(result.data.count.count / 6));
    } catch (error) {
      console.log(error)
    }
  }

  const confirmTransaction = async (code) => {
    try {
      const result = await apiRequest.patch('/transaction/' + code + '/confirm')
      swalSuccess(result.data.message)
      getData()
    } catch (error) {
      swalFailed(error)
    }
  }
  const rejectTransaction = async (code) => {
    try {
      const result = await apiRequest.patch('/transaction/' + code + '/reject')
      swalSuccess(result.data.message)
      getData()
    } catch (error) {
      swalFailed(error.response.data.message)
    }
  }

  useEffect(() => { getData() }, [activePage])
  return (
    <>
      <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Transaction
            </Text>

          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <TableCRUD
              activePage={activePage}
              menu="transaction"
              data={transaction}
              header={[
                "Kode Transaksi",
                "Nama Pembeli",
                "Total Pembayaran",
                "Status",
                "Bukti Pembayaran",
              ]}
              dataFill={[
                "transaction_code",
                "username",
                "total_price",
                "status",
                "payment_receipt",
              ]}
              action={[
                (e) => confirmTransaction(e.target.id),
                (e) => rejectTransaction(e.target.id)
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
            console.log(pageInfo)
            setActivePage(pageInfo.activePage);
          }}
        />
      </Flex>
    </>
  );
};

export default TransactionList;
