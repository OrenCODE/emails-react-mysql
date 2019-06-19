import React, {Component} from 'react';
import Sidebar from "react-sidebar";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Inbox from './components/Inbox'
import Spam from './components/Spam'
import Sent from './components/Sent'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true
        };
    }

    onSetSidebarOpen = (open) => {
        this.setState({sidebarOpen: open});
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <Sidebar
                        rootClassName={"sidebar"}
                        sidebar={
                            <div className="container">
                                <h3>Sidebar content</h3>
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
                        <button onClick={() => this.onSetSidebarOpen(true)}>
                            Open sidebar
                        </button>
                        <Route exact path={"/"} component={Inbox}/>
                        <Route exact path={"/spam"} component={Spam}/>
                        <Route exact path={"/sent"} component={Sent}/>
                    </Sidebar>
                </div>
            </Router>
        );
    }
}

export default App;