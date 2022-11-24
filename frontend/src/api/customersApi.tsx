import { CustomerType } from "../features/customers/CustomerType";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:5000/customers/";

export function getCustomers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveCustomer(customer: CustomerType) {
  return fetch(baseUrl + (customer.id || ""), {
    method: customer.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(customer),
  })
    .then(handleResponse)
    .catch(handleError);
}
