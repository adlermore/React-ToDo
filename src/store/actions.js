import request from "../components/helpers/request";
import * as actionTypes from "./actionTypes";

export function getTasks(){
    return (dispatch)=>{
        dispatch({type: actionTypes.LOADING});
        request('http://localhost:3001/task')
        .then((tasks)=> {
            dispatch({type: actionTypes.GET_TASKS_SUCCESS , tasks})
        })
        .catch(error => {
            dispatch({type: actionTypes.ERROR , error: error.message})
        } )
    }
}

export function addTask(data){
    return (dispatch)=>{
        dispatch({type: actionTypes.ADDING_TASK});
        request('http://localhost:3001/task' , 'POST' , data)
        .then((tasks)=> {
            dispatch({type: actionTypes.ADD_TASK_SUCCESS , tasks})
        })
        .catch(error => {
            dispatch({type: actionTypes.ERROR , error: error.message})
        } )
    }
}


export function editTasks(updateText, updateDesc, updateDate, currentId){
    const  data = {
        title: updateText,
        description: updateDesc,
        date: updateDate.toISOString().slice(0, 10)
    }
    return (dispatch)=>{
        dispatch({type: actionTypes.LOADING});
        request(`http://localhost:3001/task/${currentId}` , 'PUT' , data)
        .then((editedTask)=> {
            dispatch({type: actionTypes.EDIT_TASKS_SUCCESS ,  editedTask , data })
        })
        .catch(error => {
            dispatch({type: actionTypes.ERROR , error: error.message})
        } )
    }
}

