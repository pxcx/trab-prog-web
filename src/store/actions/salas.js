export function fetchSalas() {
	return async(dispatch, getState) => {
	  try {
		fetch('http://127.0.0.1:5000/sala')
		.then(res => res.json())
		.then(json => {
			console.log('FETCHED:', json);
			dispatch({ type: 'SALAS_FETCHED', payload: json.result });
		})
		.catch(err => {
			console.log('<<ERRO>>', err);
		});		
	  } catch (err) {
		console.log('<<ERRO>>', err);
	  }
	};
}

export function deleteSala(item) {
	return async(dispatch, getState) => {
	  try {
		fetch('http://127.0.0.1:5000/sala/' + item, {method: 'DELETE'})
		.then(res => res.json())
		.then(json => {
			console.log('DELETED:', json)
			dispatch({ type: 'SALA_DELETED' });
			dispatch(fetchSalas())
		})
		.catch(err => {
			console.log(err)
		})
	  } catch (err) {
		console.log('<<ERRO>>', err);
	  }
	};
}

export function addSala(data) {
	return async(dispatch, getState) => {
	  try {
		fetch('http://127.0.0.1:5000/sala', {
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
			dispatch({ type: 'SALA_ADDED', data: json.result });
			dispatch(fetchSalas())
		})
		.catch(err => {
			console.log(err)
		})	
	  } catch (err) {
		console.log('<<ERRO>>', err);
	  }
	};
}