import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, InputGroup, Button } from "react-bootstrap";

function TaskModal({ value, modalToggle, onSave }) {
    const [editTask, seteditTask] = useState(value.text);


    const handleClose = () => {
        modalToggle()
    }

    const changeTaskName = () => {
        if (editTask) {
            onSave(editTask, value.id)
        }
    }

    const editTaskName = (e) => {
        seteditTask(e.target.value)
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
                    <Modal.Title>Edit Tasks {value.id} </Modal.Title>
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