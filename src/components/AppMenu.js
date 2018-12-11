import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Menu, Popup, Button } from 'semantic-ui-react'
// custom components
import ConfirmDelete from './ConfirmDelete'
import AppFormSala from './AppFormSala'
// actions
import * as salasActions from '../store/actions/salas.js';

class AppMenu extends Component {
	state = {
		formOpen: false,
		confirmDelete: false,
		delete: undefined,
		activeItem: 1
	}

	handleCloseForm = () => {
		this.setState({ formOpen: false })
		
	}
	
	handleOpenForm = () => { this.setState({ formOpen: true }) }

	handleDelete = (id) => { this.setState({ confirmDelete: true, delete: id }) }

    handleDeleteCancel = () => { this.setState({ confirmDelete: false, delete: undefined }) }

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name })
		this.props.onChange(name)
	}
	
	delete(){
		if(this.state.delete){
            this.props.deleteSala(this.state.delete)
        }
		this.handleDeleteCancel()
	}

	render() {
		const { activeItem } = this.state

		const menuList = this.props.datasource.map((sala) => (
				(this.props.adm) ? (
					<Popup key={sala.id} hoverable={true} trigger={
						<Menu.Item key={sala.id} name={sala.sala} active={activeItem === sala.sala} onClick={this.handleItemClick}>
							<Icon name={'building outline'} /> {sala.sala}
						</Menu.Item>
					}>
						<Button onClick={() => this.handleDelete(sala.id)} color='red'><Icon name={'delete'} /> Excluir Sala</Button>
					</Popup>
				) : (
					<Menu.Item key={sala.id} name={sala.sala} active={activeItem === sala.sala} onClick={this.handleItemClick}>
						<Icon name={'building outline'} /> {sala.sala}
					</Menu.Item>
				)
		))
		
		return (
			<div>
				<ConfirmDelete show={this.state.confirmDelete} cancel={this.handleDeleteCancel} delete={this.delete.bind(this)} />
				<AppFormSala open={this.state.formOpen} close={this.handleCloseForm} />
				<Menu icon='labeled' vertical>
					{menuList}
					{ (this.props.adm) ? (
						<Menu.Item key={999} name={'addSala'} active={activeItem === 'addSala'} onClick={this.handleOpenForm}>
							<Icon name={'add'} /> Nova Sala
						</Menu.Item>
					) : null }
 				</Menu>
				<Menu icon='labeled' vertical>
					<Menu.Item key={101} name='gerenciar' active={this.props.adm} onClick={this.handleItemClick}>
						<Icon name={'settings'} /> Configurações

					</Menu.Item>
				</Menu>
			</div>

		);
	}
}

function mapDispatchToProps(dispatch){
	return {
		fetchSalas: (sala) => {
			dispatch(salasActions.fetchSalas(sala))
	  	},
		deleteSala: (sala) => {
			dispatch(salasActions.deleteSala(sala))
	  	}
	}
}

export default connect(null, mapDispatchToProps)(AppMenu);
