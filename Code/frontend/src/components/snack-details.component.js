import React, { Component } from 'react';

import { fetchSnackByID } from '../services/snack.service.js';

import styles from '../styles/styles.module.css';
import SnackDetailsStyles from '../styles/snack-details.module.css';

const tableData = [
    { criteria: 'First Ingredient', score: "0", maxscore: "2" },
    { criteria: 'Total Calories', score: "0.5", maxscore: "2"  },
    { criteria: 'Fat', score: "0", maxscore: "1"   },
    { criteria: 'Saturated Fat', score: "0.5", maxscore: "1"   },
    { criteria: 'TransFat', score: "1", maxscore: "1"   },
    { criteria: 'Sodium', score: "0.5", maxscore: "1"   },
    { criteria: 'Sugar', score: "2", maxscore: "2"   },
]

const ScoreRow = ({data}) => {
    return (
        <tr>
            <td>{data.criteria}</td>
            <td>{data.score}</td>
            <td>{data.maxscore}</td>
        </tr>
    )
};

export default class SnackDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { snack: null, isLoading: false };
    }

    componentDidMount() {
        this.fetchSnack();
    }

    fetchSnack() {
        this.setState({ isLoading: true });
        fetchSnackByID(this.props.match.params.snack_id)
            .then(response => response.data)
            .then((snack) => {
                this.setState({ snack: snack, isLoading: false });
            })
            .catch(error => {
                console.error(error);
                this.setState({ isLoading: false });
            });
    }

    calculateScore() {
        document.getElementById("result").innerHTML = "Your score is 4.5";
        this.getScoreBreakdown(tableData);
    }

    getScoreBreakdown() {
        return tableData.map((item, i) => (
            <ScoreRow data={item} key={i}/>)
        );
    }

    render() {

        return (

            <div>
                <div className={ SnackDetailsStyles.div }>
                    <p className={ SnackDetailsStyles.snackname }>
                        { this.state.snack && this.state.snack.product }
                    </p>
                    <p className={ SnackDetailsStyles.snackname2 }>
                        Recommended serving size : { this.state.snack && this.state.snack.serving_size } grams
                    </p>
                    <table className={styles.table} style={{ marginTop: 20 }} >
                        <tbody>
                        <tr>
                            <th>Total Score</th>
                            <td>{this.state.snack && this.state.snack.total_score}</td>
                        </tr>
                        <tr>
                            <th>First Ingredient Score</th>
                            <td>{this.state.snack && this.state.snack.first_ingredient_score}</td>
                        </tr>
                        <tr>
                            <th>Total Calories Score</th>
                            <td>{this.state.snack && this.state.snack.total_calories_score}</td>
                        </tr>
                        <tr>
                            <th>Fat Score</th>
                            <td>{this.state.snack && this.state.snack.fat_score}</td>
                        </tr>
                        <tr>
                            <th>Saturated Fat Score</th>
                            <td>{this.state.snack && this.state.snack.saturated_fat_score}</td>
                        </tr>
                        <tr>
                            <th>Trans Fat Score</th>
                            <td>{this.state.snack && this.state.snack.trans_fat_score}</td>
                        </tr>
                        <tr>
                            <th>Sodium Score</th>
                            <td>{this.state.snack && this.state.snack.sodium_score}</td>
                        </tr>
                        <tr>
                            <th>Sugar Score</th>
                            <td>{this.state.snack && this.state.snack.sugar_score}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>

                <div className = {SnackDetailsStyles.div}>
			        <h2>Snack Score Calculator</h2>
			        <p className="text">Portion Size (grams)</p>
			        <input type="text" id="portion"></input>
			        <p id="result"></p>
			        <button className = {SnackDetailsStyles.btn} onClick={ () => this.calculateScore() }>Calculate</button>
		        </div>

                <div className={SnackDetailsStyles.div}>
			        <h2>Score Breakdown</h2>
                    <table id ="myTable" className={styles.table} style={{ marginTop: 20 }} >
                        <thead>
                            <tr>
                                <th>Criteria</th>
                                <th>Score</th>
                                <th>Max Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.getScoreBreakdown() }
                        </tbody>
                    </table>
		        </div>
            </div>
        )
    }
}
