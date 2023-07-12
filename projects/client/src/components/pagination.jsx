import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

const Pagination = ({ prev, next, goTo, paging, pageNumber }) => {
    return (
        <Flex>
            {pageNumber === 1 ? (
                <Button m={1}>
                    <ChevronLeftIcon />
                </Button>
            ) : (
                <Button m={1} onClick={prev}>
                    <ChevronLeftIcon />
                </Button>
            )}

            {paging.map((i) =>
                i.no === pageNumber ? (
                    <Button
                        m={1}
                        colorScheme='linkedin'
                        key={i.no}
                        id={i.no}
                        onClick={(e) => goTo(e)}
                    >
                        {i.no}
                    </Button>
                ) : (
                    <Button
                        m={1}
                        colorScheme='linkedin'
                        variant='outline'
                        key={i.no}
                        id={i.no}
                        onClick={(e) => goTo(e)}
                    >
                        {i.no}
                    </Button>
                )
            )}

            {paging.length > 0 ? pageNumber === paging[paging.length - 1].no ?
                <Button m={1}>
                    <ChevronRightIcon />
                </Button> : <Button
                    m={1}
                    onClick={next}
                >
                    <ChevronRightIcon />
                </Button> : ""}


        </Flex>
    )
}

export default Pagination