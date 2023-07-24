import {
  Box,
  Button,
  Card,
  ColorModeProvider,
  Flex,
  Input,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import TableCRUD from "../../components/table";
import { swalFailed, swalSuccess } from "../../../../helper";

import { useSelector } from "react-redux";
import { Modal, Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { apiRequest } from "../../../../helper/api";
import { useNavigate } from "react-router-dom";
import ModalPrescription from "../../components/prescription/ModalPrescription";
import { DateRange, DateRangePicker } from "react-date-range";
import format from 'date-fns/format'
import { addDays } from 'date-fns'

const TransactionList = () => {
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.700", "white");
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [code, setCode] = useState("");
  const modalAdd = useDisclosure();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ])

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

      setTransaction(result.data.data);
      setTotalPage(Math.ceil(result.data.count.count / 6));
    } catch (error) {
    }
  };

  const search = async () => {
    let params = "";
    let sorts = "";
    let startDate = format(range[0].startDate, "yyyy-MM-dd")
    let endDate = format(range[0].endDate, "yyyy-MM-dd")
    if (status !== "") {
      params += "&status=" + status;
    }
    if (sort !== "") {
      sorts += "&sort=" + sort;
    }
    if (startDate !== endDate) {
      params += "&startDate=" + startDate + "&endDate=" + endDate
    }

    try {
      const result = await apiRequest.get(
        "/transaction/admin?page=" + activePage + params + sorts
      );

      setTransaction(result.data.data);
      setTotalPage(Math.ceil(result.data.count.count / 6));
    } catch (error) {

    }
  }

  const clear = () => {
    setSort("")
    setStatus("")
    setRange([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 0),
        key: 'selection'
      }
    ])
  }


  const checkOutPrescription = async () => {
    try {
      const result = await apiRequest.patch(
        "/transaction/" + code + "/Menunggu Pembayaran"
      );
      modalAdd.onClose();
      swalSuccess(result.data.message);
      getData();
    } catch (error) {
      swalFailed(error);
    }
  };
  const confirmUserPayment = async (code) => {
    try {
      const result = await apiRequest.patch("/transaction/" + code + "/Diproses")
      swalSuccess(result.data.message);
      getData()
    } catch (error) {
      swalFailed("Failed to reject the transaction. Please try again later.");
    }
  };
  const rejectUserPayment = async (code) => {
    try {
      const result = await apiRequest.patch("/transaction/" + code + "/Menunggu Pembayaran")
      swalSuccess(result.data.message);
      getData()
    } catch (error) {
      swalFailed("Failed to reject the transaction. Please try again later.");
    }
  };
  const rejectUserOrder = async (code) => {
    try {
      const result = await apiRequest.patch("/transaction/" + code + "/Dibatalkan")
      swalSuccess(result.data.message);
      getData()
    } catch (error) {
      swalFailed("Failed to reject the transaction. Please try again later.");
    }
  };
  const confirmUserOrder = async (code) => {
    try {
      const result = await apiRequest.patch("/transaction/" + code + "/Dikirim")
      swalSuccess(result.data.message);
      getData()
    } catch (error) {
      swalFailed("Failed to reject the transaction. Please try again later.");
    }
  };


  useEffect(() => {
    getData();
  }, [activePage]);
 

  const [open, setOpen] = useState(false)
  const refOne = useRef(null)

  useEffect(() => {

    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  const hideOnEscape = (e) => {

    if (e.key === "Escape") {
      setOpen(false)
    }
  };
  const hideOnClickOutside = (e) => {

    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  };

  return (
    <>
      <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Transaction
            </Text>
            <Flex gap="2">
              <Box className="calendarWrap" >

                <Input
                  value={`${format(range[0].startDate, "yyyy-MM-dd")} to ${format(range[0].endDate, "yyyy-MM-dd")}`}
                  readOnly
                  className="inputBox"
                  onClick={() => setOpen(open => !open)}
                />
                <Box ref={refOne} style={{ zIndex: 9999999, position: 'absolute' }}>
                  {open &&
                    <DateRange
                      onChange={item => setRange([item.selection])}
                      editableDateInputs={true}
                      moveRangeOnFirstSelection={false}
                      ranges={range}
                      months={1}
                      direction="horizontal"
                      className="calendarElement"
                    />
                  }
                </Box>
              </Box>
              <Select
                w="200px"
                placeholder="Sort By"
                value={sort} onChange={(e) => setSort(e.target.value)}
              >
                <option value="1">Tanggal Belanja A-Z</option>
                <option value="2">Tanggal Belanja Z-A</option>
                <option value="3">Invoice A-Z</option>
                <option value="4">Invoice Z-A</option>
              </Select>
              <Select
                w="200px"
                placeholder="Pilih Status"
                value={status} onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                <option value="Pembayaran">Pembayaran</option>
                <option value="Diproses">Diproses</option>
                <option value="Dikirim">Dikirim</option>
                <option value="Pesanan Dikonfirmasi">Diterima</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </Select>

              <Button colorScheme='linkedin' onClick={() => search()}>Search</Button>
              <Button colorScheme='yellow' onClick={() => clear()}>Clear</Button>
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
                (e) => confirmUserPayment(e.target.id),
                (e) => rejectUserPayment(e.target.id),
                (e) => {
                  modalAdd.onOpen();
                  setCode(e.target.id);
                },
                (e) => confirmUserOrder(e.target.id),
                (e) => rejectUserOrder(e.target.id)
              ]}
            />
          </Box>
        </Flex>
      </Card>
      <ModalPrescription
        Tittle="Manage Your Prescription"
        code={code}
        checkOutPrescription={checkOutPrescription}
        Open={modalAdd.isOpen}
        Close={modalAdd.onClose}
        Cancel={() => {
          modalAdd.onClose();
        }}
        Submit={() => checkOutPrescription()}
      />
      <Flex justifyContent={"center"} mt={"20px"}>
        <Pagination
          activePage={activePage}
          totalPages={totalPage}
          onPageChange={(event, pageInfo) => {
            setActivePage(pageInfo.activePage);
          }}
        />
      </Flex>
    </>
  );
};
export default TransactionList;
