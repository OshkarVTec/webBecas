import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import data from "./data/data.json";

function App() {
	const becas = data.becas;
	const [becasFinal, setBecasFinal] = useState(new Set());
	// Añadir todos los datos de los filtros
	const categorias = new Set();
	const edades = new Set();
  const nivelesEducativos = new Set();
  becas.forEach((beca) => {
		addItems(beca.categoria, categorias);
		addItems(beca.edad, edades);
    addItems(beca.nivelEducativo, nivelesEducativos);
	});
  //Filtros activos
	const filtroCategoria = new Set();
	const filtroEdad = new Set();
  const filtroNivelEducativo = new Set();
	const filtros = new Map();
	filtros.set("categoria", filtroCategoria);
	filtros.set("edad", filtroEdad);
  filtros.set("nivelEducativo", filtroNivelEducativo);
	const [count, setCount] = useState(0);

	function addItems(currentValue, set) {
		if (Array.isArray(currentValue)) {
			for (let i of currentValue) {
				set.add(i);
			}
		} else {
			set.add(currentValue);
		}
	}

	function isIn(currentValue, filterSet) {
		if (Array.isArray(currentValue)) {
			for (let i of currentValue) {
				if (filterSet.has[i]) return true;
			}
		} else {
			if (filterSet.has(currentValue)) return true;
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
      if(filterSet.size > 0) filterFlag = true;
		}
		if (filterFlag) setBecasFinal(currentBecas);
    else setBecasFinal(new Set(becas));
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
				<button onClick={() => filtrar()}>count is {count}</button>
				<p>{becasFinal.size}</p>
			</div>
			<p className="read-thttps://stackoverflow.com/questions/74584926/filtering-with-checkboxes-in-reacthe-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
