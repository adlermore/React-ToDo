import React, { PureComponent } from "react";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaEdit } from 'react-icons/fa'
import { connect } from "react-redux";
import { removeTask } from "../../store/actions";

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

    render() {
        const { data } = this.props;
        return (
            <Card style={{ width: '18rem' }} className={`card ${this.state.checked ? 'card-warning' : 'asdasd'} `}>
                <input type="checkbox" className="chekbox-btn" onClick={this.toggleCheckbox} />
                <Card.Body>
                    <Card.Title>
                        <Link to={`/task/${data._id}`} >
                            {data.title}
                        </Link>
                    </Card.Title>
                    <Card.Text> Description: {data.description} </Card.Text>
                    <Card.Text> Date: {data.date ? data.date.slice(0, 10) : 'none'} </Card.Text>
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

                                        onClick={()=>this.props.removeTask(data._id)}> 

                                <RiDeleteBin5Line size={19} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-top2`} show={true}  className="tooltip_elem"> Change</Tooltip>
                            }
                        >
                            <Button variant="info"
                                disabled={this.props.disabled}
                                className="task_button"
                                onClick={this.props.onEdit(data)}>
                                <FaEdit size={19} />
                            </Button>
                        </OverlayTrigger>
                    </div>
                </Card.Body>
            </Card>
        );
    }

}


// const mapStatetoProps = (state) => {
//     return {
//         tasks: state.tasks,
//         placeholder : state.loading,
//         editModalShow : state.editModalShow,
//         addTaskSuccess: state.addTaskSuccess
//     }
// }

const mapDispatchToProps = {
    // getTasks : getTasks,
    // handleSave : editTasks
    removeTask : removeTask
}

export default connect(null , mapDispatchToProps)(Task);