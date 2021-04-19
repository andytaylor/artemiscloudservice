/*
 * Copyright 2020, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import React, { useState } from "react";
import { PageSectionVariants, PageSection } from "@patternfly/react-core";
import { useParams, useLocation } from "react-router-dom";
import { BrokerListContainer } from "@app/modules/broker/containers";

import {
  PageSection,
  PageSectionVariants,
  GridItem,
  Grid
} from "@patternfly/react-core";


export const BrokerPage: React.FunctionComponent = ({}) =>  {
  console.log("%%%%%%%%%%%%%")
  return (
    <PageSection variant={PageSectionVariants.light}>
      <BrokerListContainer />
    </PageSection>
  );
}

