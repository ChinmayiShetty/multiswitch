
import React from 'react'
import sim from './icon-sim-purple.svg';
import tickmark from './icon-tick-green.png';
import Countdown from 'react-countdown';




 class ProductComponent extends React.Component {
     constructor(props) {
         super(props);

     }
     handleClick = () => {
         this.props.onHeaderClick(this.props.value);
     }

    state = {
        days: 3,
        hours: 11,
        minutes: 14,
        seconds: 35
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }


       GetPriceInEuro = (cost) => {

         return (
             Math.round(cost * 0.010)
         )
     }


     comparePrice = (previous,current) => {
let wasPrice = "";
         if(current<previous){
             wasPrice= <div className="saved-price"><span>Was </span><span class="was-price">&#163;{this.GetPriceInEuro(previous)}</span></div>
         }
         return wasPrice;
     }

     savingPrice = (selectedsimcountPrice,simCountONePrice) => {
         let savedPrice = (simCountONePrice*this.props.simCount) -selectedsimcountPrice;
         if(savedPrice){
             return <div className="saving-text">&#163;{this.GetPriceInEuro(savedPrice)} a month Family SIM saving</div>
         }
         return "";


     }

     render() {

         const monthlyCost = this.props.productPrice.monthly_cost,
                     renderer = ({ days, hours, minutes, seconds }) => {
                     // Render a countdown
                     return <span className='countdown-timer' >{days}d {hours}h {minutes}m {seconds}s</span>;
                 };


             return (
                 <div className="container-class">
                         {this.props.productPrice.countdown_end_time ? <div class="count-down"><span>Pricehas never been lower</span> <Countdown date={this.props.productPrice.countdown_end_time} renderer={renderer} /></div> :null}
                     <div className="container">
                         <img src={sim} className="App-logo" alt="logo"/>
                         <div className="centered">
                             <h4> {this.props.simCount}</h4>
                             SIMs
                         </div>

                     </div>

                         <div className="data-section">
                             <h3>{this.props.simData}</h3>
                               <span>data allowance each</span>

                         </div>
                     <div class="plan-features">
                         <div className="plan-text">
                         <img src={tickmark} className="tick-mark" alt="logo"/>
                         <span>4G and 5G enabled</span><br/>
                         <img src={tickmark} className="tick-mark" alt="logo"/>
                         <span>Unlimited minutes and texts</span><br/>
                         <img src={tickmark} className="tick-mark" alt="logo"/>
                         <span>Access to 5 million BT Wi-fi hotspots</span><br/>
                         <img src={tickmark} className="tick-mark" alt="logo"/>
                         <span>30-day money-back guarantee</span><br/>
                         </div>
                         {this.props.productPrice.merch_strip_text ?
                             <p className="merch-sixGB">Price has never been lower</p>
                         : null}
                         <div className="price-card">

                             {this.comparePrice(this.props.productPrice.was_monthly_cost,this.props.productPrice.monthly_cost)}  <h2 class="price">&#163;{this.GetPriceInEuro(monthlyCost)}</h2> <sup className="caret">&Delta;</sup>  a month
                             {this.savingPrice(monthlyCost,this.props.simSelected.monthly_cost)}
                             <p>12-month contract</p>
                             <button className="choose-plan-cta">Choose plan
                             </button>
                         </div>

                     </div>
                     </div>

             )
         }


}


export default ProductComponent;