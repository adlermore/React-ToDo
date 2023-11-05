import request from "../components/helpers/request";
import * as actionTypes from "./actionTypes";

export function getTasks(params={}) {
    let url = 'http://localhost:3001/task';
    let payloadInfo = '&status=done';
    if(!params.status){
        payloadInfo = ''
    }
    if(params.search){
        url= url+'?search='+params.search+payloadInfo;
    }
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING });
        request(url)
            .then((tasks) => {
                dispatch({ type: actionTypes.GET_TASKS_SUCCESS, tasks })
            })
            .catch(error => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}

export function addTask(data) {
    return (dispatch) => {
        dispatch({ type: actionTypes.ADDING_TASK });
        request('http://localhost:3001/task', 'POST', data)
            .then((tasks) => {
                dispatch({ type: actionTypes.ADD_TASK_SUCCESS, tasks })
            })
            .catch(error => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}

export function removeTask(taskId) {
    return (dispatch) => {
        dispatch({ type: actionTypes.REMOVING_TASK });
        request(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({ type: actionTypes.REMOVE_TASK_SUCCESS, taskId })
            })
            .catch(error => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}

export function removeSelectedTasks(checkedTasks) {
    return (dispatch) => {
        dispatch({ type: actionTypes.REMOVING_TASKS });
        request(`http://localhost:3001/task/`, 'PATCH', { tasks: [...checkedTasks] })
            .then(() => {
                dispatch({ type: actionTypes.REMOVE_TASKS_SUCCESS, checkedTasks })
            })
            .catch(error => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}


export function editTasks(updateText, updateDesc, updateDate, currentId) {
    const data = {
        title: updateText,
        description: updateDesc,
        date: updateDate.toISOString().slice(0, 10)
    }
    return (dispatch) => {
        dispatch({ type: actionTypes.EDITING_TASK });
        request(`http://localhost:3001/task/${currentId}`, 'PUT', data)
            .then((editedTask) => {
                dispatch({ type: actionTypes.EDIT_TASKS_SUCCESS, editedTask, data })
            })
            .catch(error => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}


export function changeTaskStatus(data , activeSwitch) {
    let status;
    if(activeSwitch){
        status = 'done'
    }else{
        status = 'active'
    }

    let reqStaus = {status: status}
    console.log(reqStaus);
    return (dispatch) => { 
        dispatch({ type: actionTypes.CHANGEING_TASK_STATUS });
        request(`http://localhost:3001/task/${data.data._id}`, 'PUT', reqStaus)
            .then((editedTask) => {
                dispatch({ 
                    type: actionTypes.CHANGE_TASK_STATUS_SUCCESS, 
                    editedTask, 
                    status
                })
            })
            .catch(error => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}
