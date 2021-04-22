import React, { useState } from "react";
import { Nav, NavItem, NavList, PageGroup, PageNavigation, Title } from '@patternfly/react-core';
import { BrokerOverviewComponent } from "@app/modules/broker/components/BrokerDetail";


export const BrokerDetailContainer: React.FunctionComponent = ({}) => {

  const [ showOverview, setShowOverview ] = useState(true);

  const onSelect = ( result ) => {
    console.log(result)
    if (result.itemId == 1) {
      setShowOverview(true);
    } else if (result.itemId == 2) {
      setShowOverview(false);
    }
  }

  console.log("BrokerDetailContainer");
  return (
    <PageGroup>
       <PageNavigation>
          <Title headingLevel="h1" size="lg">Broker Details</Title>
          <Nav onSelect={onSelect} variant="tertiary">
            <NavList>
              <NavItem itemId={1} href="#" isActive={showOverview}>Overview</NavItem>
              <NavItem itemId={2} href="#">Details</NavItem>
              <NavItem itemId={3} href="#">Clients</NavItem>
              <NavItem itemId={4} href="#">Addresses</NavItem>
              <NavItem itemId={5} href="#">Address Settings</NavItem>
            </NavList>
          </Nav>
        </PageNavigation>
        { showOverview && ( <BrokerOverviewComponent /> )}
    </PageGroup>
  );
};
