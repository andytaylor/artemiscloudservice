import * as React from 'react';


export interface IBrokerDef {
  name: string;
  status: string
  size: number;
  created: string
}

/* Dummy Data */
const brokers: IBrokerDef[] = [
  {
      name: "Broker-Infra",
      status: "Active",
      size: 2,
      created: "4 hours ago",
  },
  {
      name: "order-processing",
      status: "Active",
      size: 3,
      created: "3 days ago",
  },
  {
      name: "notifications",
      status: "Disabled",
      size: 3,
      created: "1/8/2020",
  }
];

const allBrokers = () => {
  return brokers;
}

const addBroker = (name: string, status: string, size: number, created: string) => {
  console.log("adding broker");
  brokers.push({
                     name: name,
                     status: status,
                     size: size,
                     created: created,
                 });
  return brokers;
}
export { allBrokers, addBroker };
