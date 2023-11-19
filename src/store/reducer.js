// import { GETTING_TASKS, GET_TASKS_SUCCESS } from "./actionTypes";
import * as actionTypes from "./actionTypes";

const DedaultState = {
    tasks: [],
    loading: false,
    error: null,
    addTaskSuccess: false,
    editTaskSuccess: false,
    successMessage: null,
    removeTasksSuccess: false,
    currJwt : null
}

export const mainReducer = (state = DedaultState, action) => {
    switch (action.type) {
        case actionTypes.LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case actionTypes.GET_TASKS_SUCCESS: {
            return {
                ...state,
                loading: false,
                tasks: action.tasks,
            }
        }

        case actionTypes.ADDING_TASK: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                successMessage: null,
                error: null,
            }
        }

        case actionTypes.ADD_TASK_SUCCESS: {
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.tasks],
                addTaskSuccess: true,
                successMessage: 'Task adding successfully'
            }
        }

        case actionTypes.REMOVING_TASK: {
            return {
                ...state,
                loading: true,
                successMessage: null,
                error: null,
            }
        }

        case actionTypes.REMOVE_TASK_SUCCESS: {

            const customTasks = [...state.tasks];
            const updatedTask = customTasks.filter((Task) => Task._id !== action.taskId)

            return {
                ...state,
                loading: false,
                tasks: updatedTask,
                successMessage: 'Task removing is successfully'
            }
        }

        case actionTypes.REMOVING_TASKS: {
            return {
                ...state,
                loading: true,
                removeTasksSuccess: false,
                successMessage: null,
                error: null,
            }
        }

        case actionTypes.REMOVE_TASKS_SUCCESS: {
            let tasks = [...state.tasks];
            const checkedTasks = action.checkedTasks;
            
            checkedTasks.forEach(taskId => {
                tasks = tasks.filter(task => task._id !== taskId)
            });

            checkedTasks.clear();

            return {
                ...state,
                loading: false,
                tasks: tasks,
                removeTasksSuccess: true,
                successMessage: 'Selected Tasks removing are successfully'
            }
        }

        case actionTypes.EDITING_TASK: {
            return {
                ...state,
                loading: true,
                editTaskSuccess: false,
                successMessage: null,
                error: null,
            }
        }

        case actionTypes.EDIT_TASKS_SUCCESS: {
            const tasks = state.tasks;
            const taskIndex = tasks.findIndex((task) => task._id === action.editedTask._id);

            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title: action.data.title,
                description: action.data.description,
                date: action.data.date
            };

            return {
                ...state,
                loading: false,
                tasks: tasks,
                taskIndex: taskIndex,
                editTaskSuccess: true,
                successMessage: 'Task Editing is successfully'
            }
        }



        case actionTypes.CHANGEING_TASK_STATUS: {
            return {
                ...state,
                loading: true,
                editTaskSuccess: false,
                successMessage: null,
                error: null,
            }
        }


        case actionTypes.CHANGE_TASK_STATUS_SUCCESS: {
        
            const tasks = state.tasks;
            const taskIndex = tasks.findIndex((task) => task._id === action.editedTask._id);

            tasks[taskIndex] = {
                ...tasks[taskIndex],
                status : action.status
            };

            let message;
            if(action.editedTask.status==='done'){
                message = 'Congtatulations , you have complated task 🎉!!'
            }else{
                message = 'The task is active now! 😒'
            }
            return {
                ...state,
                loading: false,
                tasks: tasks,
                taskIndex: taskIndex,
                editTaskSuccess: true,
                successMessage: message
            }
        }

        case actionTypes.REGISTRATION_LOAD: {
            return {
                ...state,
                successMessage: null,
                error: null,
            }
        }

        case actionTypes.REGISTRATION_SUCCESS: {
            let message;
            if(action.dataJwt){
                message = 'log this data 🎉!!'
                localStorage.setItem("curr-jwt", JSON.stringify(action.dataJwt._id));
            }else{
                message = 'data is null! 😒'
            }

            return {
                ...state,
                successMessage: message,
                currJwt: action.dataJwt
            }
        }

        case actionTypes.LOGIN_LOAD: {
            return {
                ...state,
                successMessage: null,
                error: null,
            }
        }

        case actionTypes.LOGIN_SUCCESS: {
            let message;
            if(action.datalogin){
                message = 'log this data 🎉!!'
                // localStorage.setItem("curr-jwt", JSON.stringify(action.dataJwt._id));
            }else{
                message = 'data is null! 😒'
            }

            return {
                ...state,
                successMessage: message,
                currJwt: action.dataJwt
            }
        }

        default: return state;
    }
}
