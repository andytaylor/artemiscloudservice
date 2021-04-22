import React from 'react';
import { useParams, useLocation } from "react-router";
import { BrokerDetailContainer } from "@app/modules/broker/containers/BrokerDetailContainer";

export const BrokerDetailPage: React.FunctionComponent = ({}) => {

  const location = useLocation();
  console.log(location);
  const brokerName = location.state[0].name;
    return (
      <BrokerDetailContainer brokerName={brokerName}/>
    );
}
