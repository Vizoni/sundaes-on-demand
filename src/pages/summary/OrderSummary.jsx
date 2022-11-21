import {useState, useEffect} from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'


function OrderSummary({updatePhase}) {

    const [OrderDetails] = useOrderDetails()

    console.log("order", OrderDetails)
    return (
        <>
            <h1>Order SUMMARY</h1>
            <h2>Scoops: {OrderDetails.totals.scoops}</h2>
            {[...OrderDetails["scoops"].keys()].map(item => {
                return (
                    <p key={item}>{item}</p>
                )
            })}
            <h2>Toppings: {OrderDetails.totals.toppings}</h2>
            {[...OrderDetails["toppings"].keys()].map(item => {
                console.log("item", item)
                return (
                    <p key={item}>{item}</p>
                )
            })}
            <h1>TOTAL: {OrderDetails.totals.grandTotal}</h1>
            <input type="checkbox" name="termsConditions" id="termsConditions"/>
            <label htmlFor="termsConditions">Accept terms and conditions before</label>
            <button onClick={() => updatePhase('confirmation')}>Finish order</button>
        </>
    )
}

export default OrderSummary