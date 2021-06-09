/*
 * Copyright 2020, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router";
import { PageSection, Title, List, ListItem, Grid, GridItem, Button} from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Loading } from "use-patternfly";
import { BrokerWizard } from "@app/modules/broker/wizards";
import { allBrokers, addBroker, getDeployments } from "@app/modules/kubeapi";

export const BrokerList: React.FunctionComponent = ({}) =>  {

  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
      getDeployments(onSuccess);
    }, [isLoading]);

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const location = useLocation();

  const closeWizard = () => {
    setIsModalOpen(false);
  };

  const openWizard = () => {
    setIsModalOpen(true);
  };


  const toTableCells = (row: IDeployments) => {
    console.log("****" + row);
    const tableRow: IRowData = {
      selected: row.selected,
      cells: [
        {
          title: <Link to={{ pathname: "broker", state: [{name: row.name}]}}>{row.name}</Link>
        },
        row.status,
        row.size,
        row.timestamp
      ],
      originalData: row
    };
    return tableRow;
  }

  const [tableRows, setTableRows] = useState([]);

  console.log(tableRows);

  const columns = [
    { title: 'Name', props: null },
    'Status',
    { title: 'Size', props: null },
    'Created'
  ];

  const onSuccess = (deployments) => {
    console.log("updating brokerddd");
    setIsLoading(false);
    setTableRows(deployments.map(toTableCells));
  }

  const onBrokersChange = (name: string, status: string, size: number, created: string) => {
    console.log("adding brokerddd");
    setTableRows(addBroker(name, status, size, created).map(toTableCells));
  }

  if (isLoading) return <Loading />;

  return (
    <PageSection>
      <BrokerWizard onCreateBroker={onBrokersChange} isEnabled={isModalOpen} onToggle={closeWizard} />
      <Grid>
        <GridItem span={8}>
          <Title headingLevel="h1" size="lg">Brokers</Title>
        </GridItem>
        <GridItem span={4}>
          <Button variant="primary" onClick={openWizard}>Create Broker</Button>
        </GridItem>
      </Grid>
      <Table aria-label="brokers List" rows={tableRows} cells={columns}>
        <TableHeader />
        <TableBody />
      </Table>
    </PageSection>
  );
}
