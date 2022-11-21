import {screen, render, waitForElementToBeRemoved } from '@testing-library/react'
import SummaryForm from '../SummaryForm'
import userEvent from '@testing-library/user-event'

describe('SummaryForm()', () => {
    it("checkbox starts unchecked", () => {
        render(<SummaryForm />)
        const checkbox = screen.getByRole('checkbox')
        const button = screen.getByRole('button', {name: "Click"})
        expect(checkbox).not.toBeChecked();
        expect(button).toBeDisabled();
    })
    it("enables button if checkbox is checked", () => {
        render(<SummaryForm />)
        const checkbox = screen.getByRole('checkbox')
        const button = screen.getByRole('button', {name: "Click"})
        userEvent.click(checkbox)
        expect(checkbox).toBeChecked();
        expect(button).toBeEnabled();
    })
    it("unchecking checkbox disables button back", () => {
        render(<SummaryForm />)
        const checkbox = screen.getByRole('checkbox')
        const button = screen.getByRole('button', {name: "Click"})
        userEvent.click(checkbox)
        expect(checkbox).toBeChecked();
        expect(button).toBeEnabled();
        userEvent.click(checkbox)
        expect(checkbox).not.toBeChecked();
        expect(button).toBeDisabled();
    })
    it("popover responds to hover", async () => {
        render(<SummaryForm />)
        const termsAndConditions = screen.getByText(/terms/)
        const nonInitiatedPopOver = screen.queryByText(/help/i)
        expect(nonInitiatedPopOver).not.toBeInTheDocument();
        userEvent.hover(termsAndConditions)
        const popOver = screen.getByText(/help/i)
        expect(popOver).toBeInTheDocument();
        userEvent.unhover(termsAndConditions)
        // await waitForElementToBeRemoved(() => screen.queryByText(/help/i))
        // expect(disapperedPopOver).not.toBeInTheDocument();
        expect(popOver).not.toBeInTheDocument();
    })
})