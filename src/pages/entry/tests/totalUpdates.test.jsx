import {render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from './../Options'
import OrderEntry from './../OrderEntry'

test('update scoop subtotal when scoops change', async () => {
    // wrapper é usado para ficar 'entre/em volta' do componente (assim como é feito o provider)
    render(<Options optionType="scoops" />)
    // busca o elemento pelo texto que não é TOTALMENTE aquilo (tem o valor ainda), exact é true por default
    const scoopsSubTotal = screen.getByText("Scoops total: $", {exact: false})
    expect(scoopsSubTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
    // const vanillaInput = await screen.findByText('Vanilla')
    userEvent.clear(vanillaInput) // limpa qlqer coisa q estiver escrita no input (para n ter erro de começar com 0, etc)
    userEvent.type(vanillaInput, "1")
    expect(scoopsSubTotal).toHaveTextContent('2.00')
    
    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'})
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, "2")
    expect(scoopsSubTotal).toHaveTextContent('6.00')
})

test('update toppings subtotal when toppings change', async () => {
    render(<Options optionType="toppings" />)

    const toppingsTotal = screen.getByText("Toppings total: $", {exact: false})
    expect(toppingsTotal).toHaveTextContent('0.00')

    const cherriesInput = await screen.findByRole('checkbox', {name: 'Cherries'})
    userEvent.click(cherriesInput)
    expect(toppingsTotal).toHaveTextContent('1.50')
    
    const MMsInput = screen.getByRole('checkbox', {name: 'M&Ms'})
    userEvent.click(MMsInput)
    expect(toppingsTotal).toHaveTextContent('3.00')
    
    userEvent.click(cherriesInput)
    expect(toppingsTotal).toHaveTextContent('1.50')

})

describe("grand total", () => {
    // o teste comentado já pode ser testado no teste abaixo
    // test('grand total starts at $0.00', ()=>{
    //     render(<OrderEntry />)
    //     const grandTotal = screen.getByText('Grand total: $', {exact: false})
    //     expect(grandTotal).toHaveTextContent('0.00')
    // })

    test('grand total updates properly if scoop is added first', async () => {
        render(<OrderEntry />)
        const grandTotal = screen.getByText('Grand total: $', {exact: false})

        // check that starts with 0.00
        expect(grandTotal).toHaveTextContent('0.00')
        
        const vanillaInput = await screen.findByRole('spinbutton', {name: "Vanilla"})
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, "2")
        expect(grandTotal).toHaveTextContent('4.00')
        
        const cherriesCheckbox = await screen.findByRole('checkbox', {name: "Cherries"})
        userEvent.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('5.50')
    })

    test('grand total updates properly if topping is added first', async () => {
        render(<OrderEntry />)
        const grandTotal = screen.getByText('Grand total: $', {exact: false})
        
        const cherriesCheckbox = await screen.findByRole('checkbox', {name: "Cherries"})
        userEvent.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('1.50')

        const vanillaInput = await screen.findByRole('spinbutton', {name: "Vanilla"})
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, "1")
        expect(grandTotal).toHaveTextContent('3.50')

    })

    test('grand total updates properly if item is removed', async () => {
        render(<OrderEntry />)
        const grandTotal = screen.getByText('Grand total: $', {exact: false})
        
        const vanillaInput = await screen.findByRole('spinbutton', {name: "Vanilla"})
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, "1")

        const cherriesCheckbox = await screen.findByRole('checkbox', {name: "Cherries"})
        userEvent.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('3.50')

        userEvent.type(vanillaInput, "0")
        
        expect(grandTotal).toHaveTextContent('1.50')
    })
})