import {useState, useEffect} from 'react'
import axios from 'axios';
import { useOrderDetails } from '../../contexts/OrderDetails';


function OrderConfirmation({updatePhase}) {

    const [orderNumber, setOrderNumber] = useState(null)
    // const [resetOrder] = useOrderDetails();
    
    const [orderDetails, updateItemCount, resetOrder] = useOrderDetails();

    function handleClick() {
        resetOrder();
        updatePhase('inProgress')
    } 

    useEffect(() => {
        axios.post(`http://localhost:3030/order`)
        .then(response => setOrderNumber(response.data.orderNumber))
        .catch(console.log("erro"))
    }, [])

    return (
        <>
            <h2>Order Confirmation Page: #{orderNumber}</h2>
            {/* {orderNumber ? <h4>{orderNumber}</h4> : <span>Loading</span>} */}
            <button onClick={handleClick}>Create new order</button>
        </>
    )
}

export default OrderConfirmation