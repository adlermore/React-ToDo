import React ,{PureComponent} from "react";
import { Card , Button } from "react-bootstrap";

class Task extends PureComponent{
    
    state = {
        checked: false
    }

    toggleCheckbox = ()=>{
        this.setState({
            checked: !this.state.checked
        })
        this.props.onCheck()
    }

    render(){
        const {data}=this.props;
        return (
            <Card style={{ width: '18rem' }} className={`card ${this.state.checked ? 'card-warning' : 'asdasd'} `}>
                <input type="checkbox" className="chekbox-btn" onClick={this.toggleCheckbox} />
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text> Description: {data.description} </Card.Text>
                    <Card.Text> Date: {data.date ? data.date.slice(0, 10): 'none'} </Card.Text>
                    <Button variant="danger" disabled={this.props.disabled} onClick={this.props.onRemove(data._id)}>Remove</Button>
                    <Button variant="info"   disabled={this.props.disabled} className="m-3" onClick={this.props.onEdit(data)}>Change</Button>
                </Card.Body>
            </Card>
        );
    }
    
}

export default Task;