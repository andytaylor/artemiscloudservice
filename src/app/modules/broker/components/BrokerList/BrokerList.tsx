/*
 * Copyright 2020, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import * as React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router";
import { PageSection, Title, List, ListItem} from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { BrokerWizard } from "@app/modules/broker/wizards";
import { allBrokers, addBroker } from "@app/data-module";

export interface IBroker {
  name: string;
  status: string;
  size: string;
  created: string;
}

export const BrokerList: React.FunctionComponent = ({}) =>  {

  const location = useLocation()
  console.log(location);
  const data = allBrokers();


  const toTableCells = (row: IBrokerDef) => {
    console.log(row);
    const tableRow: IRowData = {
      selected: row.selected,
      cells: [
        {
          title: <Link to={{ pathname: "broker", state: [{name: row.name}]}}>{row.name}</Link>
        },
        row.status,
        row.size,
        row.created
      ],
      originalData: row
    };
    return tableRow;
  }

  const [tableRows, setTableRows] = useState(data.map(toTableCells));

  console.log(tableRows);

  const columns = [
    { title: 'Name', props: null },
    'Status',
    { title: 'Size', props: null },
    'Created'
  ];

  const onBrokersChange = (name: string, status: string, size: number, created: string) => {
    console.log("adding brokerddd");
    setTableRows(addBroker(name, status, size, created).map(toTableCells));
  }
  return (
    <PageSection>
      <BrokerWizard
        onCreateBroker={onBrokersChange} />
        <PageSection>
      <Title headingLevel="h1" size="lg">Brokers</Title>
      <Table aria-label="brokers List" rows={tableRows} cells={columns}>
        <TableHeader />
        <TableBody />
      </Table>
      </PageSection>
    </PageSection>
  );
}
