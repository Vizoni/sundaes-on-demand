export default function ToppingsOptions ({name, imagePath, updateItemCount}) {
    function handleChange(e) {
        updateItemCount(name, e.target.checked ? 1 : 0)
    }

    return (
        <>
            <div>
                <img style={{width: '10%'}}src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`}/> 
                <form id={`${name}-count`}>
                    <label htmlFor={name}>{name}</label>
                    <input type="checkbox" onChange={handleChange} value="0" id={name} />
                </form>
            </div>
        </>
    )
}