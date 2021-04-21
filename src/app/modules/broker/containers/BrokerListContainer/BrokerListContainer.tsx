import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { BrokerList, IBroker } from "@app/modules/broker/components";

export const BrokerListContainer: React.FunctionComponent = ({}) => {


  console.log("fsfsssfsdfsdsfsdfsfsf");
  return (
    <>
      <BrokerList />
    </>
  );
};
