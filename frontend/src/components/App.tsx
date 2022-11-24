import { Route, Routes } from "react-router-dom";

import CreateCustomer from "../features/customers/CreateCustomer";
import Customers from "../features/customers/Customers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/create" element={<CreateCustomer />} />
        {/*    <Route component={PageNotFound} /> */}
      </Routes>
    </>
  );
}

export default App;
