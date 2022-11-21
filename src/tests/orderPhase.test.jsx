import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('order phases for happy path', async () => {
    // render app
    render(<App />);

    // add ice cream scoops and toppings
    const chocolateScoops = await screen.findByRole('spinbutton', {name: "Chocolate"})
    userEvent.type(chocolateScoops, "1")
    const fudgeTopping = await screen.findByRole('checkbox', {name: 'Hot fudge'})
    userEvent.click(fudgeTopping)
    const grandTotal = screen.getByText("Grand total: ", {exact: false})
    expect(grandTotal).toHaveTextContent("Grand total: $3.50")
    
    // find and click order summary button
    const reviewOrderBtn = screen.getByRole("button", {name: "Review Order"})
    userEvent.click(reviewOrderBtn)

    // check summary info based on order
    const scoopsTotal = screen.getByText("Scoops: ", {exact: false})
    expect(scoopsTotal).toHaveTextContent("Scoops: $2.00")
    const toppingsTotal = screen.getByText("Toppings: ", {exact: false})
    expect(toppingsTotal).toHaveTextContent("Toppings: $1.50")
    const finalTotal = screen.getByText("TOTAL: ", {exact: false})
    expect(finalTotal).toHaveTextContent("TOTAL: $3.50")
    const terms = screen.getByRole("checkbox", {name: "Accept terms and conditions before"})
    userEvent.click(terms);
    expect(terms).toBeChecked()
    // accept terms and conditions and click button to confirm order
    const finishOrderBtn = screen.getByRole("button", {name: "Finish order"});
    userEvent.click(finishOrderBtn)

    // confirm order number on confirmation page
    const orderNumber = await screen.findByText("Order Confirmation Page: ", {exact: false})
    expect(orderNumber).toBeInTheDocument()

    // click "new order" button on confirmation page
    const newOrderBtn = screen.getByRole("button", {name: "Create new order"})
    userEvent.click(newOrderBtn)

    const reviewBtn = screen.getByRole("button", {name: "Review Order"})
    expect(reviewBtn).toBeInTheDocument()

    // check that scoops and toppings subtotals have been reset
    const scoops = screen.getByText("Scoops total: $0.00", {exact: false})
    expect(scoops).toBeInTheDocument()
    const toppings = screen.getByText("Toppings total: $0.00", {exact: false})
    expect(toppings).toBeInTheDocument()
    
    // do we need to await anything to avoid test errors?
    await screen.findByRole('spinbutton', {name: "Vanilla"})
    await screen.findByRole('checkbox', {name: "Cherries"})
})