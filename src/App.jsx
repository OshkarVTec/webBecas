import { useState, useEffect } from "react";
import "./App.css";
import data from "./data/data.json";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";

function App() {
	const becas = data.becas;
	const [becasFinal, setBecasFinal] = useState(becas);
	// Añadir todos los datos de los filtros

	const categorias = new Map();
	const edades = new Map();
	const nivelesEducativos = new Map();
	const presupuestos = new Map();
	const idiomas = new Map();
	const duraciones = new Map();
	const zonas = new Map();
	becas.forEach((beca) => {
		addItems(beca.Categoría, categorias);
		addItems(beca.Edad, edades);
		addItems(beca.Estudios, nivelesEducativos);
		addItems(beca.Presupuesto, presupuestos);
		addItems(beca.Idioma, idiomas);
		addItems(beca.Duración, duraciones);
		addItems(beca.Zona, zonas);

	});
	const [nameSearch, setNameSearch] = useState("");
	//Poner nombre a los filtros
	const filtrosTemp = new Map();
	filtrosTemp.set("Categoría", categorias);
	filtrosTemp.set("Edad", edades);
	filtrosTemp.set("Estudios", nivelesEducativos);
	filtrosTemp.set("Presupuesto", presupuestos);
	filtrosTemp.set("Idioma", idiomas);
	filtrosTemp.set("Duración", duraciones);
	filtrosTemp.set("Zona", zonas);
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
			for (let [_key, value] of filterMap) {
				if (value) secondFlag = true;
			}
			if (secondFlag) {
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
					beca.Nombre.toLowerCase().includes(nameSearch)
				)
			);
		}
		setBecasFinal(Array.from(currentBecas));
	}

	return (
		<>
			<Header />
			<div className="mainContainer">
				<h1>Buscador de becas</h1>
				<div className="dataContainer">
					<div className="filtrosContainer">
						<form onSubmit={(e) => e.preventDefault()}>
							<h2 className="title">Búsqueda por nombre</h2>
							<input
								value={nameSearch}
								type="text"
								placeholder="Buscar"
								onChange={(e) => {
									setNameSearch(e.target.value.toLowerCase());
								}}
							></input>
							{/*Filtros*/}
							<h2 className="title">Filtros</h2>
							{Array.from(filtros.keys()).map((nombreFiltro) => (
								<fieldset className="checkboxgroup" key={nombreFiltro}>
									<legend key={"p"+nombreFiltro}>{nombreFiltro}</legend>
									<div key={nombreFiltro}>
										{Array.from(filtros.get(nombreFiltro).keys()).map((key) => (
											<label key={key} className="checkboxContainer">
												<input
													className="checkbox"
													key={key}
													id={key}
													type="checkbox"
													name={key}
													value={filtros.get(nombreFiltro).get(key)}
													onChange={(e) => {
														filtros
															.get(nombreFiltro)
															.set(key, e.target.checked);
														setFiltros(new Map(filtros));
													}}
												/>
												{key}
												<span className="checkmark"></span>
											</label>
										))}
									</div>
								</fieldset>
							))}
						</form>
					</div>
					<div className="cardContainer">
						{becasFinal.map((beca)=> <Card key={beca.Nombre} beca={beca}/>)}
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
