import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import data from "./data/data.json";

function App() {
	const becas = data.becas;
	const [becasFinal, setBecasFinal] = useState(new Set());
	// Añadir todos los datos de los filtros

	const categorias = new Map();
	const edades = new Map();
	const nivelesEducativos = new Map();
	becas.forEach((beca) => {
		addItems(beca.categoria, categorias);
		addItems(beca.edad, edades);
		addItems(beca.nivelEducativo, nivelesEducativos);
	});
	const [nameSearch, setNameSearch] = useState("");
	//Poner nombre a los filtros
	const filtrosTemp = new Map();
	filtrosTemp.set("categoria", categorias);
	filtrosTemp.set("edad", edades);
	filtrosTemp.set("nivelEducativo", nivelesEducativos);
	const [filtros, setFiltros] = useState(filtrosTemp);

	useEffect(() => filtrar(), [filtros, nameSearch]);

	function addItems(currentValue, map) {
		if (Array.isArray(currentValue)) {
			for (let i of currentValue) {
				map.set(i, false);
			}
		} else {
			map.set(currentValue, false);
		}
	}

	function isIn(currentValue, filterMap) {
		if (Array.isArray(currentValue)) {
			for (let i of currentValue) {
				if (filterMap.get(i)) return true;
			}
		} else {
			if (filterMap.get(currentValue)) return true;
		}
		return false;
	}
	function filtrar() {
		let tempStorage = becas;
		let currentBecas = new Set();
		let filterFlag = false;
		let secondFlag = false;
		for (let [filterName, filterMap] of filtros) {
			currentBecas = new Set();
			secondFlag = false;
			for(let [_key, value] of filterMap ){
				if(value) secondFlag = true;
			}
			if(secondFlag){
				tempStorage
				.filter((i) => isIn(i[filterName], filterMap))
				.forEach((item) => {
					currentBecas.add(item);
					if (filterMap.size > 0) filterFlag = true;
				});
			tempStorage = Array.from(currentBecas);
			}
		}
		currentBecas = new Set(tempStorage);
		if (!filterFlag) {
			currentBecas = new Set(becas);
		}
		if (nameSearch.length > 0) {
			currentBecas = new Set(
				[...currentBecas].filter((beca) =>
					beca.name.toLowerCase().includes(nameSearch)
				)
			);
		}
		setBecasFinal(currentBecas);
	}

	return (
		<>
			<div>
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						value={nameSearch}
						type="text"
						placeholder="Buscar"
						onChange={(e) => {
							setNameSearch(e.target.value.toLowerCase());
						}}
					></input>
					{/*Filtros*/}
					{Array.from(filtros.keys()).map((nombreFiltro) => (
						<div key={nombreFiltro}>
							{Array.from(filtros.get(nombreFiltro).keys()).map((key) => (
								<label key={key}>
									<input
										key={key}
										id={key}
										type="checkbox"
										name={key}
										value={filtros.get(nombreFiltro).get(key)}
										onChange={(e) => {
											filtros.get(nombreFiltro).set(key, e.target.checked);
											setFiltros(new Map(filtros));
										}}
									/>
									{key}
								</label>
							))}
						</div>
					))}
				</form>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<p>{becasFinal.size}</p>
			</div>
			<p className="read-thttps://stackoverflow.com/questions/74584926/filtering-with-checkboxes-in-reacthe-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
