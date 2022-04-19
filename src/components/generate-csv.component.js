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

let achievementHeaders = [
    {
        label: "User ID", key: "userid"
    },
    {
        label: "User E-mail", key: "useremail"
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

let snackHeaders = [
    {
        label: "User ID", key: "userid"
    },
    {
        label: "User E-mail", key: "useremail"
    },
    {
        label: "Snack ID", key: "snack_id"
    },
    {
        label: "Snack Name", key: "snack_name"
    },
    {
        label: "Brand Name", key: "brand_name"
    },
    {
        label: "Portion", key: "portion",
    },
    {
        label: "Units", key: "units",
    },
    {
        label: "Snack Score", key: "snack_score"
    },
    {
        label: "Date", key: "date"
    },
]


function GenerateCSVComponent() {
    const [userAchievementData, setUserAchievementData] = useState([]);
    const [userSnackData, setUserSnackData] = useState([]);

    const genUserAchievementCSV = () => {

        // Makes sure the array is empty before iterating through the data of each user
        setUserAchievementData(userAchievementData => []);

        fetCSVGen()
            .then((response) => response.data)
            .then((all_data) => {
                var allUserIDs = [];
                for (let i = 0; i < all_data.length; ++i) {
                    if(!allUserIDs.includes(all_data[i].userid))
                    {
                        console.log(all_data[i].useremail);
                        setUserAchievementData(userAchievementData => [...userAchievementData, {
                            userid: all_data[i].userid,
                            useremail: all_data[i].useremail,
                            elitewarrior: all_data[i].elitewarrior,
                            kalorie: all_data[i].kalorie,
                            paleo: all_data[i].paleo,
                            saltbae: all_data[i].saltbae,
                            slim: all_data[i].slim,
                            sugar: all_data[i].sugar,
                            redapples: all_data[i].redapples,
                            goldenapples: all_data[i].goldenapples,
                        }])
                        allUserIDs.push(all_data[i].userid);
                    }
                }
            });
    }

    const genUserSnacksCSV = () => {

        // Makes sure the array is empty before iterating through the data of each user
        setUserSnackData(userSnackData => []);

        fetCSVGen()
            .then((response) => response.data)
            .then((all_data) => {
                console.log(all_data);
                for (let i = 0; i < all_data.length; ++i) {
                    if(all_data[i]["brand_name"] != null){
                        console.log(all_data[i]);
                    }
                    var s = new Date(all_data[i].created_at["_seconds"] * 1000).toLocaleDateString("en-US");
                    setUserSnackData(userSnackData => [...userSnackData, {
                        userid: all_data[i].userid,
                        useremail: all_data[i].useremail,
                        snack_id: all_data[i].snack_id,
                        snack_name: all_data[i].desc,
                        brand_name: all_data[i].brand_name,
                        portion: all_data[i].portion,
                        units: all_data[i].unit,
                        snack_score: all_data[i].snackscore,
                        date: s,
                    }])
                }
            });
    }



    useEffect(() => {
        genUserAchievementCSV();
        genUserSnacksCSV();
    }, []);

    return (
        <div><div className="d-flex justify-content-center mt-5">
            <CSVLink data={userAchievementData} headers={achievementHeaders} filename={"Snackability - Achievement Data.csv"}><Button variant="primary"><span>
                <FontAwesomeIcon icon={faFileCsv} className="mr-2" />
            </span>Generate Achievements CSV</Button></CSVLink>
        </div>
            <div className="d-flex justify-content-center mt-3">
                <CSVLink data={userSnackData} headers={snackHeaders} filename={"Snackability - Snack Data.csv"}><Button variant="primary"><span>
                    <FontAwesomeIcon icon={faFileCsv} className="mr-2" />
                </span>Generate Snack CSV</Button></CSVLink></div>
        </div>

    )
}
export default GenerateCSVComponent