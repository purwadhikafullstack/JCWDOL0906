/* eslint-disable no-undef */
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Grid, IconButton, Image, Input, Menu, MenuButton, MenuItem, MenuList, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Tooltip, useColorModeValue, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { swalFailed } from '../../../helper'
import Pagination from '../../../components/pagination'
import StoreProductFilter from '../../../components/store/product/storeProductFilter'
import ProductCard from '../../../components/store/product/productCard'


const UserProductList = () => {
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const [sort, setSort] = useState("")
    const [filterCategory, setFilterCategory] = useState(0)
    const [filterName, setFilterName] = useState("")
    const [paging, setPaging] = useState([])
    const [records, setRecords] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)

    const getData = async () => {
        let params = ""
        if (sort !== "") { params = "?sort=" + sort } else { params = "?sort=" }
        if (filterCategory !== 0) { params += "&category=" + filterCategory } else { params += "&category=" }
        if (filterName !== "") { params += "&name=" + filterName } else { params += "&name=" }
        try {
            const result = await axios.get(process.env.REACT_APP_API_BASE_URL + "/store/product" + params + "&page=" + pageNumber)

            let page = Math.ceil(result.data.count / 10);

            let paginate = [];
            for (let i = 0; i < page; i++) {
                paginate.push({ no: i + 1 });
            }
            console.log(result.data)
            setPaging(paginate);
            setRecords(result.data.count);
            setProduct(result.data.data)
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    const getCategory = async () => {
        try {
            const result = await axios.get(process.env.REACT_APP_API_BASE_URL + "/categories")
            setCategory(result.data.data)
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    const clearFilter = () => {
        setFilterCategory(0)
        setSort("")
    }

    useEffect(() => {
        getData()
        console.log(product)
    }, [sort, pageNumber, filterCategory, filterName])

    useEffect(() => {
        getCategory()
    }, [])


    return (
        <Flex flexDirection='column' alignItems='center' p={10} w='100%'>
            <Flex w='100%' alignItems='center' justifyContent='space-between' bg='white' p={3} borderRadius='20px'>
                <StoreProductFilter
                    sort={sort}
                    setSort={(e) => setSort(e.target.value)}
                    filterCategory={filterCategory}
                    setFilterCategory={(e) => setFilterCategory(e.target.value)}
                    category={category}
                    setFilterName={(e) => setFilterName(e.target.value)}
                    clearFilter={() => clearFilter()} />

                <Flex alignItems='center' >
                    <Text p={5} mb={0}> Page {pageNumber} of {records} data </Text>
                    <Pagination
                        prev={() => setPageNumber(Number(pageNumber) - 1)}
                        next={() => setPageNumber(Number(pageNumber) + 1)}
                        goTo={(e) => setPageNumber(e.target.id)}
                        paging={paging}
                        pageNumber={Number(pageNumber)} />
                </Flex>
            </Flex>
            <Container maxW='container.xl' p={5} mt={5}>
                <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                    {
                        product.length > 0 ? product.map(i => <ProductCard image={i.image} product_name={i.product_name} price={i.price} id={i.id} category={i.category} description={i.description} dose={i.dose} indication={i.indication} rules={i.rules} unit={i.defaultUnit} category_id={i.category_id} />) : "Product Not Found"
                    }
                </Grid>
            </Container>

            <Flex w='100%' alignItems='center' justifyContent='end' >
                <Text p={5} mb={0}> Page {pageNumber} of {records} data </Text>
                <Pagination
                    prev={() => setPageNumber(Number(pageNumber) - 1)}
                    next={() => setPageNumber(Number(pageNumber) + 1)}
                    goTo={(e) => setPageNumber(e.target.id)}
                    paging={paging}
                    pageNumber={Number(pageNumber)} />
            </Flex>


        </Flex>

    )
}

export default UserProductList