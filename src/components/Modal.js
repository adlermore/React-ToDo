import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, InputGroup, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function TaskModal({ value, modalToggle, onSave }) {
    const [editTask, seteditTask] = useState(value.title);
    const [editDesc, seteditDesc] = useState(value.description);
    const [date, setdate] = useState(new Date());

    const handleClose = () => {
        modalToggle()
    }

    const changeTaskName = () => {
        if (editTask) {
            onSave(editTask, editDesc, date , value._id  )
        }
    }

    const editTaskName = (e) => {
        seteditTask(e.target.value)
    }

    const editTaskDesc = (e) => {
        seteditDesc(e.target.value)
    }

    const editTaskDate = (e) => {
        setdate(e)
    }
    
    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Tasks {value.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please Edit this Task Name
                </Modal.Body>
                <Modal.Body>
                    <InputGroup
                        className="mb-3">
                        <Form.Control
                            value={editTask}
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(evt) => editTaskName(evt)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            placeholder="Input Task Description..."
                            value={editDesc}
                            onChange={(evt) => editTaskDesc(evt)}
                            style={{ height: '100px' }}
                        />
                    </InputGroup>
                    <DatePicker
                        showIcon
                        selected={date}
                        minDate={new Date()}
                        className="datepicker_block form-control"
                        onChange={(evt) => editTaskDate(evt)}
                    />


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={changeTaskName}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TaskModal;