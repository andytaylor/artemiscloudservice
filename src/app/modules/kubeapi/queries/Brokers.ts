import * as React from 'react';
import axios from 'axios';
import {ProfileSettings} from "@app/modules/settings"
import {storedBearerTokenKey, storedApiUrlKey} from "@app/modules/common"

const cluster = localStorage.getItem(storedApiUrlKey);
const apipath = "api/v1/namespaces";
const apispath = "apis/broker.amq.io/v2alpha4/namespaces"
const brokerApi = "apis/broker.amq.io"
const brokerLabelSelector = "ActiveMQArtemis"
const namespace = "andyspace";
const brokerKinds="activemqartemises";
const apiToken = sessionStorage.getItem(storedBearerTokenKey);
const brokerApisPath = "apis/broker.amq.io/v2alpha4";
const brokerActivemqartemises = cluster + "/" + brokerApisPath + "/namespaces/andyspace/activemqartemises";

const headers = { 'Authorization': 'Bearer ' + apiToken }


export interface IDeployment {
  name: string;
  apiversion: string;
  timestamp: string;
  size: number;
  status: string;
  persistenceEnabled: boolean;
  messageMigration: boolean;
  image: string;
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

const getDeployment = (name, onSuccess) => {
  const url = brokerActivemqartemises + "/" + name;
  console.log("invoking " + url);
  const deployment: IDeployment = {};
  axios.get(
    url , {
      headers: headers,
    })
    .then(response => {
       console.log(response.data);
       const activeMQArtemis = response.data;
       deployment = {
        name: activeMQArtemis.metadata.name,
        apiversion: activeMQArtemis.apiVersion,
        timestamp: activeMQArtemis.metadata.creationTimestamp,
        size: activeMQArtemis.spec.deploymentPlan.size,
        status: "unknown",
        persistenceEnabled: activeMQArtemis.spec.deploymentPlan.persistenceEnabled,
        messageMigration: activeMQArtemis.spec.deploymentPlan.messageMigration,
        image: activeMQArtemis.spec.deploymentPlan.image
      };
       onSuccess(deployment);
    })
    .catch(e => {
       console.log(e);
    });

  return deployment;
}

const getDeployments = (onSuccess, onError) => {
  console.log("invoking " + brokerActivemqartemises);
  const deployments: IDeployment[] = [];
  axios.get(
    brokerActivemqartemises , {
      headers: headers,
    })
    .then(response => {
       console.log(response.data);
       response.data.items.forEach((activeMQArtemis) => {
         deployments.push({name: activeMQArtemis.metadata.name, apiversion: activeMQArtemis.apiVersion, timestamp: activeMQArtemis.metadata.creationTimestamp, size: activeMQArtemis.spec.deploymentPlan.size, status: "unknown"});
       })
       onSuccess(deployments);
    })
    .catch(e => {
      console.log(e.name + ': ' + e.message);
      onError(e.name + ': ' + e.message);
    });
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

export { addBroker, getBrokerCPU, getBrokerMemory, getBrokerStorage, getDeployments, getDeployment };
