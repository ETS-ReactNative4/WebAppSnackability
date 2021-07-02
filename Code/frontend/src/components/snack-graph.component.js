import axios from 'axios';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


const SnackGraph = () => {

	const [chartData, setChartData] = useState({});
	const [snackPoints, setsnackPoints] = useState({});
	const [employeeAge, setEmployeeAge] = useState({});


	const chart = () => {


		let snackPoints = [];
		let empAge = [];

		var day1 = moment().format('MMMM-DD');
		var day2 = moment().subtract(1, 'days').format('MMMM-DD');
		var day3 = moment().subtract(2, 'days').format('MMMM-DD');
		var day4 = moment().subtract(3, 'days').format('MMMM-DD');
		var day5 = moment().subtract(4, 'days').format('MMMM-DD');

		axios.get("http://www.json-generator.com/api/json/get/bRuxWOIrjC?indent=2")

			.then(res => {
				console.log(res)

				for (const dataObj of res.data.data) {
					snackPoints.push(parseInt(dataObj.snack_points))
					empAge.push(parseInt(dataObj.employee_age))
				}

				setChartData({
					labels: [day5, day4, day3, day2, day1],
					datasets: [{
						label: 'Average Points Earned Daily',
						data: snackPoints,
						backgroundColor: function(context)
						{
							var index = context.dataIndex;
							var value = context.dataset.data[index];

							return value >= 9 ? 'rgba(144,238,144, 0.5)' :
								value < 5 ?  'rgba(205, 92, 92, 0.5)'   :
									'rgba(255,228,181, 0.5)';

						},
						borderColor: function(context)
						{
							var index = context.dataIndex;
							var value = context.dataset.data[index];

							return value >= 9 ? 'rgba(144,238,144, 1.0)' :
								value < 5 ?  'rgba(205, 92, 92, 1.0)'   :
									'rgba(255,228,181, 1.0)';

						},
						borderWidth: 1,
						borderRadius: [5],
					}
					]
				})

			})
			.catch(err => {
				console.log(err)
			})

		console.log(snackPoints)


	}

	useEffect(() =>
	{
		chart()
	},[]);

	return (
		<div className = "grid">
			<div className= 'container' >
				<h3>
					Snack Details
					<form>
						<label>
							Today :
							<input type="text" name="score" />
						</label>
						<input type="submit" value="Submit" />
					</form>
				</h3>
			</div>

			<div className='container'>

				<div style ={{height: "300px", width: "700px"}}>
					<Bar data={chartData} options = {{
						responsive: true,
						title : {text: 'Points Earned', display: true},
						scales: {
							yAxis: {
								max: 10,
								min: 0
							}
						}
					}} />
				</div>
			</div>
		</div>
	)

};

export default SnackGraph;
