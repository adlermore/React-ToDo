import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTasks } from '../../store/actions';

function Header(props) {
    const location = useLocation();
    const [search, setseatch] = useState('');
    const [activeTask, setactiveTask] = useState(false);

    const handleActiveChange =(e)=>{
        setactiveTask(e.target.checked)
    }
    const handleInputChange = (e) => {
        setseatch(e.target.value)
    }

    const handleSubmit = () => {
        props.getTasks({
            search: search,
            status : activeTask
        })
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid={true} className='haeder_container'>
                <Navbar.Brand href="/">ToDo.am</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '110px' }}
                        navbarScroll
                    >
                        <Nav.Link as={NavLink} to="/" >Home</Nav.Link >
                        <Nav.Link as={NavLink} to="/task" className={location.pathname === '/task' ? 'header_link active' : 'header_link'}>Task </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Only Active Tasks... "
                            onChange={handleActiveChange}
                        />
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={search}
                            onChange={handleInputChange}
                        />
                        <Button variant="outline-success" onClick={handleSubmit} >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const mapDispatchToProps = {
    getTasks: getTasks
}

export default connect(null, mapDispatchToProps)(Header);
