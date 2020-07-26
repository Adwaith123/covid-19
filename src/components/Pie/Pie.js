import React from 'react';

import Chart from 'chart.js';

class Pie extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		var ctx = document.getElementById('pieChart');
		var myPieChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Confirmed', 'Active', 'Recovered', 'Deaths'],
				datasets: [
					{
						data: [
							this.props.total,
							this.props.active,
							this.props.discharged,
							this.props.deaths,
						],
						backgroundColor: [
							'#fe346e',
							'mediumpurple',
							'#1eb2a6',
							'#323232',
						],
						// hoverBackgroundColor: ['#323232', '#1eb2a6', '#fe346e'],
					},
				],
			},
			options: {
				legend: {
					align: 'center',
				},
				maintainAspectRatio: false,
			},
		});
	}

	render() {
		return (
			<div className='pie-chart-container'>
				<canvas id='pieChart'></canvas>
			</div>
		);
	}
}

export default Pie;
