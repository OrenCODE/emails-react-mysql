import React, {Component} from 'react';
import axios from "axios";
import MailItem from "./MailItem";

class Sent extends Component {

    state = {
        sent: [],
        errors: null
    };

    componentDidMount() {
        axios.get(`http://localhost:4005/emails/sent`)
            .then(res => this.setState({sent: res.data}))
            .catch(err => this.setState({errors: err.response.data}))
    }

    onDelete = (id) => {
        const { sent } = this.state;
        const sentAfterDelete = sent.filter(mail => mail.id !== id);
        this.setState({
            sent: sentAfterDelete
        });
    };

    render() {
        const {sent} = this.state;
        return (
            <div className="container col-7">
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