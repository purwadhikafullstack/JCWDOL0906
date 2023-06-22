import { Box, Button, Card, Flex, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import TableCRUD from '../../components/table';
import axios from 'axios'
import { swalFailed, swalSuccess } from '../../../../helper';
import ModalEditForm from '../../components/modal';
import ModalProductDetail from '../../components/modalProduct';
import ModalProductUnit from '../../components/modalProductUnit';

const ProductList = () => {
    const textColor = useColorModeValue("gray.700", "white");
    const [dataDetail, setDataDetail] = useState([])
    const [dataUnit, setDataUnit] = useState([])
    const [optionDefaultUnit, setOptionDefaultUnit] = useState([])
    const [optionConversionUnit, setOptionConversionUnit] = useState([])
    //Product unit Data
    const [conversionUnit, setConversionUnit] = useState(0)
    const [productId, setProductId] = useState(0)
    const [defaultUnit, setDefaultUnit] = useState(0)
    const [conversionUnitQty, setConversionUnitQty] = useState(0)
    const [defaultUnitQty, setDefaultUnitQty] = useState(0)

    //Modal Events
    const { onOpen, onClose, isOpen } = useDisclosure()
    const modalUnits = useDisclosure()
    const modalStock = useDisclosure()
    const modalDetail = useDisclosure()

    const [products, setProducts] = useState([])

    const getData = async () => {
        try {
            let result = await axios.get("http://localhost:8000/api/product")
            setProducts(result.data.data)
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    const getDataDetail = async (e) => {
        try {
            let result = await axios.get('http://localhost:8000/api/product/detail?detail=' + e.target.id)
            console.log(result)
            setDataDetail(result.data.dataValues)
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    const getDataUnit = async (e) => {
        try {
            console.log('Target', e.target.id)
            setProductId(e.target.id)
            let result = await axios.get('http://localhost:8000/api/unit/product/' + e.target.id)

            setDataUnit(result.data.dataValues)

        } catch (error) {
            // swalFailed(error.response.data.message)
        }
    }

    const getDataStock = async (e) => {
        try {
            console.log('Target', e.target.id)
            setProductId(e.target.id)
            let result = await axios.get('http://localhost:8000/api/product/stock/' + e.target.id)

            setDataUnit(result.data.dataValues)

        } catch (error) {
            // swalFailed(error.response.data.message)
        }
    }
    console.log('productId', productId)
    const getUnits = async () => {
        try {
            let resultDefault = await axios.get('http://localhost:8000/api/unit/default')
            console.log(resultDefault)
            setOptionDefaultUnit(resultDefault.data.data)
            let resultConversion = await axios.get('http://localhost:8000/api/unit/conversion')
            console.log(resultConversion)
            setOptionConversionUnit(resultConversion.data.data)
        } catch (error) {
            // swalFailed(error.response.data.message)
        }
    }

    const updateProductUnit = async () => {
        try {
            let result = await axios.post("http://localhost:8000/api/unit/product", {
                product_id: productId,
                default_unit_qty: defaultUnitQty,
                default_unit_id: defaultUnit,
                conversion_unit_qty: conversionUnitQty,
                conversion_unit_id: conversionUnit
            })
            swalSuccess(result.data.message)
            modalUnits.onClose()
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    const updateProductUnitStock = async () => {
        try {
            let result = await axios.post("http://localhost:8000/api/product/stock/" + productId, {
                default_unit_qty: defaultUnitQty,
            })
            swalSuccess(result.data.message)
            modalStock.onClose()
        } catch (error) {
            swalFailed(error.response.data.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Card p='0px' maxW={{ sm: "320px", md: "100%" }}>
                <Flex direction='column'>
                    <Flex align='center' justify='space-between' p='22px'>
                        <Text fontSize='lg' color={textColor} fontWeight='bold'>
                            Product
                        </Text>
                        <Button variant='primary' maxH='30px' onClick={onOpen}>
                            Add New
                        </Button>
                    </Flex>
                    <Box overflow={{ sm: "scroll", lg: "hidden" }}>
                        <TableCRUD
                            menu="product"
                            data={products}
                            header={['Name', 'Price', 'Image']}
                            dataFill={['product_name', 'price', 'image']}
                            action={[
                                (e) => { modalDetail.onOpen(); getDataDetail(e) },
                                (e) => { modalStock.onOpen(); getDataStock(e); getUnits() },
                                (e) => { modalUnits.onOpen(); getDataUnit(e); getUnits() }
                            ]} />
                    </Box>
                </Flex>
            </Card>

            <ModalProductDetail
                Title="Product Detail"
                Open={modalDetail.isOpen}
                Close={modalDetail.onClose}
                Data={dataDetail}
                SetUnit={() => { }}
                Cancel={() => { modalDetail.onClose() }}
                Submit={() => { }} />

            <ModalProductUnit
                Title="Product Unit"
                Open={modalUnits.isOpen}
                Close={() => { modalUnits.onClose(); setDataUnit([]); setDefaultUnit([]); setConversionUnit([]) }}
                Data={dataUnit}
                DefaultUnit={optionDefaultUnit}
                ConversionUnit={optionConversionUnit}
                SetUnit={() => { }}
                Submit={() => updateProductUnit()}
                setDefaultUnit={(e) => setDefaultUnit(e.target.value)}
                SetConversionUnit={(e) => setConversionUnit(e.target.value)}
                setConversionUnitQty={(e) => setConversionUnitQty(e.target.value)}
                setDefaultUnitQty={(e) => setDefaultUnitQty(e.target.value)}
            />

            <ModalProductUnit
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
            />
        </>
    )
}

export default ProductList