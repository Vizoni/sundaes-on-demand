import {useState} from 'react'

function SummaryForm() {
    const [isChecked, setIsChecked] = useState(false)
    const [displayPopOver, setDisplayPopOver] = useState(false)
    return (
        <>
            <input type="checkbox" onChange={() => setIsChecked(!isChecked)} id="checkbox-terms"/>
            <label htmlFor="checkbox-terms"
            onMouseOver={() => setDisplayPopOver(true)}
            onMouseOut={() => setDisplayPopOver(false)}
            >I agree to the terms and conditions</label>
            {displayPopOver && (
                <span>Help</span>
            )}
            <button disabled={!isChecked}>
                Click
            </button>
        </>
    )
}

export default SummaryForm