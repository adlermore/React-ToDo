// import { GETTING_TASKS, GET_TASKS_SUCCESS } from "./actionTypes";
import * as actionTypes from "./actionTypes";

const DedaultState = {
    tasks : [],
    loading : false,
    error : null, 
    addTaskSuccess : false,
    successMessage: null,
    editModalShow: false
}

export const mainReducer = (state = DedaultState, action) => {
    switch (action.type) {
        case actionTypes.LOADING: {
            return {
                ...state,
                loading : true
            }
        }
        case actionTypes.ERROR: {
            return {
                ...state,
                loading : false,
                error: action.error
            }
        }
        case actionTypes.GET_TASKS_SUCCESS: {
            return {
                ...state,
                loading : false,
                tasks: action.tasks,
            }
        }

        case actionTypes.ADDING_TASK: {
            return {
                ...state,
                loading : true,
                addTaskSuccess: false,
                successMessage: null,
                error: null,
            }
        }

        case actionTypes.ADD_TASK_SUCCESS: {
            return {
                ...state,
                loading : false,
                tasks: [...state.tasks , action.tasks],
                addTaskSuccess: true,
                successMessage: 'Task addes successfully'
            }
        }
        case actionTypes.EDIT_TASKS_SUCCESS: {

            const tasks = state.tasks;
            const taskIndex = tasks.findIndex((task) => task._id === action.editedTask._id);    
            // tasks[taskIndex] = action.editedTask;
            
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title: action.data.title,
                description: action.data.description,
                date: action.data.date
            };

            return {
                ...state,
                loading : false,
                tasks: tasks,
                taskIndex : taskIndex,
                editModalShow : false
            }
        }

        default: return state;
    }
}
