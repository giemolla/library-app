import React from "react";
import Label from "../../atoms/Label/Label";
import Input from "../../atoms/Input/Input";

const LabeledInput = props => (
  <div>
    <Label>This is label for following input...</Label>
    <Input placeholder={props.placeholder} />
  </div>
);

export default LabeledInput;
