import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ count, confirmToggle, onSubmit }) {

    const [show, setShow] = useState(true);

    const handleClose = () => {
        confirmToggle();
        setShow(false)
    }

    const removeSelected = () => {
        onSubmit();
        handleClose();
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Removed Tasks {count}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don not even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={removeSelected}>Removed</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;