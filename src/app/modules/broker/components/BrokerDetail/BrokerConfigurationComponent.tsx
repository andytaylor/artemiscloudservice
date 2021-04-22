import React from 'react';
import { useParams, useLocation } from "react-router";
import { PageSection, Title, PageSectionVariants } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

export const BrokerConfigurationComponent: React.FunctionComponent = ({ brokerName }) => {

  const location = useLocation();
  console.log(brokerName);
  const columns = ['key', 'value'];
  const rows = [
    ['Name', brokerName ],
    ['Status', 'Active',],
    ['Size', "2"],
    ['Persistence enabled	', "Yes"],
    ['Message migration enabled	', "Yes"],
    ['Image', "registry.redhat.io/amq7/amq-broker:7.8"],
    ['Created', "4 hours ago"]
  ];

  const brokerName = location.state[0].name;
    return (
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="lg">Settings</Title>
         <Table aria-label="Settings table" cells={columns} rows={rows} borders="false" variant="compact">
            <TableBody />
         </Table>
      </PageSection>
    );
}
