import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Divider, Message } from 'semantic-ui-react'
// actions
import * as salasActions from '../store/actions/salas.js';

class AppFormSala extends Component {
    state = { sala: undefined, feedback: null }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { sala } = this.state
        if(sala){
            (async () => {
				const data = { sala: sala }
                await this.props.addSala(data)
                this.close()
            })();
        }
        else{
            const feedback = (<Message error header='Faltam dados' content='Todos os campos são obrigatórios.' />)
            this.setState({ feedback: feedback })
        }
    }

    close(){
        this.setState({sala: undefined, feedback: null})
        this.props.close()
    }

    render(){
        const { feedback } = this.state

        return(
            <Modal open={this.props.open} onClose={this.props.close} centered={false} size="tiny">
                <Modal.Header>Cadastrar nova sala</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        {feedback}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input fluid label='Sala' placeholder='Nome da sala...' name='sala' onChange={this.handleChange} />
                            <Divider style={{marginTop: 30, marginBottom: 30}} />
                            <Form.Group inline>
                                <Form.Button>Cadastrar</Form.Button>
                                <Form.Button onClick={this.close.bind(this)} color="red">Cancelar</Form.Button>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
  
}

function mapDispatchToProps(dispatch){
	return {
		fetchSalas: () => {
			dispatch(salasActions.fetchSalas())
	  	},
		addSala: (sala) => {
			dispatch(salasActions.addSala(sala))
	  	}
	}
}

export default connect(null, mapDispatchToProps)(AppFormSala);
