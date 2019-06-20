import React, {Component} from 'react';
import Sidebar from "react-sidebar";
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import NewEmailModal from './components/Layout/NewEmailModal';
import EmailsNavbar from './components/Layout/EmailsNavbar';

import Inbox from './components/Inbox'
import Spam from './components/Spam'
import Sent from './components/Sent'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true,
            show: false,
            emailCounter: []
        }
    };

    componentDidMount = () => {
        axios.get('http://localhost:4005/emails/counter')
            .then(res => this.setState({emailCounter: res.data}))
            .catch(err => console.log(err))
    };

    onSetSidebarOpen = (open) => {
        this.componentDidMount();
        this.setState({sidebarOpen: open});
    };

    showModal = () => {
        this.setState({show: true})
    };

    closeModal = () => {
        this.setState({show: false})
    };

    sendNewEmail = (e) => {
        e.preventDefault();
        console.log('check')
    };

    render() {
        const {emailCounter, show} = this.state;
        return (
            <Router>
                <div className="App">
                    <Sidebar
                        rootClassName={"sidebar"}
                        sidebar={
                            <div className="container">
                                <h3>Sidebar content</h3>
                                {emailCounter.map((counter) => (
                                    <div key={counter.emailGroup}>
                                        <div>{counter.counter}</div>
                                    </div>
                                ))}
                                <div>
                                    <Link to="/" className="btn btn-sm btn-info mr-2">Inbox</Link>
                                </div>
                                <div>
                                    <Link to="/spam" className="btn btn-sm btn-info mr-2">Spam</Link>
                                </div>
                                <div>
                                    <Link to="/sent" className="btn btn-sm btn-info mr-2">Sent</Link>
                                </div>
                            </div>
                        }
                        open={this.state.sidebarOpen}
                        onSetOpen={this.onSetSidebarOpen}
                        styles={{sidebar: {background: "white"}}}>
                        <EmailsNavbar/>
                        <button onClick={() => this.onSetSidebarOpen(true)}>
                            Open sidebar
                        </button>
                        <button onClick={this.showModal}>Send new Email</button>
                        <Route exact path={"/"} component={Inbox}/>
                        <Route exact path={"/spam"} component={Spam}/>
                        <Route exact path={"/sent"} component={Sent}/>
                    </Sidebar>
                </div>
                <NewEmailModal modalStatus={show} closeModal={this.closeModal} sendNewEmail={this.sendNewEmail}/>
            </Router>
        );
    }
}

export default App;