import { Link } from "react-router-dom";
import React, { useState } from "react";
import Axios from "axios";

export function storeInput() {

    let input = document.getElementById("a").value;

    console.log(input);   

    Axios.post("http://localhost:4000/id", {
        searchWord: input,
      }).then((response) => {
        console.log(response);
      });
}


