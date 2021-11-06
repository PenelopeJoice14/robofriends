import { CHANGE_SEARCHFIELD }	from './constants.js';

export const setSearfield = (text) => ({
	type: CHANGE_SEARCHFIELD,
	payload: text
})

