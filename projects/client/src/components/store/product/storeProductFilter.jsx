import { Button, Flex, Input, Select, Text } from '@chakra-ui/react'
import React from 'react'

const StoreProductFilter = ({ sort, setSort, filterCategory, setFilterCategory, category, setFilterName, clearFilter }) => {
    return (

        <Flex alignItems='center' gap={5}>
            <Flex alignItems='center'>
                <Text mr={1}> Sort by  </Text>
                <Select w='150px' placeholder='Sort By' value={sort} onChange={setSort}>
                    <option value='1'>Product name A-Z</option>
                    <option value='2'>Product name Z-A</option>
                    <option value='3'>Price low to high</option>
                    <option value='4'>Price high to low</option>
                </Select>
            </Flex>
            <Flex alignItems='center'>
                <Text mr={1}> Category  </Text>
                <Select w='200px' placeholder='Select Category' value={filterCategory} onChange={setFilterCategory}>
                    {category.length > 0 ? category.map(i => <option key={i.id} value={i.id}>{i.category_name}</option>) : <option value='0'>-</option>}

                </Select>
            </Flex>
            <Input type='text' placeholder='Find product' onChange={setFilterName} w='sm' />
            <Button colorScheme='yellow' onClick={clearFilter} >Clear Filter</Button>
        </Flex>

    )
}

export default StoreProductFilter