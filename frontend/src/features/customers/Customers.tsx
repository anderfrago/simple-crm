import React, { useEffect, useState } from "react";
import Customer from "./Customer";
import { CustomerType } from "./CustomerType";
import { getCustomers } from "../../api/customersApi";

type Props = {};

const Customers = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>cargando...</div>;

  return (
    <div>
      {customers.map((customer) => (
        <Customer key={customer.id} {...customer} />
      ))}
    </div>
  );
};

export default Customers;
