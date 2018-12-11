export function login(data) {
	return async (dispatch, getState) => {
		if (localStorage.getItem('login')){
			const payload = {
				login: localStorage.getItem('login'),
				user: {
					email: localStorage.getItem('email'),
					senha: localStorage.getItem('senha')
				}
			}
			dispatch({ type: 'LOGIN_SUCESS', payload: payload });
		}
		else{
			try {
				fetch('http://127.0.0.1:5000/login', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				})
					.then(res => res.json())
					.then(json => {
						if (json.result.login) {
							dispatch({ type: 'LOGIN_SUCESS', payload: json.result });
						}
						else {
							console.log(json.result)
							dispatch({ type: 'LOGIN_FAILED', payload: json.result });
						}
					})
					.catch(err => {
						console.log(err)
					})
			} catch (err) {
				console.log('<<ERRO>>', err);
			}
		}
	};
}

export function logout() {
	return { type: 'LOGOUT' }
}