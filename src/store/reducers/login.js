import {  toast } from 'react-semantic-toasts';

const initialState = {
	login: false,
	user: {}
}

export default function loginReducer(state = initialState, action = {}) {
	switch (action.type) {
			case 'LOGIN_SUCESS':
			// notificacao
			toast({
				type: 'success',
				title: 'Bem vindo',
				description: 'O usuário foi autenticado com sucesso.',
				time: 3000
			});
			// setando o cookie
			localStorage.setItem('login', action.payload.login);
			localStorage.setItem('email', action.payload.user.email);
			localStorage.setItem('senha', action.payload.user.senha);
			// retornando o reducer
			return action.payload;
		case 'LOGIN_FAILED':
			// notificacao
			toast({
				type: 'error',
				title: 'Erro de autenticação',
				description: action.payload.message,
				time: 5000
			});
			// retornando o reducer
			return initialState;
		case 'LOGOUT':
			
			// setando o cookie
			localStorage.clear();
			// retornando o reducer
			return initialState;
		default:
			return state;
	}
}