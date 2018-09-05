import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '25%',

    }
};

class WinningModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    componentWillReceiveProps(props) {
        props.showModal === true ? this.setState({ modalIsOpen: true }) : this.setState({ modalIsOpen: false });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    reloadPage() {
        window.location.reload();
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button type="button" onClick={this.closeModal} className="close float-right" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    
                    <h2 className="text-success">You won!</h2>
                    <h5>Final score: <span className="text-default"> {this.props.scores.Score} </span></h5>
                    <h5>Missed attempts: <span className="text-default"> {this.props.scores.Missed} </span></h5>
                    <button className="btn btn-primary mt-3" onClick={this.reloadPage}>Play again</button>

                </Modal>
            </div>
        );
    }
}

export default WinningModal;


