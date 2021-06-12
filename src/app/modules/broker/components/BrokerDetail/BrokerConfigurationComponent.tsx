import React from 'react';
import { useParams, useLocation } from "react-router";
import { PageSection, Title, PageSectionVariants } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

export const BrokerConfigurationComponent: React.FunctionComponent = ({ deployment }) => {

  const location = useLocation();
  const columns = ['key', 'value'];

  const yesOrNo = (check) => {
    return check && check == true ? "yes" : "no";
  };

  const rows = [
    ['Name', deployment.name ],
    ['Status', 'Active',],
    ['Size', deployment.size],
    ['Persistence enabled	', yesOrNo(deployment.persistenceEnabled)],
    ['Message migration enabled	', yesOrNo(deployment.messageMigration) ],
    ['Image', deployment.image],
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
