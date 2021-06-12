import React, { useState, useEffect } from "react";
import { Nav, NavItem, NavList, PageGroup, PageNavigation, Title, Button, Grid, GridItem } from '@patternfly/react-core';
import { BrokerOverviewComponent, BrokerConfigurationComponent, BrokerClientComponent, BrokerQueuesComponent, BrokerTopicsComponent } from "@app/modules/broker/components/BrokerDetail";
import { getDeployment } from "@app/modules/kubeapi";
import { Loading } from "use-patternfly";


export const BrokerDetailContainer: React.FunctionComponent = ({brokerName}) => {

  const [ showOverview, setShowOverview ] = useState(true);
  const [ showConfiguration, setShowConfiguration ] = useState(false);
  const [ showClients, setShowClients ] = useState(false);
  const [ showQueues, setShowQueues ] = useState(false);
  const [ showTopics, setShowTopics ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ deployment, setDeployment ] = useState({});

  useEffect(() => {
    getDeployment(brokerName, onSuccess);
  }, [isLoading]);

  const onSelect = ( result ) => {
    setShowOverview(result.itemId == 1);
    setShowConfiguration(result.itemId == 2);
    setShowClients(result.itemId == 3);
    setShowQueues(result.itemId == 4);
    setShowTopics(result.itemId == 5);
  }

  const onSuccess = (deployment) => {
    console.log("updating brokerddd");
    setIsLoading(false);
    setDeployment(deployment);
  }

  if (isLoading) return <Loading />;

  return (
    <PageGroup>
       <PageNavigation>
       <Grid>
         <GridItem span={8}>
            <Title headingLevel="h1" size="lg">Broker {brokerName}</Title>
         </GridItem>
         <GridItem span={4}>
          <Button variant="primary">Console</Button>{' '}
          <Button variant="primary">Delete</Button>
         </GridItem>
       </Grid>
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
        { showConfiguration && ( <BrokerConfigurationComponent deployment={deployment}/> )}
        { showClients && ( <BrokerClientComponent /> )}
        { showQueues && ( <BrokerQueuesComponent /> )}
        { showTopics && ( <BrokerTopicsComponent /> )}
    </PageGroup>
  );
};
