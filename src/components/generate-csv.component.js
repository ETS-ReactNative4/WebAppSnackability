import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from 'react-csv'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileCsv
} from "@fortawesome/free-solid-svg-icons";
import { fetAllData, fetSnackScore, fetUserData } from "../services/score.service.js";

let headers = [
    {
        label: "User ID", key: "userid"
    },
    {
        label: "Snack Score", key: "scackscore"
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

    const getAllUserData = () => {

        // Makes sure the array is empty before iterating through the data of each user
        setSnackabilityData(snackabilityData => []);

        // Dummy for loop that creates entries in the CSV
        for (let i = 0; i < 10; ++i) {
            setSnackabilityData(snackabilityData => [...snackabilityData, {
                userid: 9999,
                snackscore: "00",
                snack_id: "00000000",
                elitewarrior: 1,
                kalorie: 1,
                paleo: 1,
                saltbae: 1,
                slim: 1,
                sugar: 1,
                redapples: 1,
                goldenapples: 1
            }])
        }
    }

    useEffect(() => {
        getAllUserData();
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