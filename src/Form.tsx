import { useState } from "react"
import { Mobile } from "./App"
import TextInput, { defaultsMap, handleBlur, idMap, isValid, ValidationInfo, Validity } from "./TextInput"

export type InputID = "cardHolder" | "CC" | "month" | "year" | "cvcInput"

export default function Form({mobile}: Mobile){
    const[submitted, setSubmitted] = useState(false)

    let handleBtn = (submit: boolean) => {
        if(submit){
            let shouldReturn: boolean = false
            for(let id of idMap.keys()){
                let elem : HTMLInputElement | null = document.querySelector('#' + id)
                let datasetTxt : string | undefined = elem?.dataset.validinfo
                if(datasetTxt != undefined){
                    let validInfo : ValidationInfo = JSON.parse(datasetTxt)
                    if(elem == null) throw new Error("Missing input field or invalid ID from map")
                    if(handleBlur(elem, elem.dataset.errorid, validInfo) != Validity.VALID) shouldReturn = true
                }
            }
            if(shouldReturn) return
            else setSubmitted(true)
        }
        else{
            for(let id of idMap.values()){
                let elem = document.querySelector(id)
                if(elem != null){
                    let defaultVal = defaultsMap.get(elem.id)
                    if(defaultVal != null) elem.innerHTML = defaultVal
                }
            }
            setSubmitted(false)
        } 
    }
    
    return submitted ? (
        <div className="formWrapper fullheight">
            <img src="./src/assets/icon-complete.svg" alt="Complete form" className="submitted" />
            <h1 className="submitTitle">THANK YOU!</h1>
            <p className="submitSubtitle">We've added your card details</p>
            <button className="confirmBtn" onClick={() => {handleBtn(false)}}>Continue</button>
        </div>
    ) : 
    (
        <div className="formWrapper fullheight">
            <TextInput title="Cardholder Name" error="Can't be blank" placeholder="e.g. Jane Appleseed" id="cardHolder" validInfo={{numsOnly: false}} />
            <TextInput title="Card Number" error="Wrong format, numbers only" placeholder="e.g. 1234 5678 9123 0000" id="CC" validInfo={{
                numsOnly: true,
                isCC: true
            }} />
            <div className="bottomForm">
                <div>
                    <h1 className="inputHeader">Exp. Date (MM/YY)</h1>
                    <div className="expDateWrapper">
                        <TextInput placeholder="MM" errorID="customErr" id="month" width={50} validInfo={{
                            numsOnly: true,
                            inputLength: 2
                        }} />
                        <TextInput placeholder="YY" errorID="customErr" id="year" width={50} validInfo={{
                            numsOnly: true,
                            inputLength: 2
                        }} />
                    </div>
                    <h1 className="inputError hidden" id="customErr">Can't be blank</h1>
                </div>

                <TextInput title="CVC" error="Can't be blank" id="cvcInput" placeholder="e.g. 123" width={mobile? 75 : 150} validInfo={{
                    numsOnly: true,
                    inputLength: 3
                }} />
            </div>

            <button className="confirmBtn" onClick={() => {handleBtn(true)}}>Confirm</button>
        </div>
    )
}