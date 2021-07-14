// import axios from 'axios';
// import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar, Bubble } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
// import moment from "moment"; // No more errors, errors present when using {moment}

import { fetSnackScore } from '../services/score.service.js';
import SnackDetailsStyles from '../styles/graph.css';

defaults.plugins.legend.position = 'top';
defaults.plugins.legend.title = {
	display: true,
	text: 'Average Points Earned Daily',
	font: {
		size: 22
	}
};
defaults.plugins.legend.labels.boxWidth = 0;



const SnackGraph = () => {

    const [chartData, setChartData] = useState({});

 
	let wholeAverageDays = [];

    const chart = () => {            
		fetSnackScore().then(response => response.data).then((score) => {

			// Formatting the dates to YYYY-MM-DD.
			for (let index = 0; index < score.length; index++) {
				var timestampp = score[index].created_at._seconds;				
				var date = new Date(Math.round(timestampp * 1000));	
				date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				score[index].created_at = date; 	
			}

			// Initialization.
			let datesEND = [];
			let dateOne ;
			let dateTwo;
			let dateThree;
			let dateFour;
			let dateFive;
			let i;		
			let max = "0000-00-0";	

			// Getting 1st Largest Date.
        	for (i = 0; i < score.length; i++) {
            	if (score[i].created_at > max) {
					max = score[i].created_at;
				}                	
        	}
			datesEND.push(max); // Push the value to the array that will have the largest (most recent) dates.
			dateOne = datesEND[0];

			// Getting 2nd Largest Date.
			max = "0000-00-0";	// Resetting the maxValues.
        	for (i = 0; i < score.length; i++) {
            	if (score[i].created_at > max && score[i].created_at !== dateOne) { // If date is already present in the array we do not take into consideration when comparing.
					max = score[i].created_at;
				}                	
        	}
			datesEND.push(max); // Push the value to the array that will have the largest (most recent) dates.						
			dateTwo = datesEND[datesEND.length - 1];

			// Getting 3rd Largest Date.
			max = "0000-00-0";	// Resetting the maxValues.	
        	for (i = 0; i < score.length; i++) {
            	if ((score[i].created_at > max) && (score[i].created_at !== dateOne) && (score[i].created_at !== dateTwo)) { // If date is already present in the array we do not take into consideration when comparing.
					max = score[i].created_at;
				}                	
        	}
			datesEND.push(max); // Push the value to the array that will have the largest (most recent) dates.
			dateThree = datesEND[datesEND.length - 1];

			// Getting 4th Largest Date.
			max = "0000-00-0";	// Resetting the maxValues.	
        	for (i = 0; i < score.length; i++) {
            	if ((score[i].created_at > max) && (score[i].created_at !== dateOne) && (score[i].created_at !== dateTwo) && (score[i].created_at !== dateThree)) { // If date is already present in the array we do not take into consideration when comparing.
					max = score[i].created_at;
				}                	
        	}
			datesEND.push(max); // Push the value to the array that will have the largest (most recent) dates.
			dateFour = datesEND[datesEND.length - 1];

			// Getting 5th Largest Date.
			max = "0000-00-0";	// Resetting the maxValues.	
        	for (i = 0; i < score.length; i++) {
            	if ((score[i].created_at > max) && (score[i].created_at !== dateOne) && (score[i].created_at !== dateTwo) && (score[i].created_at !== dateThree) && (score[i].created_at !== dateFour)) { // If date is already present in the array we do not take into consideration when comparing.
					max = score[i].created_at;
				}                	
        	}
			datesEND.push(max); // Push the value to the array that will have the largest (most recent) dates.
			dateFive = datesEND[datesEND.length - 1];
			
			// Sorting the array from older to recent (smallest to largest to date).			
			datesEND.sort();
			
			// Grouping Scores By Date.
			let group = score.reduce((r, a) => {		
				r[a.created_at] = [...r[a.created_at] || [], a];
				return r;
			}, {});

			// Getting the average for the group of dates and push it to the final array for the graph (wholeAverageDays).
			if(dateFive !== "0000-00-0")
			{
				let average = 0;			
				
				for (i = 0; i < group[dateFive].length; i++) {
					average = average + group[dateFive][i].score; 
				}

				wholeAverageDays.push((average/i).toPrecision(2));
			}
			else 
			{
				wholeAverageDays.push(0);
			}

			// Getting the average for the group of dates and push it to the final array for the graph (wholeAverageDays).
			if(dateFour !== "0000-00-0")
			{
				let average = 0;				
				
				for (i = 0; i < group[dateFour].length; i++) {
					average = average + group[dateFour][i].score; 
				}

				wholeAverageDays.push((average/i).toPrecision(2));
			}
			else 
			{
				wholeAverageDays.push(0);
			}

			// Getting the average for the group of dates and push it to the final array for the graph (wholeAverageDays).			
			if(dateThree !== "0000-00-0")
			{
				let average = 0;				
				
				for (i = 0; i < group[dateThree].length; i++) {
					average = average + group[dateThree][i].score; 
				}

				wholeAverageDays.push((average/i).toPrecision(2));
			}
			else 
			{
				wholeAverageDays.push(0);
			}

			// Getting the average for the group of dates and push it to the final array for the graph (wholeAverageDays).						
			if(dateTwo !== "0000-00-0")
			{
				let average = 0;				
				
				for (i = 0; i < group[dateTwo].length; i++) {
					average = average + group[dateTwo][i].score; 
				}

				wholeAverageDays.push((average/i).toPrecision(2));
			}
			else 
			{
				wholeAverageDays.push(0);
			}

			// Getting the average for the group of dates and push it to the final array for the graph (wholeAverageDays).			
			if(dateOne !== "0000-00-0")
			{
				let average = 0;				
				
				for (i = 0; i < group[dateOne].length; i++) {
					average = average + group[dateOne][i].score; 
				}

				wholeAverageDays.push((average/i).toPrecision(2));
			}
			else 
			{
				wholeAverageDays.push(0);
			}
				
			setChartData({
				//labels: [day5, day4, day3, day2, day1],
				labels: datesEND,
				datasets: [{
					label: '',
					data:  wholeAverageDays,
					backgroundColor: function(context)
					{
						var index = context.dataIndex;
						var value = context.dataset.data[index];
	
						return value >= 9 ? 'rgba(144,238,144, 0.5)' :
							   value < 5 ?  'rgba(205, 92, 92, 0.5)' :
							             	'rgba(255,228,181, 0.5)' ;
	
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
				}]
			})  
		}).catch(error => {
			console.error(error);
		}); 
    }

    useEffect(() => {
        chart()
    },[]);

const options = {	
		responsive: true,
		title : {
			text: 'Points Earned', 
			display: true
		},
		scales: {
			yAxes: {
				display: true,
				max: 10,
				min: 0,
				
			}
		}	
};



    return (
		
		
 
            <div className='container'>
               
				<div class = "axis"> </div>
                    <Bar data = {chartData} options = {options} />
					<p> <center> Last Five Days of Snack Consumed </center> </p>
                </div>
           
    )
};

export default SnackGraph;