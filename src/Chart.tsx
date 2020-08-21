import React from "react";
import { Line } from "react-chartjs-2";
import deathTable from "./uk_life_table.json";

const labels = deathTable
	.filter((segment) => {
		if (segment.gender === "male") return segment;
	})
	.map((segment) => {
		return segment.age;
	});

const ten_year_rate = deathTable
	.filter((segment) => {
		if (segment.gender === "male" && segment.age < 90) return segment;
	})
	.map((segment) => {
		return (parseFloat(segment.dying_10_year) / 100).toFixed(5);
	});

const five_year_rate = deathTable
	.filter((segment) => {
		if (segment.gender === "male" && segment.age < 95) return segment;
	})
	.map((segment) => {
		return (parseFloat(segment.dying_5_year) / 100).toFixed(5);
	});

const one_year_rate = deathTable
	.filter((segment) => {
		if (segment.gender === "male" && segment.age < 99) return segment;
	})
	.map((segment) => {
		return (parseFloat(segment.dying_1_year) / 100).toFixed(5);
	});

const data = {
	labels: labels,
	options: {
		tooltips: {
			callbacks: {
				label: function (tooltipItem: any, data: any) {
					var label = data.datasets[tooltipItem.datasetIndex].label || "";

					if (label) {
						label += ": ";
					}
					label += tooltipItem.yLabel * 100 + "%";
					return label;
				},
			},
		},
	},
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
			<Line data={data} width={700} height={300} options={data.options} />
		</div>
	);
}

export default Chart;
