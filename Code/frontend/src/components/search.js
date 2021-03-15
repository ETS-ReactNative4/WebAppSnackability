import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React, { useState } from "react"; 
  import axios from "axios";

export function storeInput() {

    let input = document.getElementById("a").value;
    let result = [];

    console.log(input);   

    axios.post("http://localhost:4000/id", {
        searchWord: input,
      }).then((response) => {
        result = response.data;
        console.log(result);

        return result;
      });
}


