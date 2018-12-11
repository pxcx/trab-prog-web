export function fetchAulas(sala = undefined) {
	return async(dispatch, getState) => {
	  try {
		const query_sala = (sala) ? '/' + sala : '';
		fetch('http://127.0.0.1:5000/aula' + query_sala)
		.then(res => res.json())
		.then(json => {
			console.log('FETCHED:', json);
			dispatch({ type: 'AULAS_FETCHED', payload: json.result });
		})
		.catch(err => {
			console.log('<<ERRO>>', err);
		});		
	  } catch (err) {
		console.log('<<ERRO>>', err);
	  }
	};
}

export function deleteAula(item, sala) {
	return async(dispatch, getState) => {
	  try {
		fetch('http://127.0.0.1:5000/aula/' + item, {method: 'DELETE'})
		.then(res => res.json())
		.then(json => {
			console.log('DELETED:', json)
			dispatch({ type: 'AULA_DELETED' });
			dispatch(fetchAulas(sala))
		})
		.catch(err => {
			console.log(err)
		})	
	  } catch (err) {
		console.log('<<ERRO>>', err);
	  }
	};
}

export function addAula(data, sala) {
	return async(dispatch, getState) => {
	  try {
		fetch('http://127.0.0.1:5000/aula', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(json => {
			console.log('ADDED:', json)
			dispatch({ type: 'AULA_ADDED', data: json.result });
			dispatch(fetchAulas(sala))
		})
		.catch(err => {
			console.log(err)
		})	
	  } catch (err) {
		console.log('<<ERRO>>', err);
	  }
	};
}