import React from 'react';

import './styles.css';

const Nav = (props) => {
	console.log(props);
	return (
		<nav className='nav'>
			<div className='num-div'>
				<p className='overall-count' id='cases'>
					Cases: {props.stats.confirmed}
				</p>

				<div className='increase-stat animated flash confirmed'>
					<p>{props.stats.deltaconfirmed}</p>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						stroke-width='2'
						stroke-linecap='round'
						stroke-linejoin='round'
					>
						<line x1='12' y1='19' x2='12' y2='5'></line>
						<polyline points='5 12 12 5 19 12'></polyline>
					</svg>
				</div>
			</div>
			<div className='active'>
				<p id='active' className='overall-count'>
					Active: {props.stats.active}
				</p>
			</div>
			<div className='num-div'>
				<p id='recovered' className='overall-count'>
					Recovered: {props.stats.recovered}
				</p>

				<div className='increase-stat animated flash recovered'>
					<p>{props.stats.deltarecovered}</p>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						stroke-width='2'
						stroke-linecap='round'
						stroke-linejoin='round'
					>
						<line x1='12' y1='19' x2='12' y2='5'></line>
						<polyline points='5 12 12 5 19 12'></polyline>
					</svg>
				</div>
			</div>
			<div className='num-div'>
				<p className='overall-count'>Deaths: {props.stats.deaths}</p>

				<div className='increase-stat animated flash deaths'>
					<p>{props.stats.deltadeaths}</p>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						stroke-width='2'
						stroke-linecap='round'
						stroke-linejoin='round'
					>
						<line x1='12' y1='19' x2='12' y2='5'></line>
						<polyline points='5 12 12 5 19 12'></polyline>
					</svg>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
