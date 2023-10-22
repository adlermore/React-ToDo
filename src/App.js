import React, { PureComponent } from "react";
import './App.css';
import ToDo from './components/ToDo'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import SingleTask from "./components/Task/SingleTask";
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
import { connect } from "react-redux";

class App extends PureComponent {

    componentDidUpdate() {
        const { errorMessage, successMessage } = this.props;
        if (errorMessage) {
            toast.error(errorMessage);
        }
        if (successMessage) {
            toast.success(successMessage)
        }
    }

    render() {
        return (
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<ToDo />} />
                    <Route path="/task/:id" element={<SingleTask />} />

                </Routes>
                <Footer />
                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    limit={3}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        errorMessage: state.error,
        successMessage: state.successMessage
    }
}

export default connect(mapStateToProps, null)(App);
