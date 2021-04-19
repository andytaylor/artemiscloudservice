/*
 * Copyright 2020, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import * as React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { PageSection, Title, List, ListItem, Modal, ModalVariant, Button, Form, FormGroup, TextInput, Wizard, Checkbox } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

export interface IBroker {
  name: string;
  status: string;
  size: string;
  created: string;
}

export const BrokerList: React.FunctionComponent = ({
  rowsData
  }) =>  {
  console.log(rowsData);
  const rows = [
    [{title: <a href="broker">Broker-Infra</a>}, 'Active', '2', '4 hours ago'],
    [{title: <a href="broker">order-processing</a>}, 'Active', '3', '3 days ago'],
    [{title: <a href="broker">notifications</a>}, 'Disabled', '1', '1/8/2020']
  ];

  const toTableCells = (row: IBroker) => {
    if (row.isReady) {
      const tableRow: IRowData = {
        selected: row.selected,
        cells: [
          {
            title: <Link to={`broker/${row.name}`}>{row.name}</Link>
          },
          row.status,
          row.size,
          row.created
        ],
        originalData: row
      };
    }
  }

  const columns = [
    { title: 'Name', props: null },
    'Status',
    { title: 'Size', props: null },
    'Created'
  ];

  const title = 'Create Broker';

  const [ brokerName, setBrokerName ] = useState("");
  const [ brokerSize, setBrokerSize ] = useState(1);
  const handleBrokerNameChange = value => {
      console.log(value)
      setBrokerName(value);
  };
  const handleBrokerSizeChange = value => {
        console.log(value)
        setBrokerSize(value);
    };
  const steps = [
        { name: 'Broker Configuration', component:
          <Form isHorizontal>
              <FormGroup label="Broker Name" isRequired fieldId="horizontal-form-name">
                <TextInput
                  value={brokerName}
                  isRequired
                  type="text"
                  id="horizontal-form-name"
                  aria-describedby="horizontal-form-name-helper"
                  name="horizontal-form-name"
                  onChange={handleBrokerNameChange}
                />
              </FormGroup>
              <FormGroup label="Deployment Size" isRequired fieldId="horizontal-form-name">
                <TextInput
                  value={brokerSize}
                  isRequired
                  type="int"
                  id="horizontal-form-name"
                  aria-describedby="horizontal-form-name-helper"
                  name="horizontal-form-name"
                  onChange={handleBrokerSizeChange}
                />
              </FormGroup>
              <FormGroup>
                <Checkbox label="Persist journal" id="alt-form-checkbox-1" name="alt-form-checkbox-1" />
              </FormGroup>
          </Form> },
        { name: 'Authentication', component: <p>Step 2 content</p> },
        { name: 'Review', component: <p>Review</p>, nextButtonText: 'Finish' }
      ];

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleModalToggle = () => {
    console.log(isModalOpen);
      setIsModalOpen(!isModalOpen);
  };

  return (
    <PageSection>
      <PageSection>
        <Button variant="primary"
             onClick={handleModalToggle}>Create Broker</Button>
              <Wizard
                title={title}
                description="Create and Deploy a new broker instance"
                steps={steps}
                onClose={handleModalToggle}
                isOpen={isModalOpen}
              />
        </PageSection>
        <PageSection>
      <Title headingLevel="h1" size="lg">Brokers</Title>
      <Table aria-label="brokers List" rows={rowsData} cells={columns}>
        <TableHeader />
        <TableBody />
      </Table>
      </PageSection>
    </PageSection>
  );
}
