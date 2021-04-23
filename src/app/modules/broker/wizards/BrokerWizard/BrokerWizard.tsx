
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { PageSection, Modal, ModalVariant, Button, Form, FormGroup, TextInput, Wizard, Checkbox } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

export const BrokerWizard: React.FunctionComponent = ({ onCreateBroker, isEnabled, onToggle }) =>  {

  const title = 'Create Broker';
  const [ brokerName, setBrokerName ] = useState("");
  const [ brokerSize, setBrokerSize ] = useState(1);
  const [ isBrokerNameValid, setIsBrokerNameValid ] = useState(false);
  const [ stepIdReached , setStepIdReached ] = useState(1);

  console.log("modal is " + isEnabled);

  const handleBrokerNameChange = value => {
      setBrokerName(value);
      if (brokerName && brokerName.trim().length < 5) {
        setIsBrokerNameValid(false);
      } else {
        setIsBrokerNameValid(true);
      }
  };

  const handleBrokerSizeChange = value => {
      setBrokerSize(value);
  };

  const isBrokerConfigOk = () => {
      console.log("ok");
      return brokerName && brokerName.trim().length > 0;
    };

  const brokerStep = { id: 1, name: 'Broker Configuration', component:
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
             type="number"
             id="horizontal-form-name"
             aria-describedby="horizontal-form-name-helper"
             name="horizontal-form-name"
             onChange={handleBrokerSizeChange}
           />
         </FormGroup>
         <FormGroup>
           <Checkbox label="Persist journal" id="alt-form-checkbox-1" name="alt-form-checkbox-1" />
         </FormGroup>
     </Form>, enableNext: isBrokerConfigOk() , canJumpTo: stepIdReached >= 1 && stepIdReached < 4  }

  const authStep = { id: 2, name: 'Authentication', component: <p>Step 2 content</p>, canJumpTo: stepIdReached >= 2 && stepIdReached < 4 }

  const reviewStep = { id: 3, name: 'Review', component: <p>Review</p>, nextButtonText: 'Create', canJumpTo: stepIdReached >= 3 && stepIdReached < 4 };

  const steps = [
      brokerStep,
      authStep,
      reviewStep
  ];



  const onNext = ({ id }) => {
    console.log(id);
    setStepIdReached(id);
  };

  const onBack = ({ id }) => {
    console.log(id);
    setStepIdReached(id);
  };

  const onClose = () => {
    onToggle();
    setBrokerName("");
    setBrokerSize(1);
  };

  const onGoToStep = ({ id }) => {
    console.log(id);
    setStepIdReached(id);
  };

  const createBroker = () => {
    console.log("Creating Broker")
    onCreateBroker(brokerName, "Active", brokerSize, "Just now");
    setBrokerName("");
    setBrokerSize(1);
    onToggle();
  }


  return (
      <>
        { isEnabled &&
        (<Wizard
          title={title}
          description="Create and Deploy a new broker instance"
          steps={steps}
          onNext = {onNext}
          onBack = {onBack}
          onClose = {onToggle}
          onGoToStep = {onGoToStep}
          onSave = {createBroker}
          isOpen={isEnabled}
          startAtStep = {1} />)}
      </>
  );
}
