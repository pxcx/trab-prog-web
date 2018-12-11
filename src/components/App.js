import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react'
// actions
import * as aulasActions from '../store/actions/aulas.js';
import * as salasActions from '../store/actions/salas.js';
import reducers from '../store/reducers/aulas.js';
// assets
import './css/App.css'
// custom components
import AppMenu from './AppMenu'
import AppGrid from './AppGrid'

class App extends Component {
	state = {
		adm: false,
		sala: undefined,
		datasource: [],
		msg: undefined
	}

	componentDidMount() {
		this.props.fetchSalas()
		this.props.fetchAulas()
	}

	onChange = sala => {
		if (sala === 'gerenciar') {
			this.setState({ adm: !this.state.adm })
		}
		else {
			this.setState({ sala: sala })
			this.props.fetchAulas(sala)
		}
	}
	render() {
		
		const { sala, adm } = this.state
		console.log('PROPS', this.props.salas)
	
		return (
			<div className="App">
				<Grid>
					<Grid.Column width={2}>
						<AppMenu datasource={this.props.salas} onChange={this.onChange} adm={adm} />
					</Grid.Column>

					<Grid.Column width={14}>
						<Header as='h1' style={{ marginTop: 5, paddingBottom: 10 }}>Quadro de Horários - {sala}</Header>
						<AppGrid datasource={this.props.aulas} sala={sala} update={this.loadContent} adm={adm} />
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
	  	}
	}
}

function mapStateToProps(state) {
	return reducers(state);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
