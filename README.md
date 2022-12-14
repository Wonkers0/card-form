# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [My Links](#my-links)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

![Screenshot](https://user-images.githubusercontent.com/106038003/204290174-38a9e03b-0d23-4693-aad6-c48777c32fe1.png)

### Links

- Solution URL: [Frontend Mentor]()
- Live Site URL: [Github Pages](https://wonkers0.github.io/card-form/index.html)

## My process

### Built with

- Not-So-Semantic HTML5 Markup
- Flexbox
- [Vite](https://vitejs.dev/) - Web bundler
- [React](https://reactjs.org/) - JS library
- [Typescript](https://www.typescriptlang.org/) - Statically Typed JS
- [Sass](https://sass-lang.com/) - Syntactically Awesome Style Sheets (SASS) For styles

### What I learned

My 2nd ReactJS Project, I've learned a lot specifically about refs, hooks & states;
My first time using TypeScript, learned a lot about type safety, type casting, interfaces, utility types, maps & enums
I also learned a bit about version control & git at the end whilst setting up this repository from within VS Code (I usually do it manually with file uploading ????)

```tsx
export function handleBlur(elem: HTMLInputElement, errorID: string | undefined, validInfo: ValidationInfo) : Validity{
    let errorElem: HTMLHeadingElement // ???? Need to grab error header to display error if input is invalid
    if(errorID == undefined) errorElem = elem.parentElement?.querySelector(".inputError") as HTMLHeadingElement
    else errorElem = document.querySelector("#" + errorID) as HTMLHeadingElement

    if(errorElem == null) throw Error("Missing error element from text input"); // ??? Couldn't find error element for any reason

    let temp: string = validInfo.isCC ? elem.value.replace(/\s+/g, '') : elem.value // Remove spaces from credit card formatting to check validity
    if(validInfo.isCC) validInfo.inputLength = 16 // ???? Resize input length to 16 from 20 (Used to allow the 4 space chars)
    let txtValidity: Validity = isValid(temp, validInfo.numsOnly, validInfo.inputLength) // ???? Check input validity

    if(txtValidity != Validity.VALID){
        elem.classList.add("errorForm"); // ???? Make input border red
        errorElem.classList.remove("hidden") // ???? Show error message
        errorElem.innerText = txtValidity // ???? Grab error message from enum and display it in error header
    }
    else{
        elem.classList.remove("errorForm") // ???? If border was red, change it back to normal because input is now valid
        errorElem.classList.add("hidden") // ???? Hide the error header if it was previously visible
    }

    return txtValidity
}

export enum Validity{
    VALID,
    WRONG_FORMAT = "Wrong format, numbers only",
    BLANK = "Can't be blank",
    INCOMPLETE = "Incomplete, check length of input"
}
```

### Continued development

Will definitely keep practicing react & TS in the future

### Useful resources

- [Stackoverflow Input Formatting](https://stackoverflow.com/questions/36833366/format-credit-card-number) - This helped me format the credit card input field to space out the numbers

## My Links

- Frontend Mentor - [@Wonkers0](https://www.frontendmentor.io/profile/Wonkers0)
- Github - [@Wonkers0](https://www.github.com/Wonkers0)

## Acknowledgments

Thankx eyuserunp and redocmadmn much hehlpgd iwth ractjs framworork????
