import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React, { useState } from "react"; 
import axios from "axios";

export function storeInput(input, callback) {
  let result = [];

  if (!callback) return;

  axios.post("http://localhost:4000/id", {
      searchWord: input,
  }).then((response) => {
      result = response.data;
      // if result is of array type you are expecting
      console.log(result);
      callback(result);

  });
}
