import React, {Component} from 'react';
import {Button, Form, FormControl ,Modal} from 'react-bootstrap';

class NewEmailModal extends Component {
    render() {

        const {modalStatus, closeModal, sendNewEmail} = this.props;
        return (
            <Modal show={modalStatus} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>send New Email</Modal.Title>
                </Modal.Header>
                <Form onSubmit={sendNewEmail}>
                    <Modal.Body>
                        <FormControl name={"title"} type={"text"} placeholder={"Title"}/>
                        <FormControl name={"message"} type={"text"} placeholder={"Message"}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type={"submit"} variant="primary" onClick={closeModal}>
                            Send
                        </Button>
                        <Button variant="primary" onClick={closeModal}>
                            Return
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )

    }
}

export default NewEmailModal;