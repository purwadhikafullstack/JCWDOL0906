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
  console.log("transaction", transaction);
  const [code, setCode] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  console.log(state);
  const [isDate, setIsDate] = useState(false);

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
  }

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
  }



  const closeDate = () => {
    setTimeout(() => {
      setIsDate(false);
    }, 3000);
  };

  useEffect(() => {
    getData();
  }, [activePage, status, sort]);

  //============== DATE RANGE =========

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }
  //============== DATE RANGE =========
  return (
    <>
      <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Transaction
            </Text>
            <Flex gap="2">
              <Box className="calendarWrap" style={{ zIndex: 999999 }}>

                <Input
                  value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
                  readOnly
                  className="inputBox"
                  onClick={() => setOpen(open => !open)}
                />

                <Box ref={refOne}>
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
            console.log(pageInfo);
            setActivePage(pageInfo.activePage);
          }}
        />
      </Flex>
    </>
  );
};

export default TransactionList;
