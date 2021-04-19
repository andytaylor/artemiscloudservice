import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { BrokerList, IBroker } from "@app/modules/broker/components";

export const BrokerListContainer: React.FunctionComponent = ({}) => {

  const brokersList = [
     [{title: <a href="broker">Broker-Infra</a>}, 'Active', '2', '4 hours ago'],
     [{title: <a href="broker">order-processing</a>}, 'Active', '3', '3 days ago'],
     [{title: <a href="broker">notifications</a>}, 'Disabled', '1', '1/8/2020']
  ];

  console.log("fsfsssfsdfsdsfsdfsfsf");
  return (
    <>
      <BrokerList
        rowsData={brokersList ? brokersList : []}
      />
    </>
  );
};
