const initialState = []

export default function aulasReducer(state = initialState, action = {}) {
	switch (action.type) {
	  case 'AULAS_FETCHED':
		return action.payload;
	  default:
		return state;
	}
}