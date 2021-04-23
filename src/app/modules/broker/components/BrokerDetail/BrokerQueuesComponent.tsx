import React from 'react';
import { useParams, useLocation } from "react-router";
import { PageSection, Title, PageSectionVariants } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

export const BrokerQueuesComponent: React.FunctionComponent = () => {

  const columns = ['Name', 'Auto-create queues?', 'Auto-delete queues?', 'Created'];
  const rows = [
    ['Jobs', "Yes", "Yes", "3 Minutes Ago" ],
    ['Commands', 'Yes', 'Yes', "4 hours ago"]
  ];

    return (
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="lg">Clients</Title>
         <Table aria-label="Queues table" cells={columns} rows={rows} borders="false" variant="compact">
          <TableHeader />
          <TableBody />
         </Table>
      </PageSection>
    );
}
