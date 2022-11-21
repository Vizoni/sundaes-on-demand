import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

const renderWithContext = (ui, options) => render(ui, {wrapper: OrderDetailsProvider, ...options})

// re-export everything from the library (screen, etc) 
export * from '@testing-library/react'

// override render method
// everytime you render something, it renders wrapped with OrderDetailsProvider
export { renderWithContext as render }