import React, {Component} from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import {formatDate} from "../utils/formatDate";

import MailItem from "./MailItem";

class Sent extends Component {

    state = {
        sent: [],
        startDate: null,
        searchStatus: true,
        errors: null
    };

    componentDidMount() {
        axios.get(`http://localhost:4005/emails/sent`)
            .then(res => this.setState({sent: res.data, searchStatus: true, startDate: null}))
            .catch(err => this.setState({errors: err.response.data}))
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.sentEmail){
            this.componentDidMount()
        }
    }

    onDelete = (id) => {
        const {sent} = this.state;
        const sentAfterDelete = sent.filter(mail => mail.id !== id);
        this.setState({
            sent: sentAfterDelete
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

    getSentEmail = () => {
        axios.get(`http://localhost:4005/emails/sent`)
            .then(res => this.setState({sent: res.data}))
            .catch(err => this.setState({errors: err.response.data}));
    };

    render() {
        const {sent, searchStatus, startDate} = this.state;
        return (
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
                <div className="card">
                    <ul className="list-group list-group-flush">
                        {sent.map((sentEmail) => (
                            <MailItem key={sentEmail.id} sentEmail={sentEmail} onDelete={this.onDelete}/>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sent;