import { InputID } from "./Form"

export interface ValidationInfo{
    numsOnly?: boolean,
    inputLength?: number,
    isCC?: boolean
} 

interface InputProps{
    title?: string,
    placeholder?: string,
    error?: string,
    errorID?: string,
    validInfo: ValidationInfo,
    id: InputID,
    width?: number
}

export function handleBlur(elem: HTMLInputElement, errorID: string | undefined, validInfo: ValidationInfo) : Validity{
    let errorElem: HTMLHeadingElement
    if(errorID == undefined) errorElem = elem.parentElement?.querySelector(".inputError") as HTMLHeadingElement
    else errorElem = document.querySelector("#" + errorID) as HTMLHeadingElement

    if(errorElem == null) throw Error("Missing error element from text input");

    let temp: string = validInfo.isCC ? elem.value.replace(/\s+/g, '') : elem.value
    if(validInfo.isCC) validInfo.inputLength = 16
    let txtValidity: Validity = isValid(temp, validInfo.numsOnly, validInfo.inputLength) 

    if(txtValidity != Validity.VALID){
        elem.classList.add("errorForm");
        errorElem.classList.remove("hidden")
        errorElem.innerText = txtValidity
    }
    else{
        elem.classList.remove("errorForm")
        errorElem.classList.add("hidden")
    }

    return txtValidity
}

export var idMap = new Map<string, string>([
    ["cardHolder", "#cardOwner"],
    ["CC", "#cardNum"],
    ["month", "#expMonth"],
    ["year", "#expYear"],
    ["cvcInput", "#CVC"]
])

export var defaultsMap = new Map<string, string>([
    ["cardOwner", "Jane Appleseed"],
    ["cardNum", "0000  0000  0000  0000"],
    ["expMonth", "00"],
    ["expYear", "00"],
    ["CVC", "000"]
])


function handleInput(input : HTMLInputElement, isCC: boolean){
    if(isCC) cc_format(input)

    if(input.id != undefined){
        let elem : HTMLElement | null
        let temp = idMap.get(input.id)
        
        if(temp != undefined){
            elem = document.querySelector(temp)
            if(elem != null){
                let defaultTxt = defaultsMap.get(elem.id)
                if(defaultTxt != null) // Should always be true but y'know, type safety 😒
                    elem.innerText = input.value == "" ? defaultTxt : input.value;
            }
        } 
    }
}

export enum Validity{
    VALID,
    WRONG_FORMAT = "Wrong format, numbers only",
    BLANK = "Can't be blank",
    INCOMPLETE = "Incomplete, check length of input"
}

export function isValid(text: string, numsOnly: boolean | undefined, desiredLen?: number): Validity {
    if(numsOnly){
        let nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        for(const char of text.split(''))
            if(!nums.includes(char)) return Validity.WRONG_FORMAT
    }
    
    if (text == "") return Validity.BLANK
    else if(desiredLen != undefined && text.length < desiredLen) return Validity.INCOMPLETE
    return Validity.VALID
}

export default function TextInput({title, placeholder="", id, error, errorID, validInfo, width=376}: InputProps){
    return (
        <div>
            {title == undefined ? <></> : <h1 className="inputHeader">{title}</h1>}
            <input type="text" id={id} placeholder={placeholder} className="inputForm" style={{width:width}} 
                onBlur={(e) => {handleBlur(e.target, errorID, validInfo)}} 
                maxLength={validInfo.inputLength} data-validinfo={JSON.stringify(validInfo)} data-errorid={errorID} 
                onInput={(e) => {handleInput(e.target as HTMLInputElement, validInfo.isCC != null && validInfo.isCC)}}>
            </input>
            {error == undefined ? <></> : <h1 className="inputError hidden">{error}</h1>}
        </div>
    )
}

// 👉 https://stackoverflow.com/questions/36833366/format-credit-card-number
function cc_format(input: HTMLInputElement) : void {
    let matches = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').match(/\d{4,16}/g);
    let match = matches && matches[0] || ''
    let parts = []

    for (let i: number = 0, len: number = match.length; i < len; i += 4) parts.push(match.substring(i, i+4))
    if (parts.length) input.value = parts.join(' ')
}