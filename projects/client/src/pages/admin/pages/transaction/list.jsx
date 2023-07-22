import {
  Box,
  Button,
  Card,
  ColorModeProvider,
  Flex,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TableCRUD from "../../components/table";
import { swalFailed, swalSuccess } from "../../../../helper";

import { useSelector } from "react-redux";
import { Modal, Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { apiRequest } from "../../../../helper/api";
import { useNavigate } from "react-router-dom";
import ModalPrescription from "../../components/prescription/ModalPrescription";
import { DateRange, DateRangePicker } from "react-date-range";

const TransactionList = () => {
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.700", "white");
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [transaction, setTransaction] = useState([]);
  console.log("transaction", transaction);
  const [code, setCode] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  console.log(state)
  const [isDate, setIsDate] = useState(false)

  const modalAdd = useDisclosure();

  const getData = async () => {
    let params = "";
    let sorts = "";
    if (status !== "") {
      params += "&status=" + status;
    }
    if (sort !== "") {
      sorts += "&sort=" + sort;
    }

    try {
      const result = await apiRequest.get(
        "/transaction/admin?page=" + activePage + params + sorts
      );

      console.log(result.data);
      setTransaction(result.data.data);
      setTotalPage(Math.ceil(result.data.count.count / 6));
    } catch (error) {
      console.log(error);
    }
  };

  const confirmTransaction = async (code) => {
    try {
      const result = await apiRequest.patch(
        "/transaction/" + code + "/confirm"
      );
      swalSuccess(result.data.message);
      getData();
    } catch (error) {
      swalFailed(error);
    }
  };

  const rejectTransaction = async (code) => {
    try {
      const result = await apiRequest.patch("/transaction/" + code + "/reject");
      swalSuccess(result.data.message);
      getData();
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  }
  const rejectUserOrder = async (code) => {
    try {
      const result = await apiRequest.patch('/transaction/' + code + '/rejectorder')
      swalSuccess(result.data.message);
      getData()
    } catch (error) {
      swalFailed("Failed to reject the transaction. Please try again later.");
    }
  }

  const sendUserOrder = async (code) => {
    try {
      const result = await apiRequest.patch(
        "/transaction/" + code + "/Diproses"
      );
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const closeDate = () => {
    setTimeout(() => {
      setIsDate(false)
    }, 3000)
  }

  useEffect(() => {
    getData();
  }, [activePage, status, sort]);
  return (
    <>
      <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Transaction
            </Text>
            <Flex gap="2">
              {isDate ? <DateRange
                editableDateInputs={true}
                onChange={item => { setState([item.selection]); closeDate() }}
                moveRangeOnFirstSelection={false}
                ranges={state}
              /> : <Button onClick={() => setIsDate(true)}>Select Date</Button>}
              <Select
                w="200px"
                placeholder="Sort By"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="1">Tanggal Belanja A-Z</option>
                <option value="2">Tanggal Belanja Z-A</option>
                <option value="3">Invoice A-Z</option>
                <option value="4">Invoice Z-A</option>
              </Select>

              <Select
                w="200px"
                placeholder="Pilih Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                <option value="Pembayaran">Pembayaran</option>
                <option value="Diproses">Diproses</option>
                <option value="Dikirim">Dikirim</option>
                <option value="Pesanan Dikonfirmasi">Diterima</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </Select>
            </Flex>
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
                (e) => rejectTransaction(e.target.id),
                (e) => {
                  modalAdd.onOpen();
                  setCode(e.target.id);
                },
                (e) => sendUserOrder(e.target.id),
                (e) => rejectUserOrder(e.target.id)
              ]}
            />
          </Box>
        </Flex>
      </Card>

      <ModalPrescription
        Tittle="Manage Your Prescription"
        code={code}
        Open={modalAdd.isOpen}
        Close={modalAdd.onClose}
      />

      <Flex justifyContent={"center"} mt={"20px"}>
        <Pagination
          defaultActivePage={activePage}
          totalPages={totalPage}
          onPageChange={(event, pageInfo) => {
            console.log(pageInfo);
            setActivePage(pageInfo.activePage);
          }}
        />
      </Flex>
    </>
  );
};

export default TransactionList;
