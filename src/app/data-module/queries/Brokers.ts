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

const brokerCPU: [] = [
  {
    podName: "Pod 1",
    usage: 75
  },
  {
    podName: "Pod 2",
    usage: 50
  },
  {
    podName: "Pod 3",
    usage: 25
  },
  {
    podName: "Pod 4",
    usage: 25
  }
];


const brokerMemory: [] = [
  {
    podName: "Pod 1",
    usage: 35
  },
  {
    podName: "Pod 2",
    usage: 50
  },
  {
    podName: "Pod 3",
    usage: 56
  },
  {
    podName: "Pod 4",
    usage: 25
  }
];


const brokerStorage: [] = [
  {
    podName: "Pod 1",
    usage: 75
  },
  {
    podName: "Pod 2",
    usage: 23
  },
  {
    podName: "Pod 3",
    usage: 44
  },
  {
    podName: "Pod 4",
    usage: 25
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

const getBrokerCPU = (name: string) => {
  return brokerCPU;
}

const getBrokerMemory = (name: string) => {
  return brokerMemory;
}

const getBrokerStorage = (name: string) => {
  return brokerStorage;
}

export { allBrokers, addBroker, getBrokerCPU, getBrokerMemory, getBrokerStorage };
