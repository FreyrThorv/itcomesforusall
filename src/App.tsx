import React from "react";
import "./App.css";

type OptionType = {
	value: string;
	label: string;
};

function App() {
	const ageOptions: OptionType[] = [
		{ value: "1", label: "1" },
		{ value: "2", label: "2" },
		{ value: "3", label: "3" },
		{ value: "4", label: "4" },
		{ value: "5", label: "5" },
		{ value: "6", label: "6" },
		{ value: "7", label: "7" },
		{ value: "8", label: "8" },
		{ value: "9", label: "9" },
		{ value: "10", label: "10" },
		{ value: "11", label: "11" },
		{ value: "12", label: "12" },
	]; // etc

	const genderOptions: OptionType[] = [
		{ value: "female", label: "female" },
		{ value: "male", label: "male" },
	];

	const [age, setAge] = React.useState("");
	const [gender, setGender] = React.useState("");

	const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const target = event.target as HTMLTextAreaElement;
		setAge(target.value);
	};

	const genderChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const target = event.target as HTMLTextAreaElement;
		setGender(target.value);
	};

	return (
		<div className="front-page">
			<div className="container">
				<span className="spooky-boy" role="img" aria-label="Spooky skull">
					💀
				</span>
				<p>select your age and gender</p>
				<label>Age:</label>
				<select value={age} onChange={handleChange}>
					{ageOptions.map((elem) => {
						return <option value={elem.value}>{elem.label}</option>;
					})}
				</select>{" "}
				<label>Gender:</label>
				<select value={gender} onChange={genderChange}>
					{genderOptions.map((elem) => {
						return <option value={elem.value}>{elem.label}</option>;
					})}
				</select>
			</div>
		</div>
	);
}

export default App;
