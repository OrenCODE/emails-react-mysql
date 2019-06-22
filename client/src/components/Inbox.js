import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import {formatDate} from "../utils/formatDate";

import MailItem from "./MailItem";

class Inbox extends Component {

    state = {
        inbox: [],
        startDate: null,
        searchStatus: true,
        errors: null
    };

    componentDidMount = () => {
        axios.get(`http://localhost:4005/emails/inbox`)
            .then(res => this.setState({inbox: res.data, searchStatus: true, startDate: null}))
            .catch(err => this.setState({errors: err.response.data}))
    };

    onDelete = (id) => {
        const {inbox} = this.state;
        const inboxAfterDelete = inbox.filter(mail => mail.id !== id);
        this.setState({
            inbox: inboxAfterDelete
        });
    };

    handleChange = (date) => {
        this.setState({startDate: date})
    };

    //ADD GROUP TO SERVER QUERY AND AXIOS REQUEST//

    searchByDate = (date) => {
        const pickedDate = formatDate(date);
        axios.get(`http://localhost:4005/emails/date/${pickedDate}`)
            .then(res => this.setState({
                inbox: res.data,
                searchStatus: false
            }))
            .catch(err => {
                this.setState({errors: err.response.data});
                return alert(this.state.errors)
            });
    };

    render() {
        const {inbox, startDate, searchStatus} = this.state;
        return (
            <div>
                <div className="container col-7">
                    {searchStatus ? <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}/> :
                        <div>Results</div>
                    }
                    {searchStatus ?
                        <button onClick={() => this.searchByDate(startDate)}>Search</button> :
                        <button onClick={() => this.componentDidMount()}>Return</button>
                    }
                </div>
                <div className="container col-7">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            {inbox.map((inboxEmail) => (
                                <MailItem key={inboxEmail.id} inboxEmail={inboxEmail} onDelete={this.onDelete}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Inbox;