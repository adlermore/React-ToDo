import React, { PureComponent } from "react";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class NewTask extends PureComponent {

    state = {
        title: '',
        description: '',
        date: new Date(),
        validated: false
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({
            validated: true
        });
    };

    handleChange = (type, value) => {
        this.setState({
            [type]: value
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSave()
        }
    }

    handleSave = () => {
        const { title, description, date } = this.state;
        if (!title || !description) return;

        const data = {
            title,
            description,
            date: date.toISOString().slice(0, 10)
        }
        this.props.onAdd(data)
    }

    render() {
        return (
            <Modal
                show={true}
                onHide={this.props.onCancel}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal_title">Add New Tasks </Modal.Title>
                </Modal.Header>

                <Modal.Body className="modal_description">
                    Please Enter New Task Name , Description and Date for complited this task.
                </Modal.Body>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <InputGroup
                            className="mb-3">
                            <Form.Control
                                required
                                value={this.state.title}
                                onChange={(event) => this.handleChange('title', event.target.value)}
                                onKeyDown={this.handleKeyDown}
                                placeholder="Input Task"
                                aria-label="Input Task"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Form.Control
                                required
                                as="textarea"
                                placeholder="Input Task Description..."
                                value={this.state.description}
                                onChange={(event) => this.handleChange('description', event.target.value)}
                                style={{ height: '100px' }}
                            />
                        </InputGroup>
                        <DatePicker
                            required
                            showIcon
                            selected={this.state.date}
                            minDate={new Date()}
                            className="datepicker_block form-control"
                            onChange={(value) => this.handleChange('date', value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit" onClick={this.handleSave}>Add</Button>
                        <Button variant="primary" onClick={this.props.onCancel}>Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default NewTask;

