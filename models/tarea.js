const { v4: uuidv4 } = require('uuid');

class Tarea {
	//Esto no hace falta, las propiedades en JS se definen en el Constructor
	id = '';
	desc = '';
	completadoEn = null;

	constructor(desc) {
		this.id = uuidv4();
		this.desc = desc;
		this.completadoEn = null;
	}
}

module.exports = Tarea;
