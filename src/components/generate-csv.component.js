import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from 'react-csv'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileCsv
} from "@fortawesome/free-solid-svg-icons";
import { fetCSVGen, fetSnackScore, fetUserData } from "../services/score.service.js";

let headers = [
    {
        label: "User ID", key: "userid"
    },
    {
        label: "Snack Score", key: "snackscore"
    },
    {
        label: "Snack ID", key: "snack_id"
    },
    {
        label: "Elite Warrior", key: "elitewarrior"
    },
    {
        label: "Kalorie Killa", key: "kalorie"
    },
    {
        label: "Paleo", key: "paleo"
    },
    {
        label: "Salt Bae", key: "saltbae"
    },
    {
        label: "Slim Shady", key: "slim"
    },
    {
        label: "Sugar", key: "sugar"
    },
    {
        label: "Red Apples", key: "redapples"
    },
    {
        label: "Golden Apples", key: "goldenapples"
    },

]

function GenerateCSVComponent() {
    const [snackabilityData, setSnackabilityData] = useState([]);

    const getCSVGen = () => {

        // Makes sure the array is empty before iterating through the data of each user
        setSnackabilityData(snackabilityData => []);

        fetCSVGen()
      .then((response) => response.data)
      .then((all_data) => {
        console.log(all_data);
        for(let i = 0; i < all_data.length; ++i)
        {
            setSnackabilityData(snackabilityData => [...snackabilityData, {
                userid: all_data[i].userid,
                snackscore: all_data[i].snackscore,
                snack_id: all_data[i].snack_id,
                elitewarrior: all_data[i].elitewarrior,
                kalorie: all_data[i].kalorie,
                paleo: all_data[i].paleo,
                saltbae: all_data[i].saltbae,
                slim: all_data[i].slim,
                sugar: all_data[i].sugar,
                redapples: all_data[i].redapples,
                goldenapples: all_data[i].goldenapples,
            }])
        }
      });
    }

    useEffect(() => {
        getCSVGen();
    }, []);

    return (
        <div><div className="d-flex justify-content-center mt-5">
            <CSVLink data={snackabilityData} headers={headers} filename={"SnackabilityData.csv"}><Button variant="primary"><span>
                <FontAwesomeIcon icon={faFileCsv} className="mr-2" />
            </span>Generate CSV</Button></CSVLink>
        </div></div>

    )
}
export default GenerateCSVComponent