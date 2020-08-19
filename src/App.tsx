import React from "react";
import "./App.scss";

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
	const [deathLikelihood, setDeathLikelihood] = React.useState(false);

	const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const target = event.target as HTMLTextAreaElement;
		setAge(target.value);
	};

	const genderChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const target = event.target as HTMLTextAreaElement;
		setGender(target.value);
	};

	const displayDeathLikelihood = () => {
		setDeathLikelihood(true);
	};

	const backToStart = () => {
		setDeathLikelihood(false);
	};

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
							<select value={age} onChange={handleChange}>
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
							<select value={gender} onChange={genderChange}>
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
							onClick={displayDeathLikelihood}
						/>
					</div>
				) : (
					<div className="death-results">
						<p>Your odds of dying in the next 10 years:</p>
						<p className="death-percentage">
							<b>5%</b>
						</p>
						<a href="/" onClick={backToStart}>
							← back
						</a>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
