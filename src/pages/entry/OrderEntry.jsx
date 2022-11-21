import {useState} from 'react'
import Options from './Options'
import { useOrderDetails } from '../../contexts/OrderDetails'

export default function OrderEntry ({updatePhase}) {
    const [OrderDetails] = useOrderDetails()

    return (
        <div>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>Grand total: {OrderDetails.totals.grandTotal}</h2>
            <button onClick={() => updatePhase("review")}>Review Order</button>
        </div>
    )
}