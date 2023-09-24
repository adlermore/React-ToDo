import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NewTask from "./NewTask"
import Task from "./Task";
import Confirm from './Confirm'
import Modal from './Modal';


class ToDo extends Component {
    state = {
        tasks: [],
        checkedTasks: new Set(),
        modalShow: false,
        editTask: null
    }

    componentDidMount(){
        
        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers : {
                "Content-type": 'application/json'
            }
        })
        .then((response) => response.json())
        .then((tasks) => {
            if(tasks.error){
                throw tasks.error;
            }
            this.setState({
                tasks
            })
        })
        .catch((err)=>{
            console.log('error' , err);
        })
    } 

    addTask = (inputValue) => {
        const data= {title: inputValue};

        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(data),
            headers : {
                "Content-type": 'application/json'
            }
        })
        .then((response) => response.json())
        .then((task) => {
            if(task.error){
                throw task.error;
            }
            this.setState({
                tasks: [task , ...this.state.tasks]
            })
        })
        .catch((err)=>{
            console.log('error' , err);
        })
    }

    handleCheck = (taskId) => () => {
        const checkedTasks = new Set(this.state.checkedTasks);

        if (checkedTasks.has(taskId)) {
            checkedTasks.delete(taskId)
        } else {
            checkedTasks.add(taskId)
        }
        this.setState({
            checkedTasks
        })
    }

    removeTask = (taskId) => () => {
        const customTasks = [...this.state.tasks];
        const updatedTask = customTasks.filter((Task) => Task._id !== taskId)
        this.setState({
            tasks: updatedTask
        })
    }

    removeSelectedTasks = () => {
        const checkedTasks = new Set(this.state.checkedTasks);
        let tasks = [...this.state.tasks];

        checkedTasks.forEach(taskId => {
            tasks = tasks.filter(task => task._id !== taskId)
        });

        checkedTasks.clear();
        this.setState({
            tasks,
            checkedTasks
        })
    }

    handleEdit = (task) => () => {
        this.setState({ editTask: task })
    }
    modalToggle = () => {
        this.setState({ editTask: null })
    }

    confirmToggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    handleSave = (updateText, currentId) => {
        const tasks = [...this.state.tasks];
        const taskIndex = tasks.findIndex((task) => task._id === currentId);
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            text: updateText
        };

        this.setState({
            tasks: tasks,
            editTask: null
        })
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        const tasksContainer = this.state.tasks.map((task) =>
            <div key={task._id} className="task_block">
                <Task
                    disabled={!!this.state.checkedTasks.size}
                    data={task}
                    onRemove={this.removeTask}
                    onEdit={this.handleEdit}
                    onCheck={this.handleCheck(task._id)}
                />
            </div>
        )

        return (
            <Container fluid={true}>
                <Row>
                    <Col>
                        <div className="input_container">
                            <NewTask onAdd={this.addTask} disabled={!!this.state.checkedTasks.size} />
                        </div>
                    </Col>
                </Row>
                <div className="tasks_list">{tasksContainer}</div>
                <Row className="justify-content-center dellete_row">
                    <Button
                        variant="danger"
                        className="dellete_btn"
                        disabled={this.state.checkedTasks.size ? false : true}
                        onClick={this.confirmToggle}
                    >
                        Remove Selected
                    </Button>
                    {this.state.modalShow &&
                        <Confirm count={this.state.checkedTasks.size}
                            onSubmit={this.removeSelectedTasks}
                            confirmToggle={this.confirmToggle}
                        />
                    }
                    {!!this.state.editTask &&
                        <Modal
                            value={this.state.editTask}
                            onSave={this.handleSave}
                            modalToggle={this.modalToggle}
                        />
                    }

                </Row>
            </Container>
        )
    }
}

export default ToDo;