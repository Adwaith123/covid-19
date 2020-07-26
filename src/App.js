import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Chart from 'chart.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Pie from './components/Pie/Pie';
import Nav from './components/Nav/Nav';
import StateTable from './components/Table/StateTable';

import logo from './assets/logo.png';

import './App.css';

let history;
let historyLabels = [];
let historyCases = [];

let stateLabels = [];
let stateActiveCases = [];
let stateRecoveredCases = [];
let stateDeaths = [];

let districtLabels = [];
let districtCases = [];

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontFamily = "'Share Tech Mono', monospace";
Chart.defaults.global.defaultFontSize = 10;

const THEME = createMuiTheme({
	typography: {
		fontFamily: "'Share Tech Mono', monospace;",
		fontSize: 12,
	},
});
class App extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	formatTime = (timestamp) => {
		var date = new Date(timestamp * 1000);

		return date.toLocaleString();
	};

	drawCharts = () => {
		history = this.state.historyStats;

		history.data.map((stat) => {
			let day = stat.day.replace('2020-', '');
			day = day.replace('03-', 'Mar - ');
			day = day.replace('04-', 'Apr - ');
			day = day.replace('05-', 'May - ');
			historyLabels.push(day);
			historyCases.push(stat.summary.total);
		});

		this.state.rawStats.statewise.map((stat) => {
			stateLabels.push(stat.state);
			stateActiveCases.push(stat.active);
			stateRecoveredCases.push(stat.recovered);
			stateDeaths.push(stat.deaths);
		});

		let districts = this.state.districtStats['Kerala'].districtData;

		for (var key in districts) {
			districtLabels.push(key);
			districtCases.push(districts[key].confirmed);
		}

		let district_ctx = document.getElementById('districtBarChart');
		new Chart(district_ctx, {
			type: 'horizontalBar',
			data: {
				labels: districtLabels,
				datasets: [
					{
						label: 'Confirmed Cases',
						data: districtCases,
						backgroundColor: '#d8345f',
						borderColor: '#d8345f',
						borderWidth: 1,

						minBarLength: 5,
					},
				],
			},
			options: {
				title: {
					display: true,
					text: 'Confirmed cases (Kerala)',
				},
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							stacked: true,
							gridLines: {
								display: false,
								color: 'rgba(255,99,132,0.2)',
							},
						},
					],
					xAxes: [
						{
							gridLines: {
								display: true,
							},
						},
					],
				},
			},
		});

		let state_ctx = document.getElementById('stateBarChart');
		new Chart(state_ctx, {
			type: 'horizontalBar',
			data: {
				labels: stateLabels,
				datasets: [
					{
						label: 'Active',
						data: stateActiveCases,
						backgroundColor: '#d8345f',
						borderColor: '#d8345f',
						borderWidth: 1,
						minBarLength: 5,
					},
					{
						label: 'Recovered',
						data: stateRecoveredCases,
						backgroundColor: '#1eb2a6',
						borderColor: '#1eb2a6',
						borderWidth: 1,
					},
					{
						label: 'Deaths',
						data: stateDeaths,
						backgroundColor: '#323232',
						borderColor: '#323232',
						borderWidth: 1,
					},
				],
			},
			options: {
				title: {
					display: true,
					text: 'Confirmed cases (State)',
				},
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							stacked: true,
							gridLines: {
								display: false,
								color: 'rgba(255,99,132,0.2)',
							},
						},
					],
					xAxes: [
						{
							stacked: true,
							gridLines: {
								display: true,
							},
						},
					],
				},
			},
		});

		let country_ctx = document
			.getElementById('countryChart')
			.getContext('2d');
		new Chart(country_ctx, {
			type: 'line',
			data: {
				labels: historyLabels,
				datasets: [
					{
						label: 'Confirmed Cases',
						data: historyCases,
						backgroundColor: 'white',
						borderColor: '#d8345f',
						borderWidth: 1,
					},
				],
			},
			options: {
				title: {
					display: true,
					text: 'Confirmed cases in India',
				},
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							stacked: true,
							gridLines: {
								display: false,
								color: 'rgba(255,99,132,0.2)',
							},
						},
					],
					xAxes: [
						{
							gridLines: {
								display: false,
							},
						},
					],
				},
			},
		});
	};

	async componentDidMount() {
		let rawStats;
		// let stateStats;
		let districtStats;
		let historyStats;
		let updates;

		await fetch('https://api.covid19india.org/data.json')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				rawStats = data;
			});

		await fetch('https://api.rootnet.in/covid19-in/stats/history')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				historyStats = data;
			});

		// await fetch('https://api.rootnet.in/covid19-in/stats/latest')
		// 	.then((res) => {
		// 		return res.json();
		// 	})
		// 	.then((data) => {
		// 		stateStats = data;
		// 	});

		await fetch('https://api.covid19india.org/state_district_wise.json')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				districtStats = data;
			});

		await fetch('https://api.covid19india.org/updatelog/log.json')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				updates = data;
			});

		let summaryStats = rawStats.statewise.shift();

		this.setState(
			{
				rawStats: rawStats,
				summaryStats: summaryStats,
				// stateStats: stateStats,
				districtStats: districtStats,
				historyStats: historyStats,
				updates: updates.reverse(),
			},
			() => {
				this.drawCharts();
			}
		);
	}

	render() {
		return this.state.districtStats ? (
			<div className='app'>
				<div className='container'>
					<section id='home'>
						<a
							id='developer'
							href='https://adwaith123.github.io/portfolio-web/'
							target='_blank'
							rel='noopener noreferrer'
						>
							To view my portfolio Click here => Adwaith Rajesh
						</a>

						<p id='data-source'>* data from Covid19India</p>
						<p id='last-updated'>
							* {this.state.rawStats.statewise[0].lastupdatedtime}
						</p>

						<div className='nav-container'>
							<img
								src={logo}
								height='100px'
								width='auto'
								alt='logo'
								id='logo'
							></img>
							<p id='app-title'>Covid-19 India Stats</p>
							<Nav stats={this.state.summaryStats} />
							<Pie
								total={this.state.summaryStats.confirmed}
								active={this.state.summaryStats.active}
								discharged={this.state.summaryStats.recovered}
								deaths={this.state.summaryStats.deaths}
							/>
							{/* <a href='#table-section'>More</a> */}
						</div>
					</section>
					<section id='table-section'>
						<StateTable stats={this.state.rawStats.statewise} />
						{/* <a href='#country-section'>More</a> */}
					</section>
					<section>
						<div id='country-section' className='chart-container'>
							<canvas id='countryChart'></canvas>
						</div>
						{/* <a href='#state-section'>More</a> */}
					</section>
					<section>
						<div id='state-section' className='chart-container'>
							<canvas id='stateBarChart'></canvas>
						</div>
						{/* <a href='#district-section'>More</a> */}
					</section>
					<section>
						<div id='district-section' className='chart-container'>
							<canvas id='districtBarChart'></canvas>
						</div>
					</section>
					<section>
						<div className='updates'>
							<p
								style={{
									fontSize: '1.3rem',
									color: 'blueviolet',
								}}
							>
								Recent Updates
							</p>
							<ThemeProvider theme={THEME}>
								<List>
									{this.state.updates
										.slice(0, 5)
										.map((item, index) => {
											return (
												<ListItem key={index}>
													<ListItemText
														primary={item.update.replace(
															'\n',
															', '
														)}
														secondary={this.formatTime(
															item.timestamp
														)}
													/>
												</ListItem>
											);
										})}
								</List>
							</ThemeProvider>
						</div>
						<a href='#home'>Back to top</a>
					</section>
				</div>
			</div>
		) : (
			<div className='spinner-container'>
				<div className='spinner'></div>
			</div>
		);
	}
}

export default App;
