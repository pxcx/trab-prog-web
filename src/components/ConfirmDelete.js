import React, { Component } from 'react';
import { Confirm } from 'semantic-ui-react'


class ConfirmDelete extends Component {
    render() {
		return (
			<Confirm open={this.props.show} onCancel={this.props.cancel} onConfirm={this.props.delete} size='mini'
				cancelButton='Cancelar'
				confirmButton="CONFIRMAR"
				header='Confirmar Exclusão'
				content='Tem certeza que deseja excluir? aqui não tem ctrl+z!'
			/>)
    }
}

export default ConfirmDelete;
