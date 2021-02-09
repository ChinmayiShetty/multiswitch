import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import MultiSwitch from'./MultiSwitch';
import ProductComponent from "./ProductComponent";


import { Button } from 'reactstrap';

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value_key: "",
            fieldVal: ""

        }
    }
    parentFunction=(data_from_child)=>{
        this.setState({value_key:data_from_child});
    }

    onUpdate = (val) => {
        this.setState({
            fieldVal: val
        })
    };
    render(){
        return(      <div className="multiswitch">
                <MultiSwitch />


            </div>
        )
    }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);



export default App;
