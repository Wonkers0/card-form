import React, { useEffect, useState } from 'react'
import { Mobile } from './App';
import Cards from './Cards';

export default function Banner({mobile}: Mobile){
    return (
    <div className={"relative fitcontent" + (mobile ? "" : " floatLeft")}>
        {mobile ?
        <img src="./src/assets/bg-main-mobile.png" alt="banner" className="fullwidth"/> : 
        <img src="./src/assets/bg-main-desktop.png" alt="banner" className="fullheight parentWidth"/>}
        <Cards mobile={mobile} />
    </div>
    )
}