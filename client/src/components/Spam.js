import React, {Component} from 'react';
import axios from "axios";
import MailItem from './MailItem';

class Spam extends Component {

    state = {
        spam: [],
        errors: null
    };

    componentDidMount() {
        axios.get(`http://localhost:4005/emails/spam`)
            .then(res => this.setState({spam: res.data}))
            .catch(err => this.setState({errors: err.response.data}))
    }

    onDelete = (id) => {
        const { spam } = this.state;
        const spamAfterDelete = spam.filter(mail => mail.id !== id);
        this.setState({
            spam: spamAfterDelete
        });
    };

    render() {
        const {spam} = this.state;
        return (
            <div className="container col-7">
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