import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React, { useState } from "react"; 
import axios from "axios";

export function storeInput() {

    let input = document.getElementById("a").value;

    console.log(input);   

    axios.post("http://localhost:4000/id", {
        searchWord: input,
      }).then((response) => {
        console.log(response);
      });
}


