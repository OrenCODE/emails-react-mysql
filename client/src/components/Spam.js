import React, {Component} from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import {formatDate} from "../utils/formatDate";

import MailItem from './MailItem';

class Spam extends Component {

    state = {
        spam: [],
        startDate: null,
        searchStatus: true,
        errors: null
    };

    componentDidMount() {
        axios.get(`http://localhost:4005/emails/spam`)
            .then(res => this.setState({spam: res.data, searchStatus: true, startDate: null}))
            .catch(err => this.setState({errors: err.response.data}))
    }

    onDelete = (id) => {
        const {spam} = this.state;
        const spamAfterDelete = spam.filter(mail => mail.id !== id);
        this.setState({
            spam: spamAfterDelete
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
        const {spam, searchStatus, startDate} = this.state;
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
                        {spam.map((spamEmail) => (
                            <MailItem key={spamEmail.id} spamEmail={spamEmail} onDelete={this.onDelete}/>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Spam;