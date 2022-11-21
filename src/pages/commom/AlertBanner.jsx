export default function AlertBanner({message, variant}) {
    const alertMessage = message || "An unexpected error ocurred";
    const alertVariant = variant || 'danger'

    return (
        <div role="alert" variant={alertVariant}>
            {alertMessage}
        </div>
    )
}