import React, { FC } from "react";
import Chart from "./Chart";

type SegmentProps = {
	dying_10_year: string;
	dying_5_year: string;
	dying_1_year: string;
	life_expectancy: number;
};

type ResultProps = {
	segment: SegmentProps;
	gender: {
		value: string;
	};
	toggleDeathLikelihood: Function;
};

const Results: FC<ResultProps> = ({ segment, gender, toggleDeathLikelihood }) => {
	return (
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
			<div
				className="go-back"
				onClick={() => {
					toggleDeathLikelihood();
				}}>
				← back
			</div>
		</div>
	);
};

export default Results;
