import React, {Component} from 'react';
import axios from 'axios';
import MailItem from "./MailItem";

class Inbox extends Component {

    state = {
        inbox: [],
        errors: null
    };

    componentDidMount() {
        axios.get(`http://localhost:4005/emails/inbox`)
            .then(res => this.setState({inbox: res.data}))
            .catch(err => this.setState({errors: err.response.data}))
    }

    onDelete = (id) => {
        const { inbox } = this.state;
        const inboxAfterDelete = inbox.filter(mail => mail.id !== id);
        this.setState({
            inbox: inboxAfterDelete
        });
    };

    render() {
        const {inbox} = this.state;
        return (
            <div className="container col-7">
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