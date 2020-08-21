import React from "react";
import { Line } from "react-chartjs-2";
import { ChartTooltipItem, ChartData } from "chart.js";
import deathTable from "./uk_life_table.json";

function getYearlyRiskData(period: number) {
	const periodKey = "dying_" + period + "_year";
	type periodKeys = {
		dying_1_year: string;
		dying_5_year: string;
		dying_10_year: string;
	};
	const lastAgeWithData = 100 - period;

	const data = deathTable
		.filter((segment) => {
			if (segment.gender === "male" && segment.age < lastAgeWithData) return segment;
			return null;
		})
		.map((segment) => {
			let percentage = parseFloat(segment[periodKey as keyof periodKeys]) / 100;
			return percentage;
		});

	return data;
}

const labels = deathTable
	.filter((segment) => {
		if (segment.gender === "male") return segment;
	})
	.map((segment) => {
		return segment.age;
	});

const ten_year_rate: number[] = getYearlyRiskData(10);
const five_year_rate: number[] = getYearlyRiskData(5);
const one_year_rate: number[] = getYearlyRiskData(1);

const options = {
	tooltips: {
		callbacks: {
			label: function (tooltipItem: ChartTooltipItem, data: ChartData) {
				let label;
				if (tooltipItem && tooltipItem.datasetIndex !== undefined && data.datasets !== undefined) {
					label = data.datasets[tooltipItem.datasetIndex].label || "";
				}
				if (label) {
					label += ": ";
				}
				if (tooltipItem && tooltipItem.yLabel && typeof tooltipItem.yLabel === "number") {
					label += (tooltipItem.yLabel * 100).toString() + "%";
				}
				return label;
			},
		},
	},
};

const data: ChartData = {
	labels: labels,
	datasets: [
		{
			label: "10 year death risk",
			backgroundColor: "rgba(255,99,132,0.2)",
			borderColor: "rgba(255,99,132,1)",
			borderWidth: 1,
			hoverBackgroundColor: "rgba(255,99,132,0.4)",
			hoverBorderColor: "rgba(255,99,132,1)",
			data: ten_year_rate,
		},
		{
			label: "5 year death risk",
			backgroundColor: "rgba(9, 118, 242,0.2)",
			borderColor: "rgba(9, 118, 242,1)",
			borderWidth: 1,
			hoverBackgroundColor: "rgba(9, 118, 242,0.4)",
			hoverBorderColor: "rgba(9, 118, 242,1)",
			data: five_year_rate,
		},
		{
			label: "1 year death risk",
			backgroundColor: "rgba(45, 137, 0,0.2)",
			borderColor: "rgba(45, 137, 0,1)",
			borderWidth: 1,
			hoverBackgroundColor: "rgba(45, 137, 0,0.4)",
			hoverBorderColor: "rgba(45, 137, 0,1)",
			data: one_year_rate,
		},
	],
};

function Chart() {
	return (
		<div className="chart-container">
			<h3>UK death tables</h3>
			<Line data={data} width={700} height={300} options={options} />
		</div>
	);
}

export default Chart;
