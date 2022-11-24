import React, { useState } from "react";
import { CustomerType } from "./CustomerType";

const Customer = (props: CustomerType) => {
  return (
    <>
      <br />
      <hr />
      <table>
        <tbody>
          <tr>
            <td>{props.first_name}</td>
            <td>{props.last_name}</td>
          </tr>
          <tr>
            <td>{props.email}</td>
            <td>{props.phone}</td>
          </tr>
          <tr>
            <td colSpan={2}>{props.address}</td>
          </tr>
          <tr>
            <td colSpan={2}>{props.description}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Customer;
