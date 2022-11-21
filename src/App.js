import { useState } from 'react';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
	const [orderPhase, setOrderPhase] = useState('inProgress');

	return (
		<div>
			<OrderDetailsProvider>
				{/* {sumary page and entry page need provider} */}
				{orderPhase === 'inProgress' && (
					<OrderEntry updatePhase={setOrderPhase} />
				)}
				{orderPhase === 'review' && (
					<OrderSummary updatePhase={setOrderPhase} />
				)}
				{orderPhase === 'confirmation' && (
					<OrderConfirmation updatePhase={setOrderPhase} />
				)}
			</OrderDetailsProvider>
			{/* confirmation page does not need provider */}
		</div>
	);
}

export default App;
