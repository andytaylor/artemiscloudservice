import React from 'react';
import { useParams, useLocation } from "react-router";
import { PageSection, Title, PageSectionVariants } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

export const BrokerClientComponent: React.FunctionComponent = () => {

  const columns = ['Name', 'Connections', 'Expires', 'Created'];
  const rows = [
    ['build-infra-36cd', "12", "12/21/2021", "3 Minutes Ago" ],
    ['build-infra-4ed8', '2', 'Never', "4 hours ago"],
    ['build-infra-e0d7', "0", "-", " 1/1/2020"]
  ];

    return (
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="lg">Clients</Title>
         <Table aria-label="Settings table" cells={columns} rows={rows} borders="false" variant="compact">
            <TableBody />
         </Table>
      </PageSection>
    );
}
