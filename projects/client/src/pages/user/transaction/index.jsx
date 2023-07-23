import { Box } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import FooterUserPage from '../../../components/footer'
import { Navbar } from '../../../components/navbar'
import Cancelled from './cancelled'
import List from './list'
import OnProcess from './onProcess'
import OnTheWay from './onTheWay'
import Payment from './payment'
import Received from './received'
import WaitingConfirmation from './waitingConfirmation'
import WaitingPayment from './waitingPayment'

const UserTransaction = () => {
    const [searchParams] = useSearchParams()
    const getPath = () => {
        if (searchParams.get('status') === 'Menunggu Pembayaran') {
            return <WaitingPayment />
        } else if (searchParams.get('status') === 'Menunggu Konfirmasi') {
            return <WaitingConfirmation />
        } else if (searchParams.get('status') === 'Pembayaran') {
            return <Payment />
        } else if (searchParams.get('status') === 'Diproses') {
            return <OnProcess />
        } else if (searchParams.get('status') === 'Dibatalkan') {
            return <Cancelled />
        } else if (searchParams.get('status') === 'Dikirim') {
            return <OnTheWay />
        } else if (searchParams.get('status') === 'Pesanan Dikonfirmasi') {
            return <Received />
        } else {
            return <List />
        }
    }

    return (
        <Box bg={useColorModeValue("blue.50", "blue.100")}>
            <Navbar />
            <div className="home-container">
                {getPath()}
            </div>
            <FooterUserPage />
        </Box>
    )
}
export default UserTransaction