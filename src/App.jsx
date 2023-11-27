import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import data from "./data/data.json";

function App() {
	const becas = data.becas;
	const [becasFinal, setBecasFinal] = useState(new Set());
	// Añadir todos los datos de los filtros
	let nameSearch = "";
	const categorias = new Map();
	const edades = new Map();
	const nivelesEducativos = new Map();
	becas.forEach((beca) => {
		addItems(beca.categoria, categorias);
		addItems(beca.edad, edades);
		addItems(beca.nivelEducativo, nivelesEducativos);
	});
	//Poner nombre a los filtros
	const filtros = new Map();
	filtros.set("categoria", categorias);
	filtros.set("edad", edades);
	filtros.set("nivelEducativo", nivelesEducativos);

	function addItems(currentValue, map) {
		if (Array.isArray(currentValue)) {
			for (let i of currentValue) {
				map[i] = false;
			}
		} else {
			map[currentValue] = false;
		}
	}

	function isIn(currentValue, filterMap) {
		if (Array.isArray(currentValue)) {
			for (let i of currentValue) {
				if (filterMap[i]) return true;
			}
		} else {
			if (filterMap[currentValue]) return true;
		}
		return false;
	}

	function filtrar() {
		let currentBecas = new Set();
		let filterFlag = false;
		for (let [filterName, filterSet] of filtros) {
			becas
				.filter((i) => isIn(i[filterName], filterSet))
				.forEach((item) => currentBecas.add(item));
			if (filterSet.size > 0) filterFlag = true;
		}
		if (!filterFlag) {
			currentBecas = new Set(becas);
		}
		if (nameSearch.length > 0) {
			currentBecas = new Set([...currentBecas].filter((beca) =>
				beca.name.toLowerCase().includes(nameSearch))
			);
		}
		setBecasFinal(currentBecas);
	}

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => filtrar()}>Resultados</button>
				<p>{becasFinal.size}</p>
			</div>
			<p className="read-thttps://stackoverflow.com/questions/74584926/filtering-with-checkboxes-in-reacthe-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
