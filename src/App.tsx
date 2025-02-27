import React, { useState } from "react";
import "./App.scss";
import deathTable from "./data/gb_life_table.json";
import Footer from "./Footer";
import Results from "./Results";

type AgeOptionType = {
	value: number;
	label: number;
};

type OptionType = {
	value: string;
	label: string;
};

function App() {
	const ageOptions: AgeOptionType[] = [];
	deathTable.forEach((segment) => {
		if (segment.gender === "male" && segment.age <= 90) {
			ageOptions.push({ value: segment.age, label: segment.age });
		}
	});
	const genderOptions: OptionType[] = [
		{ value: "female", label: "female" },
		{ value: "male", label: "male" },
	];

	const age = useFormInput("0");
	const gender = useFormInput("female");
	const [deathLikelihood, setDeathLikelihood] = useState(false);

	const toggleDeathLikelihood = () => {
		setDeathLikelihood(!deathLikelihood);
	};

	const segment = generateStats({ age: parseInt(age.value), gender: gender.value });

	return (
		<div className="front-page">
			<div className="container">
				<div className="intro">
					<span className="spooky-boy" role="img" aria-label="Spooky skull">
						💀
					</span>
					<p>it comes for us all</p>
					<p className="subtext">Check your odds</p>
				</div>

				{!deathLikelihood ? (
					<div className="death-form">
						<div>
							<label>Age</label>
							<select {...age}>
								{ageOptions.map((elem) => {
									return (
										<option key={elem.value} value={elem.value}>
											{elem.label}
										</option>
									);
								})}
							</select>
						</div>
						<div>
							<label>Sex</label>
							<select {...gender}>
								{genderOptions.map((elem) => {
									return (
										<option key={elem.value} value={elem.value}>
											{elem.label}
										</option>
									);
								})}
							</select>
						</div>

						<input
							className="submit-btn"
							type="submit"
							value="How long do I have, Doc?"
							onClick={toggleDeathLikelihood}
						/>
					</div>
				) : (
					<Results
						segment={segment}
						gender={gender}
						toggleDeathLikelihood={toggleDeathLikelihood}
					/>
				)}
			</div>
			<Footer />
		</div>
	);
}

function useFormInput(initialValue: string) {
	const [value, setValue] = useState(initialValue);
	const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const target = event.target as HTMLTextAreaElement;
		setValue(target.value);
	};
	return { value, onChange: handleChange };
}

const generateStats = (params: { age: number; gender: string }) => {
	const { age, gender } = params;

	const segment = deathTable.filter((segment) => {
		if (segment.age === age && segment.gender === gender) {
			return segment;
		}
		return null;
	});

	return segment[0];
};

export default App;
