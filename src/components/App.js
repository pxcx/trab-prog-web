import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react'
import { SemanticToastContainer } from 'react-semantic-toasts';
// actions
import * as aulasActions from '../store/actions/aulas.js';
import * as salasActions from '../store/actions/salas.js';
import * as loginActions from '../store/actions/login.js';
// assets
import './css/App.css'
// custom components
import AppMenu from './AppMenu'
import AppGrid from './AppGrid'
import AppFormLogin from './AppFormLogin'

class App extends Component {
	state = {
		sala: undefined,
		msg: undefined,
		loginForm: false,
	}

	componentDidMount() {
		this.props.fetchSalas()
		this.props.fetchAulas()
		setTimeout(() => {
			this.setState({sala: this.props.salas[0].sala})
		}, 1000);
	}

	onChange = sala => {
		switch(sala){
			case 'gerenciar':
				if(localStorage.getItem('login')){
					console.log(localStorage.getItem('login'))
					this.props.login()
				}
				else{
					this.setState({ loginForm: true })
				}
				break;
			case 'logout':
				this.props.logout()
				break;
			default:
				this.setState({ sala: sala })
				this.props.fetchAulas(sala)
				break;
		}
	}

	handleCloseLogin = () => { this.setState({ loginForm: false }) }


	render() {
		
		const { sala } = this.state
	
		return (
			<div className="App">
				<SemanticToastContainer position="top-right" />
				<AppFormLogin open={this.state.loginForm} close={this.handleCloseLogin} />
				<Grid>
					<Grid.Column width={2}>
						<AppMenu onChange={this.onChange} adm={this.props.auth.login} />
					</Grid.Column>

					<Grid.Column width={14}>
						<Header as='h1' style={{ marginTop: 5, paddingBottom: 10 }}>Quadro de Horários - {sala}</Header>
						<AppGrid sala={sala} update={this.loadContent} adm={this.props.auth.login} />
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return {
		fetchAulas: (sala) => {
			dispatch(aulasActions.fetchAulas(sala))
		},
		fetchSalas: (sala) => {
			dispatch(salasActions.fetchSalas(sala))
		},
		login: () => {
			dispatch(loginActions.login({email: localStorage.getItem('email'), senha: localStorage.getItem('senha') }))
		},
		logout: () => {
			dispatch(loginActions.logout())
		}
	}
}

function mapStateToProps(state) {
	return {
		aulas: state.aulas,
		salas: state.salas,
		auth: state.login
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
