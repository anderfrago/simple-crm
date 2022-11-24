var express = require("express");
import bodyParser from "body-parser";

const app = express();

class Customer {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public email: string,
    public phone: string,
    public address: string,
    public description: string
  ) {}
}

const customers: Customer[] = [
  new Customer(
    1,
    "Ramsay",
    "Bachmann",
    "rbachmann0@netscape.com",
    "664-409-9434",
    "04372 Swallow Street",
    "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."
  ),
  new Customer(
    2,
    "Rosa",
    "Gullane",
    "rgullane1@vimeo.com",
    "903-237-3808",
    "81641 Dorton Center",
    "Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum."
  ),
  new Customer(
    3,
    "Linzy",
    "Rosencrantz",
    "lrosencrantz2@arizona.edu",
    "914-869-4960",
    "3109 Red Cloud Crossing",
    "Curabitur in libero ut massa volutpat convallis."
  ),
  new Customer(
    4,
    "Cynde",
    "Roke",
    "croke3@nhs.uk",
    "384-482-6210",
    "484 Norway Maple Alley",
    "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio."
  ),
  new Customer(
    5,
    "Davida",
    "Apfel",
    "dapfel4@nyu.edu",
    "946-302-8476",
    "52352 Morrow Trail",
    "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
  ),
  new Customer(
    6,
    "Puff",
    "Heineke",
    "pheineke5@sitemeter.com",
    "365-688-2212",
    "77 Utah Center",
    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet."
  ),
  new Customer(
    7,
    "Theresita",
    "Handke",
    "thandke6@squidoo.com",
    "792-508-1130",
    "97 Crest Line Avenue",
    "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy."
  ),
  new Customer(
    8,
    "Minna",
    "Idel",
    "midel7@sphinn.com",
    "212-426-7085",
    "07249 East Way",
    "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat."
  ),
  new Customer(
    9,
    "Raul",
    "Menary",
    "rmenary8@amazon.de",
    "849-481-6778",
    "3167 Summer Ridge Place",
    "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero."
  ),
  new Customer(
    10,
    "Carroll",
    "Halloway",
    "challoway9@51.la",
    "846-734-1321",
    "27 Magdeline Plaza",
    "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."
  ),
];

function getCustomers(): any[] {
  return customers;
}

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.post("/customers", bodyParser.json(), (req: any, res: any) => {
  let pNew = new Customer(
    customers.length + 1,
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.phone,
    req.body.address,
    req.body.description
  );
  customers.push(pNew);
  res.status(200).send({
    id: pNew.id,
    title: pNew.first_name,
    price: pNew.last_name,
    rating: pNew.email,
    shortDescription: pNew.phone,
    description: pNew.address,
    categories: pNew.description,
  });
});

app.get("/", (req: any, res: any) => {
  res.send("The URL of customers is http://localhost:5000/customers");
});

app.get("/customers", (req: any, res: any) => {
  res.json(getCustomers());
});

function getCustomersById(customerId: number): any {
  let p: any;
  p = customers.find((p) => p.id == customerId);
  return p;
}

app.get("/customers/:id", (req: any, res: any) => {
  res.json(getCustomersById(parseInt(req.params.id)));
});

function updateCustomersById(req: any, customerId: number): any {
  let p: any;
  p = customers.find((p) => p.id == customerId);
  let index = customers.indexOf(p);

  (p.first_name = req.body.first_name),
    (p.last_name = req.body.last_name),
    (p.email = req.body.email),
    (p.phone = req.body.phone),
    (p.address = req.body.address),
    (p.description = req.body.description),
    (customers[index] = p);
  return p;
}

app.put("/customers/:id", function (req: any, res: any) {
  res.json(updateCustomersById(req, parseInt(req.params.id)));
  res.send("Got a UPDATE request at /user");
});

function deleteCustomersById(customerId: number): any {
  let p: any;
  p = customers.find((p) => p.id == customerId);
  let index = customers.indexOf(p);
  delete customers[index];
  return p;
}

app.delete("/customers/:id", function (req: any, res: any) {
  res.json(deleteCustomersById(parseInt(req.params.id)));
  res.send("Got a DELETE request at /user");
});

const server = app.listen(5000, "localhost", () => {
  const { address, port } = server.address();

  console.log("Listening on %s %s", address, port);
});
