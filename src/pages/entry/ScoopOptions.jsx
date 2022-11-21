
export default function ScoopOptions ({name, imagePath, updateItemCount}) {
    function handleChange(event) {
        console.log("name", name, event.target.value)
        updateItemCount(name, event.target.value)
    }
    
    return (
        <>
            <div>
                <img style={{width: '10%'}}src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`}/> 
                <form id={`${name}-count`}>
                    <label htmlFor={name}>{name}</label>
                    {/* <input type="number" onChange={handleChange}>0</input> */}
                    <input type="number" onChange={handleChange} value="0" role="spinbutton" id={name} name={name}/>
                </form>
            </div>
        </>
    )
}