// import { GETTING_TASKS, GET_TASKS_SUCCESS } from "./actionTypes";
import * as actionTypes from "./actionTypes";

const DedaultState = {
    tasks : [],
    loading : false,
    error : null, 
}

export const mainReducer = (state = DedaultState, action) => {
    switch (action.type) {
        case actionTypes.GETTING_TASKS: {
            return {
                ...state,
                loading : true
            }
        }
        case actionTypes.GET_TASKS_SUCCESS: {
            return {
                ...state,
                loading : false,
                tasks: action.tasks
            }
        }
        case actionTypes.GETTING_TASKS_FAILURE: {
            return {
                ...state,
                loading : false,
                error: action.error
            }
        }

        case actionTypes.EDITING_TASK: {
            return {
                ...state,
                loading : true
            }
        }
        case actionTypes.EDIT_TASKS_SUCCESS: {

            const tasks = [state.tasks];
            const taskIndex = tasks.findIndex((task) => task._id === action.editedTask._id);    
            tasks[taskIndex] = action.editedTask;

            return {
                ...state,
                loading : false,
                tasks: tasks
            }
        }
        
        case actionTypes.EDIT_TASKS_FAILURE: {
            return {
                ...state,
                loading : false,
                error: action.error
            }
        }

        default: return state;
    }
}
