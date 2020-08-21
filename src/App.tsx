import React, { useState } from "react";
import "./App.scss";
import deathTable from "./uk_life_table.json";
import Footer from "./Footer";
import Chart from "./Chart";

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
							<label>Gender</label>
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
					<div className="death-results">
						<p>Your odds of dying in the next 10 years:</p>
						<p className="death-percentage">
							<b>{segment.dying_10_year}</b>
						</p>
						<p>Your odds of dying in the next 5 years:</p>
						<p className="death-percentage">
							<b>{segment.dying_5_year}</b>
						</p>
						<p>Your odds of dying in the next 1 year:</p>
						<p className="death-percentage">
							<b>{segment.dying_1_year}</b>
						</p>
						<p>Average years left:</p>
						<p className="death-percentage">
							<b>{segment.life_expectancy} years left</b>
						</p>
						<Chart gender={gender.value} />
						<p className="data-source">
							Source:{" "}
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/datasets/nationallifetablesunitedkingdomreferencetables">
								ONS National life tables for the UK, 2016 - 2018
							</a>
						</p>
						<div className="go-back" onClick={toggleDeathLikelihood}>
							← back
						</div>
					</div>
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
