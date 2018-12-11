import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Divider, Message } from 'semantic-ui-react'
// actions
import * as aulasActions from '../store/actions/aulas.js';

class AppFormAula extends Component {
    state = { aula: '', professor: '', feedback: null }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { aula, professor } = this.state
        if(aula && professor){
            (async () => {
				const data = { aula: aula, professor: professor, fim: 0, dia: this.props.dia, inicio: this.props.inicio, sala: this.props.sala }
                await this.props.addAula(data, this.props.sala)
                this.close()
            })();
        }
        else{
            const feedback = (<Message error header='Faltam dados' content='Todos os campos são obrigatórios.' />)
            this.setState({ feedback: feedback })
        }
    }

    close(){
        this.setState({aula: '', professor: '', feedback: null})
        this.props.close()
    }

    render(){
        const { aula, professor,feedback } = this.state

        return(
            <Modal open={this.props.open} onClose={this.props.close} centered={false} size="tiny">
                <Modal.Header>Cadastrar nova aula</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        {feedback}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input fluid label='Aula' placeholder='Aula' name='aula' value={aula}  onChange={this.handleChange} />
                            <Form.Input fluid label='Professor' placeholder='Professor' name='professor' value={professor}  onChange={this.handleChange} />
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
		fetchAulas: (sala = undefined) => {
			dispatch(aulasActions.fetchAulas(sala))
	  	},
		addAula: (aula, sala) => {
			dispatch(aulasActions.addAula(aula, sala))
	  	}
	}
}

export default connect(null, mapDispatchToProps)(AppFormAula);
