import React, { PureComponent } from "react";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { BsCheckSquare } from 'react-icons/bs';
import { BsCheckSquareFill } from 'react-icons/bs';
import { connect } from "react-redux";
import { removeTask } from "../../store/actions";
import { changeTaskStatus } from "../../store/actions";


class Task extends PureComponent {

    state = {
        checked: false
    }
    
    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        })
        this.props.onCheck()
    }

    handleStatusToggle = (status)=>{
        let statusToggle;
        if(status==='done'){
            statusToggle=false
        }else{
            statusToggle=true
        }
        this.props.statusSwitch(this.props , statusToggle)
    }

    render() {
        const { data } = this.props;
        return (
            <Card style={{ width: '18rem' }} className={`card ${this.state.checked ? 'card-warning' : 'asdasd'} `}>
                <input type="checkbox" className="chekbox-btn" onClick={this.toggleCheckbox} />
                <Card.Body>
                    <Card.Title>
                        <Link to={`/task/${data._id}`} className="card-name" >
                            {data.title}
                        </Link>
                    </Card.Title>
                    <Card.Text className="card-description"> Description: {data.description} </Card.Text>
                    <Card.Text> Date: {data.date ? data.date.slice(0, 10) : 'none'} </Card.Text>
                    <Card.Text> status: {data.status} </Card.Text>
                    <div className="task_buttons bootstrap-demo ">
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                                <Tooltip show={true} id={`tooltip-top1`} className="tooltip_elem"> Remove</Tooltip>
                            }
                        >
                            <Button variant="danger"
                                disabled={this.props.disabled}
                                className="task_button"

                                onClick={() => this.props.removeTask(data._id)}>

                                <RiDeleteBin5Line size={19} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-top2`} show={true} className="tooltip_elem"> Change</Tooltip>
                            }
                        >
                            <Button variant="info"
                                disabled={this.props.disabled}
                                className="task_button"
                                onClick={this.props.onEdit(data)}>
                                <FaEdit size={19} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-top2`} show={true} className="tooltip_elem"> Active/Done</Tooltip>
                            }
                        >
                            <Button variant="success"
                                disabled={this.props.disabled}
                                className="task_button"

                                onClick={()=>this.handleStatusToggle(data.status)}>

                                {data.status!=='done' ?
                                    <BsCheckSquare size={19} />
                                    :
                                    <BsCheckSquareFill size={19} />
                                }

                            </Button>
                        </OverlayTrigger>
                    </div>
                </Card.Body>
            </Card>
        );
    }

}

const mapDispatchToProps = {
    removeTask: removeTask,
    statusSwitch: changeTaskStatus
}

export default connect(null, mapDispatchToProps)(Task);