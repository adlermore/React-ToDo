import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from '../Modal'
import { Button } from "react-bootstrap";
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function SingleTask() {

    const [Currtask, setCurrTask] = useState({
        _id: '',
        title: '',
        description: '',
        date: ''
    });

    const [editTask, seteditTask] = useState(null);
    const navigate = useNavigate();
    const idParams = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/task/${idParams.id}`, {
            method: 'GET',
            headers: {
                "Content-type": 'application/json'
            }
        })
            .then((response) => response.json())
            .then((task) => {
                if (task.error) {
                    throw task.error;
                }
                setCurrTask(task)
            })
            .catch((err) => {
                console.log('error', err);
            })
    }, [idParams.id])


    const handleEdit = (task) => () => {
        seteditTask(task);
    }

    const modalToggle = () => {
        seteditTask(null);
    }

    const handleSave=(taskTitle , description , date, taskId)=>{
        // console.log(taskId, data , true);
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: taskTitle,
                description: description,
                date: date.toISOString().slice(0, 10)
            }),
            headers: {
                "Content-type": 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    throw data.error;
                }
                setCurrTask({
                    title: taskTitle,
                    description: description,
                    date: date.toISOString().slice(0, 10)
                });
                seteditTask(null);
            })
            .catch((err) => {
                console.log('error', err);
            })

    }

    const removeCurrTask = () =>{
        fetch(`http://localhost:3001/task/${Currtask._id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": 'application/json'
            }
        })
        .then((response) => response.json())
        .then((taskId) => {
            if (taskId.error) {
                throw taskId.error;
            }
            navigate('/');
        })
        .catch((err) => {
            console.log('error', err);
        })
    }

    return (
        <div>
            <div>{Currtask.title}</div>
            <div>{Currtask.description}</div>
            <div>{Currtask.date}</div>
          
            <Button variant="danger"
                className="task_button"
                onClick={removeCurrTask }
                >
                <RiDeleteBin5Line size={19} />
            </Button>

            <Button variant="info"
                className="task_button"
                onClick={handleEdit(Currtask)}
            >
                <FaEdit size={19} />
            </Button>

            {!!editTask &&
                <Modal
                    value={editTask}
                    onSave={handleSave}
                    modalToggle={modalToggle}
                />
            }
        </div>

    );
}


export default SingleTask;