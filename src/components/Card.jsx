import "./Card.css";

function Card({ beca }) {
	const linkRegex = /(https?\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g;
	function replacer(matched) {
		let withProtocol = matched;

		if (!withProtocol.startsWith("http")) {
			withProtocol = "http://" + matched;
		}

		const newStr = `
        \n
          ${matched}`;

		return newStr;
	}

	return (
		<div className="card">
			<h2>{beca.Nombre}</h2>
			<p>{"Categoría: " + beca.Categoría}</p>
			<p>{"Duración: " + beca.Duración}</p>
			<p>{"Edad: " + beca.Edad_detalles}</p>
			<p>{"Presupuesto: " + beca.Presupuesto_detalles}</p>
			<p>
				{"Zona: " +
					(Array.isArray(beca.Zona) ? beca.Zona.join(", ") : beca.Zona)}
			</p>
			<p>{"Idioma: " + beca.Idioma}</p>
			<p>
				{"Estudios: " +
					(Array.isArray(beca.Estudios)
						? beca.Estudios.join(", ")
						: beca.Estudios)}
			</p>
			<div className="info">{beca.Info.replace(linkRegex, replacer)}</div>
		</div>
	);
}

export default Card;
