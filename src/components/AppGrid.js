import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Button  } from 'semantic-ui-react'
import _ from 'lodash'
// custom components
import AppFormAula from './AppFormAula'
import ConfirmDelete from './ConfirmDelete'
// actions
import * as aulasActions from '../store/actions/aulas.js';

const center = { textAlign: 'center'}

class AppGrid extends Component {
    state = { 
        formOpen: false,
        confirmDelete: false,
        add: {
            dia: undefined,
            inicio: undefined,
            sala: this.props.sala, 
        } ,
        delete: undefined
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            add: {
                ...this.state.add,
                sala: nextProps.sala
            }
        })
    }

    handleOpenForm = (info, hora, dia) => {
        this.setState({
            formOpen: true,
            add: {
                ...this.state.add,
                dia: dia,
                inicio: hora
            }
        })
    }

    handleClose = () => {
        this.setState({ formOpen: false })
        this.props.fetchAulas(this.props.sala)
    }

    handleDelete = (id) => { this.setState({ confirmDelete: true, delete: id }) }

    handleDeleteCancel = () => { this.setState({ confirmDelete: false, delete: undefined }) }

    delete = () =>  {
        if(this.state.delete){
            this.props.deleteAula(this.state.delete, this.props.sala)
        }
        this.handleDeleteCancel();
    }

    render() {
        let i, j = 0
		let gridBody = []
		let gridHeader = []

		if(this.props.sala){
			// header
			gridHeader.push(<Table.HeaderCell key={100} />)
            gridHeader.push(<Table.HeaderCell key={101} style={center}>SEGUNDA</Table.HeaderCell>)
            gridHeader.push(<Table.HeaderCell key={102} style={center}>TERÇA</Table.HeaderCell>)
            gridHeader.push(<Table.HeaderCell key={103} style={center}>QUARTA</Table.HeaderCell>)
            gridHeader.push(<Table.HeaderCell key={104} style={center}>QUINTA</Table.HeaderCell>)
			gridHeader.push(<Table.HeaderCell key={105} style={center}>SEXTA</Table.HeaderCell>)
			// body
			for(i = 7; i < 22; i++){
				if(i===13) continue;
				let gridColumn = []
				for(j = 0; j < 6; j++){
					if(j === 0){
						gridColumn.push(<Table.Cell key={i*1000+j} style={center}>{i}h-{i+2}h</Table.Cell>)
					}
					else{
						// eslint-disable-next-line
						const aulas = _.filter(this.props.datasource, (aula) => { return aula.dia === j })
						// eslint-disable-next-line
						const aula = _.find(aulas, function(aux) { return aux.inicio === i })
						if(aula) {
							const Content = (this.props.adm)? (
								<div>
									<ConfirmDelete show={this.state.confirmDelete} cancel={this.handleDeleteCancel} delete={this.delete} />
									<div style={{display: 'flex'}}>
										<div><Button size='mini' compact={true} icon onClick={(e) => this.handleDelete(aula.id)} primary><Icon name='dont'/></Button></div>
										<div className="class-header">{aula.aula} <br/><span className="class-details">{aula.professor}</span></div>
									</div>
								</div>
							) : (
								<div style={{display: 'flex'}}>
									<div className="class-header">{aula.aula} <br/><span className="class-details">{aula.professor}</span></div>
								</div>
							)

							gridColumn.push(
								<Table.Cell key={i*1000+j}>{Content}</Table.Cell>
							)
						}
						else{
							const dia = j
							const hora = i
							const Content = (this.props.adm) ? (
								<div>
									<Button size='mini' compact={true} icon onClick={(e) => this.handleOpenForm(e, hora, dia) } color="green"><Icon name='add'/></Button>
									<span className="class-avaliable" style={{color: "green"}}>Disponível<br/>&nbsp;</span>
								</div>
							) : (
								<span className="class-header" style={center}>----<br/>&nbsp;</span>
							)

							// eslint-disable-next-line
							gridColumn.push(<Table.Cell key={i*1000+j}>{Content}</Table.Cell>)
						}
					}
				}
				gridBody.push(<Table.Row key={i}>{gridColumn}</Table.Row>)
				i++
			}
		}
		else{
			
		}

		const {dia, inicio, sala} = this.state.add
		
        return (
            <div>
                <AppFormAula open={this.state.formOpen} close={this.handleClose} dia={dia} inicio={inicio} sala={sala} />
                <Table definition>
                    <Table.Header>
                    <Table.Row>
                        {gridHeader}
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {gridBody}
                    </Table.Body>
                </Table>
            </div>
            
        );
    }
}

function mapDispatchToProps(dispatch){
	return {
		fetchAulas: (aula = undefined) => {
			dispatch(aulasActions.fetchAulas(aula))
	  	},
		deleteAula: (aula, sala) => {
			dispatch(aulasActions.deleteAula(aula, sala))
	  	}
	}
}

export default connect(null, mapDispatchToProps)(AppGrid);
