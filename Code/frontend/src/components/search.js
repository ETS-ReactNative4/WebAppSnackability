import { Link } from "react-router-dom";
import React, { useState } from "react";
import Axios from "axios";

export function storeInput() {

    let input = document.getElementById("a").value;

    input = input.toLowerCase(); 

    console.log(input);   

    Axios.post("http://localhost:4000/search", {
    searchWord: input,
  }).then((response) => {
    console.log(response);
  });
}


