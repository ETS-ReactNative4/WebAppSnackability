import axios from 'axios';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import moment from "moment"; // No more errors, errors present when using {moment}

import { fetSnackScore } from '../services/score.service.js';

import SnackDetailsStyles from '../styles/graph.css';

defaults.plugins.legend.position = 'top';


const SnackGraph = () => {

    const [chartData, setChartData] = useState({});
    const [snackPoints, setsnackPoints] = useState({});
    const [employeeAge, setEmployeeAge] = useState({});

	let wholeAverageDays = [];

    const chart = () => {

        let snackPoints = [];
        let empAge = [];

        var day1 = moment().format('MMMM-DD');
        var day2 = moment().subtract(1, 'days').format('MMMM-DD');
        var day3 = moment().subtract(2, 'days').format('MMMM-DD');
        var day4 = moment().subtract(3, 'days').format('MMMM-DD');
        var day5 = moment().subtract(4, 'days').format('MMMM-DD');
            
		fetSnackScore().then(response => response.data).then((score) => {
			console.log(score);     
			
			//var timestamp = score[0].created_at._seconds;
			//var date = new Date(Math.round(timestamp * 1000));
			//console.log(date)
			
			// Formatting the dates.
			for (let index = 0; index < score.length; index++) {
				var timestampp = score[index].created_at._seconds;				
				var date = new Date(Math.round(timestampp * 1000));	
				date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				score[index].created_at = date; 	
			}
			console.log(score);  


			// Initialization.
			let datesEND = [];
			let dateOne ;
			let dateTwo;
			let dateThree;
			let dateFour;
			let dateFive;
			let i;		
			let max = "0000-00-0";;	

			// Getting 1st Largest Date.
        	for (i = 0; i < score.length; i++) {
            	if (score[i].created_at > max) {
					max = score[i].created_at;
				}                	
        	}

			console.log(max);
			datesEND.push(max);
			dateOne = datesEND[0];


			// Getting 2nd Largest Date.
			max = max = "0000-00-0";;	

        	for (i = 0; i < score.length; i++) {
            	if (score[i].created_at > max && score[i].created_at !== dateOne) {
					max = score[i].created_at;
				}                	
        	}

			console.log(max);
			datesEND.push(max);						
			dateTwo = datesEND[datesEND.length - 1];


			// Getting 3rd Largest Date.
			max = "0000-00-0";	

        	for (i = 0; i < score.length; i++) {
            	if ((score[i].created_at > max) && (score[i].created_at !== dateOne) && (score[i].created_at !== dateTwo)) {
					max = score[i].created_at;
				}                	
        	}

			console.log(max);
			datesEND.push(max);
			dateThree = datesEND[datesEND.length - 1];
			
			
		



			// Getting 4th Largest Date.
			max = "0000-00-0";	

        	for (i = 0; i < score.length; i++) {
            	if ((score[i].created_at > max) && (score[i].created_at !== dateOne) && (score[i].created_at !== dateTwo) && (score[i].created_at !== dateThree)) {
					max = score[i].created_at;
				}                	
        	}

			console.log(max);
			datesEND.push(max);
			dateFour = datesEND[datesEND.length - 1];




			// Getting 5th Largest Date.
			max = "0000-00-0";	

        	for (i = 0; i < score.length; i++) {
            	if ((score[i].created_at > max) && (score[i].created_at !== dateOne) && (score[i].created_at !== dateTwo) && (score[i].created_at !== dateThree) && (score[i].created_at !== dateFour)) {
					max = score[i].created_at;
				}                	
        	}

			console.log(max);
			datesEND.push(max);
			dateFive = datesEND[datesEND.length - 1];
			


			datesEND.sort();
			console.log(datesEND);


			
			// Grouping Scores By Date.
			let group = score.reduce((r, a) => {		
				r[a.created_at] = [...r[a.created_at] || [], a];
				return r;
			}, {});

			console.log("group", group);
			console.log(group["2021-7-3"][0]);






			//wholeAverageDays

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


			console.log(wholeAverageDays);
			

				

			
				
				

						
				
	
				
			setChartData({
				//labels: [day5, day4, day3, day2, day1],
				labels: datesEND,
				datasets: [{
					label: 'Average Points Earned Daily',
					data:  wholeAverageDays,
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
								
				


			
	
	
	
	
	
		}).catch(error => {
			console.error(error);
		}); 

          

        /*console.log(snackPoints)*/
    }

    useEffect(() => {
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