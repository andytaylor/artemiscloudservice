import React, { useState } from "react";
import { Nav, NavItem, NavList, PageGroup, PageNavigation, Title } from '@patternfly/react-core';
import { BrokerOverviewComponent, BrokerConfigurationComponent } from "@app/modules/broker/components/BrokerDetail";


export const BrokerDetailContainer: React.FunctionComponent = ({brokerName}) => {

  const [ showOverview, setShowOverview ] = useState(true);
  const [ showConfiguration, setShowConfiguration ] = useState(false);

  console.log(brokerName)
  const onSelect = ( result ) => {
    if (result.itemId == 1) {
      setShowOverview(true);
      setShowConfiguration(false);
    } else if (result.itemId == 2) {
      setShowOverview(false);
      setShowConfiguration(true);
    }
  }

  return (
    <PageGroup>
       <PageNavigation>
          <Title headingLevel="h1" size="lg">Broker {brokerName}</Title>
          <Nav onSelect={onSelect} variant="tertiary">
            <NavList>
              <NavItem itemId={1} href="#" isActive={showOverview}>Overview</NavItem>
              <NavItem itemId={2} href="#">Configuration</NavItem>
              <NavItem itemId={3} href="#">Clients</NavItem>
              <NavItem itemId={4} href="#">Queues</NavItem>
              <NavItem itemId={5} href="#">Topics</NavItem>
            </NavList>
          </Nav>
        </PageNavigation>
        { showOverview && ( <BrokerOverviewComponent /> )}
        { showConfiguration && ( <BrokerConfigurationComponent brokerName={brokerName}/> )}
    </PageGroup>
  );
};
