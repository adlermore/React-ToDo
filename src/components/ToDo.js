import React, { PureComponent } from "react";
import { Container, Row, Col, Button, Placeholder, Card } from "react-bootstrap";
import NewTask from "./NewTask"
import Task from "./Task/Task";
import Confirm from './Confirm'
import Modal from './Modal';
import emptyImg from '../assets/img/empty_img.png'
import { connect } from "react-redux";
import { editTasks, getTasks, removeSelectedTasks } from "../store/actions";

class ToDo extends PureComponent {
    state = {
        checkedTasks: new Set(),
        modalShow: false,
        editTask: null,
        placeholder: true,
        openNewTaskModal: false
    }

    componentDidMount() {
        this.props.getTasks();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({ openNewTaskModal: false })
        }

        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.modalToggle();
        }

        if (!prevProps.removeTasksSuccess && this.props.removeTasksSuccess) {
            this.setState({
                checkedTasks: new Set()
            })
        }
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

    removeSelectedTasksInner = () => {
        const checkedTasks = new Set(this.state.checkedTasks);
        this.props.removeSelectedTasks(checkedTasks);

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


    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    toggleNewTaslModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        })
    }

    render() {

        const { tasks, placeholder } = this.props;
        const tasksContainer = tasks.map((task) =>
            <div key={task._id} className="task_block">
                <Task
                    disabled={!!this.state.checkedTasks.size}
                    data={task}
                    // onRemove={this.removeTask}
                    onEdit={this.handleEdit}
                    onCheck={this.handleCheck(task._id)}
                />
            </div>
        )

        return (
            <Container fluid={true} className="main_section">
                <Row>
                    <Col>
                        <div className="input_container">
                            <Button
                                className="my-auto "
                                variant="primary"
                                disabled={!!this.state.checkedTasks.size}
                                onClick={this.toggleNewTaslModal}
                            >
                                Add  New Task
                            </Button>
                        </div>
                    </Col>
                </Row>
                {placeholder ?
                
                    <div className="tasks_list">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                    <Placeholder xs={6} /> <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={6} />
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                    <Placeholder xs={6} /> <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={6} />
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                    <Placeholder xs={6} /> <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={6} />
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                    <Placeholder xs={6} /> <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={6} />
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                    <Placeholder xs={6} /> <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={6} />
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                    <Placeholder xs={6} /> <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={6} />
                            </Card.Body>
                        </Card>
                    </div>
                    :
                    <>
                        {tasks.length > 0
                            ?
                            <div className="tasks_list">
                                {tasksContainer}
                            </div>
                            : <div className="empty_block">
                                <div className="empty_title">ToDo List is Empty</div>
                                <img src={emptyImg} alt="emptyImage" />
                            </div>
                        }
                    </>
                }
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
                            onSubmit={this.removeSelectedTasksInner}
                            confirmToggle={this.confirmToggle}
                        />
                    }
                    {!!this.state.editTask &&
                        <Modal
                            value={this.state.editTask}
                            onSave={this.props.handleSave}
                            modalToggle={this.modalToggle}
                        />
                    }
                    {this.state.openNewTaskModal &&
                        <NewTask onCancel={this.toggleNewTaslModal} />
                    }
                </Row>
            </Container>
        )
    }
}

// export default ToDo;

const mapStatetoProps = (state) => {
    return {
        tasks: state.tasks,
        placeholder: state.loading,
        addTaskSuccess: state.addTaskSuccess,
        editTaskSuccess: state.editTaskSuccess,
        removeTasksSuccess : state.removeTasksSuccess
    }
}

const mapDispatchToProps = {
    getTasks: getTasks,
    handleSave: editTasks,
    removeSelectedTasks: removeSelectedTasks
}

export default connect(mapStatetoProps, mapDispatchToProps)(ToDo);