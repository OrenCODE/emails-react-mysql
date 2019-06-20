import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import MailItem from "./MailItem";
import {formatDate} from "../utils/formatDate";

class Inbox extends Component {

    state = {
        inbox: [],
        startDate: new Date(),
        errors: null
    };

    componentDidMount() {
        axios.get(`http://localhost:4005/emails/inbox`)
            .then(res => this.setState({inbox: res.data}))
            .catch(err => this.setState({errors: err.response.data}))
    }

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

    searchByDate = (date) => {
        const pickedDate = formatDate(date);
        axios.get(`http://localhost:4005/emails/date/${pickedDate}`)
            .then(res => this.setState({inbox: res.data}))
            .catch(err => console.log(err));
    };

    render() {
        const {inbox, startDate} = this.state;
        return (
            <div className="container col-7">
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
                <button onClick={() => this.searchByDate(startDate)}>Search</button>
                <div className="card">
                    <ul className="list-group list-group-flush">
                        {inbox.map((inboxEmail) => (
                            <MailItem key={inboxEmail.id} inboxEmail={inboxEmail} onDelete={this.onDelete}/>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Inbox;