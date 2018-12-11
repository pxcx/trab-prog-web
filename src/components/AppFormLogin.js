import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Form, Modal, Divider, Message } from 'semantic-ui-react'
// actions
import * as loginActions from '../store/actions/login.js';

class AppFormLogin extends Component {
    state = { usuario: '', senha: '', feedback: null }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { usuario, senha } = this.state
        if(usuario && senha){
            (async () => {
				const data = { email: usuario, senha: senha }
                await this.props.login(data)
                this.close()
            })();
        }
        else{
            const feedback = (<Message error header='Faltam dados' content='Todos os campos são obrigatórios.' />)
            this.setState({ feedback: feedback })
        }
    }

    close(){
        this.setState({usuario: '', senha: '', feedback: null})
        this.props.close()
    }

    render(){
        const { usuario, senha, feedback } = this.state

        return(
            <Modal open={this.props.open} onClose={this.props.close} centered={false} size="tiny">
                <Modal.Header><Icon name={'key'} /> Log-in</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        {feedback}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input fluid  placeholder='Usuário' name='usuario' value={usuario}  onChange={this.handleChange} />
                            <Form.Input fluid  placeholder='Senha' name='senha' type='password' value={senha}  onChange={this.handleChange} />
                            <Divider style={{marginTop: 30, marginBottom: 30}} />
                            <Form.Group inline>
                                <Form.Button color="blue"><Icon name={'lock open'} />Entrar</Form.Button>
                                <Form.Button onClick={this.close.bind(this)} color="red"><Icon name={'cancel'} />Cancelar</Form.Button>
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
		login: (data) => {
			dispatch(loginActions.login(data))
	  	}
	}
}

export default connect(null, mapDispatchToProps)(AppFormLogin);
