import React from "react";
import { button } from "reactstrap";
import ProductComponent from "./ProductComponent";
import Products from "./data/products.json";

class MultiSwitch extends React.Component {
    constructor(props) {
        super(props);
        const people = [];

        this.state = {
            simCount: "2",
            product: Products,
            dataSelected: "1GB",
            showPriceCard: false
        };
    }
    componentDidMount() {
        this.setState({
            showPriceCard: true
        })
        this.updateProductJson(this.state.simCount,this.state.dataSelected);

    }

    updateProductJson = (simCount,dataValue) => {

        let productsDataSelected = this.state.product["MOB-"+dataValue],

            productSimSelected = productsDataSelected.filter(sim => sim.sim_count == simCount),
        simSelectedOne = productsDataSelected.filter(sim => sim.sim_count == 1);


        this.setState({
            productSelected:  productSimSelected[0],
            simSelectedOne: simSelectedOne[0]
        })
﻿
    };

    handleClickSim = (e) => {
        this.setState({
            simCount: e.target.value,
        });
       this.updateProductJson(e.target.value,this.state.dataSelected);

        console.log(e.target.value);
        e.target.parentElement
            .querySelectorAll(".button-selected-active")
            .forEach((e) => e.classList.remove("button-selected-active"));

        e.target.classList.add("button-selected-active");
    };

    handleClickSimData = (e) => {
        this.setState({
            dataSelected: e.target.value,
            jsondata :'data'
        });
        this.updateProductJson(this.state.simCount,e.target.value);
            console.log(e.target.value);


            e.target.parentElement
            .querySelectorAll(".button-selected-active")
            .forEach((e) => e.classList.remove("button-selected-active"));

        e.target.classList.add("button-selected-active");
       /* e.target.parentElement.nextElementSibling.children[0].classList.add("hide");
        e.target.parentElement.nextElementSibling.children[3].children[12].classList.add("hide")*/

        if (e.target.value === "40GB") {
            e.target.parentElement.nextElementSibling.classList.add("change-border");

        }
        e.target.parentElement.nextElementSibling.classList.remove("change-border");

        /*if (e.target.value === "6GB") {
            e.target.parentElement.nextElementSibling.children[3].children[12].classList.remove("hide");
                var productArr = Object.keys(Products);

                    console.log(productArr.indexOf(e.target.value));

        }*/
    };

    render() {
        const buttonListElements = [],
            n = 5,
            dataCount = [],
            productArr = Object.keys(Products),
            productVal = Object.values(Products),
            productEntries = Object.entries(Products),
            jsonVal = [];

        let jsonData = productVal.map((item,index) =>
            item.map((val,index) => <p> {val.monthly_cost} </p>)
        );
        /*var value= jsonData[productArr.indexOf("MOB-"+this.state.dataSelected)][this.state.simCount-1];
        var v =  value.props.children[1]*0.01;*/
        for (let i = 2; i <= n; i++) {
            buttonListElements.push(
                <button
                    className="btn btn-outline btn-lg"
                    value={i}
                    onClick={this.handleClickSim}>
                    {i}
                </button>
            );
        }

        for (let i = 0; i < productArr.length; i++) {
            let datasimVal = productArr[i].replace("MOB-", "");
            dataCount.push(
                <button
                    className="btn btn-outline btn-lg"
                    value={datasimVal}
                    onClick={this.handleClickSimData}>
                    {datasimVal}</button>

            );


        }

        /*for (let i = 0 ;i < productVal.length;i++){
                let jsonval = productVal[i].was_data_allowance;

                jsonData.push(
                    <p>{jsonval}</p>
                );
            }*/

        return (
            <div className="multi-switch-Component">
                <div class="multiswitch-border">
                    <h3> How many SIMs do you need ? </h3>
                    <p> Each extra SIM has a 20 % discount </p>
                    <ul> {buttonListElements} </ul>
                </div>{" "}
                <div className="multiswitch">
                    <h3> How much data would you like per SIM ? </h3> {dataCount}
                </div>
                {this.state.showPriceCard ?   <ProductComponent
                    simCount={this.state.simCount}
                    simData={this.state.dataSelected} productPrice={this.state.productSelected} simSelected={this.state.simSelectedOne}/> : null}
                    </div>

        );
    }
}

export default MultiSwitch;
