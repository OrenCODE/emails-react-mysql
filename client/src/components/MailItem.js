import React, {Component} from 'react';
import axios from 'axios';

class MailItem extends Component {
    render() {
        const {inboxEmail, spamEmail, sentEmail} = this.props;

        if (inboxEmail) {
            return (
                <div className="list-group-item">
                    <div>{inboxEmail.sentFrom}</div>
                    <div>{inboxEmail.title}</div>
                    <div>{inboxEmail.message}</div>
                    <div>{inboxEmail.date}</div>
                    <button onClick={() => this.deleteEmail(inboxEmail.id)}>Del</button>
                </div>
            );
        }
        if (spamEmail) {
            return (
                <div className="list-group-item">
                    <div>{spamEmail.sentFrom}</div>
                    <div>{spamEmail.title}</div>
                    <div>{spamEmail.message}</div>
                    <div>{spamEmail.date}</div>
                    <button onClick={() => this.deleteEmail(spamEmail.id)}>Del</button>
                </div>
            );
        }
        if (sentEmail) {
            return (
                <div className="list-group-item">
                    <div>{sentEmail.sentFrom}</div>
                    <div>{sentEmail.title}</div>
                    <div>{sentEmail.message}</div>
                    <div>{sentEmail.date}</div>
                    <button onClick={() => this.deleteEmail(sentEmail.id)}>Del</button>
                </div>
            );
        }
    }

    deleteEmail = (id) => {
        const {onDelete} = this.props;

        axios.delete(`http://localhost:4005/emails/${id}`)
            .then(res => {
                if (res.status === 200) {
                    onDelete(id);
                } else {
                    console.error('not deleted')
                }
            })
            .catch(err => console.log(err));
    };
}

export default MailItem;