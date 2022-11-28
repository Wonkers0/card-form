interface CardsProps{
    mobile: boolean
}

export default function Cards(props: CardsProps){
    return (
        <>
            <div className={props.mobile ? "cardWrapper-Mobile" : "cardWrapper-Desktop"} style={{zIndex: 1}}>
                <div className={(props.mobile ? "frontCard-Mobile" : "frontCard-Desktop") + " card"} style={{backgroundImage: `url("./src/assets/bg-card-front.png")`}}>
                    <img src="./src/assets/card-logo.svg" alt="Card Logo" id="cardLogo" />
                    <div className="cardInfo">
                        <p id="cardNum">0000  0000  0000  0000</p>
                        <div className="cardInfo2">
                            <div className="textWrapper"><p id="cardOwner">Jane Appleseed</p></div>
                            <p id="expDate">
                                <span id="expMonth">00</span>
                                /
                                <span id="expYear">00</span>    
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={props.mobile ? "cardWrapper-Mobile" : "cardWrapper-Desktop"}>
                <div className={(props.mobile ? "backCard-Mobile" : "backCard-Desktop") + " card"} style={{backgroundImage: `url("./src/assets/bg-card-back.png")`}}>
                    <p id="CVC">000</p>
                </div>
            </div>
        </>
    )
}