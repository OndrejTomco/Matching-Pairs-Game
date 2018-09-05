import React from 'react';
import Modal from 'react-modal';
import '../css/GameBoard.css';


const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',

    }
};

class HighScoreModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            HighScores: []
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {

    }


    componentWillReceiveProps(props) {
        if (props.showModal === true) {
            fetch('http://localhost:5000/highscores')
                .then(response => response.json())
                .then(data => this.setState({ HighScores: data, modalIsOpen: true }));

        } else {
            this.setState({ modalIsOpen: false });

        }
    }


    openModal() {

        this.setState({ modalIsOpen: true });

    }

    afterOpenModal() {


    }

    closeModal(props) {
        this.props.hideModal();
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
                    <div class="table-wrapper-scroll-y">
                        <table class="table highScoreTable">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Score</th>
                                    <th scope="col">Missed</th>
                                    <th scope="col">Difficulty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.HighScores.map((score, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{score.Name}</td>
                                            <td>{score.Score}</td>
                                            <td>{score.Missed}</td>
                                            <td>{score.Difficulty}</td>
                                        </tr>
                                    )

                                })}

                            </tbody>
                        </table>
                    </div>
                </Modal>
            </div>

        );
    }
}

export default HighScoreModal;