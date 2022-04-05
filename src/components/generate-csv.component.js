import React from 'react'
import { Button } from "react-bootstrap";
import { CSVLink} from 'react-csv'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileCsv
  } from "@fortawesome/free-solid-svg-icons";

const headers = [
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
        label: "Elite Warrior", key: "eliterwarrior"
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

const sampleData = [
    {
        name: "John Smith",
        userID: "0123456789",
        label3: "Test",
        label4: "Test",
        label5: "Test",
    },
    {
        name: "Mike Jones",
        userID: "0123456789",
        label3: "Test",
        label4: "Test",
        label5: "Test",
    },
    {
        name: "Bruce Wayne",
        userID: "0123456789",
        label3: "Test",
        label4: "Test",
        label5: "Test",
    },
]

const csvLink = {
    filename: "SnackabilityData.csv",
    headers: headers,
    data: sampleData,
}

function GenerateCSVComponent() {
    return (
        <div><div className="d-flex justify-content-center mt-5">
            <CSVLink {...csvLink}><Button variant="primary"><span>
                      <FontAwesomeIcon icon={faFileCsv} className="mr-2" />
                    </span>Generate CSV</Button></CSVLink>
        </div></div>

    )
}
export default GenerateCSVComponent