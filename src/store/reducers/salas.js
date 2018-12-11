const initialState = []

export default function salasReducer(state = initialState, action = {}) {
	switch (action.type) {
	  case 'SALAS_FETCHED':
		return action.payload;
	  default:
		return state;
	}
  }