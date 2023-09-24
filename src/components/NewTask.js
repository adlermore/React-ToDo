import React, { PureComponent } from "react";
import {Form, InputGroup, Button } from "react-bootstrap";


class NewTask extends PureComponent {

    state = {
        inputValue: ''
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            this.sendValue()
        }
    }

    sendValue=()=>{
        const {inputValue} = this.state;
        if(!inputValue){
            return;
        }
        this.props.onAdd(this.state.inputValue);
        this.setState({
            inputValue : ""
        })
    }

    render() {
        return (
            <InputGroup
                className="mb-3">
                <Form.Control
                    value={this.state.inputValue}
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={event => this.handleChange(event)}
                    onKeyDown={this.handleKeyDown}
                    disabled={this.props.disabled}
                />
                <Button onClick={this.sendValue} disabled={this.props.disabled} variant="outline-secondary" id="button-addon2">
                    Add Task
                </Button>
            </InputGroup>
        );
    }
}

export default NewTask;