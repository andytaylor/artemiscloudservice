import React from 'react';
import { useParams, useLocation } from "react-router";
import { PageSection, Title, PageSectionVariants } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

export const BrokerTopicsComponent: React.FunctionComponent = () => {

  const columns = ['Name', 'Auto-create queues?', 'Auto-delete queues?', 'Created'];

  const rows = [
    ['Agents.alpha', "Yes", "Yes", "3 Minutes Ago" ],
    ['Agents.beta', 'Yes', 'Yes', "4 hours ago"]
  ];

    return (
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="lg">Clients</Title>
         <Table aria-label="Topics table" cells={columns} rows={rows} borders="false" variant="compact">
            <TableBody />
         </Table>
      </PageSection>
    );
}
