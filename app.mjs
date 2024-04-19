import 'colors';
import {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarListadoCheckList,
} from './helpers/inquirer.mjs';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import Tarea from './models/tarea.js';
import Tareas from './models/tareas.js';

console.clear();

const main = async () => {
	let opt = '';
	const tareas = new Tareas();

	const tareasDB = leerDB();

	if (tareasDB) {
		tareas.cargarTareasFromArray(tareasDB);
	}

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case '1':
				const desc = await leerInput('Description:');
				tareas.crearTarea(desc);
				break;

			case '2':
				tareas.listadoCompleto();
				break;

			case '3':
				tareas.listarPendientesCompletadas(true);
				break;

			case '4':
				tareas.listarPendientesCompletadas(false);
				break;

			case '5':
				const ids = await mostrarListadoCheckList(tareas.listadoArr);
				tareas.toggleCompletadas(ids);
				break;

			case '6':
				const id = await listadoTareasBorrar(tareas.listadoArr);
				if (id !== '0') {
					const ok = await confirmar('¿Está seguro?');
					if (ok) {
						tareas.borrarTarea(id);
						console.log('Tarea Borrada'.green);
					}
				}
				break;
		}

		guardarDB(tareas.listadoArr);

		await pausa();
	} while (opt != '0');
};

main();
