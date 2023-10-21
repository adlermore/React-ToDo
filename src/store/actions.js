import request from "../components/helpers/request";
// import { GETTING_TASKS, GET_TASKS_SUCCESS } from "./actionTypes";

import * as actionTypes from "./actionTypes";

export function getTasks(){

    return (dispatch)=>{
        dispatch({type: actionTypes.GETTING_TASKS});
        request('http://localhost:3001/task')
        .then((tasks)=> {
            dispatch({type: actionTypes.GET_TASKS_SUCCESS , tasks})
        })
        .catch(error => {
            dispatch({type: actionTypes.GETTING_TASKS_FAILURE , error: error.message})
        } )
    }
}

export function editTasks(updateText, updateDesc, updateDate, currentId){

    // data = {
    //     title: updateText,
    //     description: updateDesc,
    //     date: updateDate.toISOString().slice(0, 10)
    // }

    return (dispatch)=>{
        dispatch({type: actionTypes.EDITING_TASK});
        request(`http://localhost:3001/task/${currentId}` , 'PUT' , data)
        .then((editedTask)=> {
            dispatch({type: actionTypes.EDIT_TASKS_SUCCESS , editedTask})
        })
        .catch(error => {
            dispatch({type: actionTypes.EDIT_TASKS_FAILURE , error: error.message})
        } )
    }
}