import React, { useState } from "react";
import { Button, Form, Col} from 'react-bootstrap';


const string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ";
const numeric = "0123456789";
const punctuation = "!@#$%^&*";


export default function RandomPassword(props) {
  const [length, setLength] = useState(20);
  const [password, setPassword] = useState("");

  const generatePassword = (e) => {
    e.preventDefault();
    const formValid = +length > 0;
    if (!formValid) {
      return;
    }

    let character = "";
    let password = "";

    while (password.length < length) {
      const entity1 = Math.ceil(string.length * Math.random() * Math.random());
      const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
      const entity3 = Math.ceil(
        punctuation.length * Math.random() * Math.random()
      );

      let hold = string.charAt(entity1);
      hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;
      character += hold;
      character += numeric.charAt(entity2);
      character += punctuation.charAt(entity3);
      password = character;
    }


    password = password
      .split("")
      .sort(() => {
        return 0.5 - Math.random();
      })
      .join("");
    setPassword(password.substr(0, length));

    props.getPass(password.substr(0, length));
  };


  return (
    <Form.Group className="RandomPassword">
        <Form.Label>Password</Form.Label>
      
        {/* <div>
          <label>length</label>
          <input value={length} onChange={(e) => setLength(e.target.value)} />
        </div> */}
        <br />
        <Col>
        <Button 
            type="submit"
            variant="primary"
            size="sm"
            onClick={generatePassword}>
            Generate Password
        </Button>
        </Col>
      
      <Form.Text>{password}</Form.Text>
    </Form.Group>
  );
}