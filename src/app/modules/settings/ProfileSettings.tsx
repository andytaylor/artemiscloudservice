import * as React from 'react';
import { PageSection, Title, Form, FormGroup, Popover, TextInput, button } from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';
import { useState } from 'react';
import {storedBearerTokenKey, storedApiUrlKey} from "@app/modules/common"

export const ProfileSettings: React.FunctionComponent = () => {

  const storedToken = sessionStorage.getItem(storedBearerTokenKey);
  if (!storedToken) {
    storedToken = "";
  }

  const storedApiUrl = localStorage.getItem(storedApiUrlKey);
  if (!storedApiUrl) {
    storedApiUrl = "";
  }

  console.log("stored " + storedToken);
  console.log("storedApiUrl " + storedApiUrl);

  const [ bearerToken, setBearerToken ] = useState(storedToken);

  const [ apiUrl, setApiUrl ] = useState(storedApiUrl);

  const handleBearerTokenChange = value => {
      setBearerToken(value);
      sessionStorage.setItem(storedBearerTokenKey, value);
  };

  const handleApiUrlChange = value => {
      setApiUrl(value);
      localStorage.setItem(storedApiUrlKey, value);
  };

  return (
  <PageSection>
    <Title headingLevel="h1" size="lg">
      Profile Settings
    </Title>
    <Form>
        <FormGroup
            label="Bearer Token"
            labelIcon={
              <Popover
                headerContent={
                  <div>
                    The token to use for authentication
                  </div>
                }
                bodyContent={
                  <div>
                    This can be accessed by logging into the Kubernetes Console and downloading the Bearer Token
                  </div>
                }
              >
                <button
                  type="button"
                  aria-label="More info for Token field"
                  onClick={e => e.preventDefault()}
                  className="pf-c-form__group-label-help"
                >
                  <HelpIcon noVerticalAlign />
                </button>
              </Popover>
            }
            isRequired
            fieldId="profile-settings-form"
            helperText="Please provide your Bearer Token"
            aria-describedby="simple-form-name-01"
          >
            <TextInput
              isRequired
              type="text"
              id="profile-settings-form-token"
              name="profile-settings-form-input"
              aria-label="The Bearer Token"
              value={bearerToken}
              onChange={handleBearerTokenChange}
            />
          </FormGroup>
          <FormGroup
              label="API URL"
              labelIcon={
                <Popover
                  headerContent={
                    <div>
                      The URL of the Kubernetes APi
                    </div>
                  }
                  bodyContent={
                    <div>
                      Typically something like https://api.mycluster.com:6443/
                    </div>
                  }
                >
                  <button
                    type="button"
                    aria-label="More info for API URL"
                    onClick={e => e.preventDefault()}
                    className="pf-c-form__group-label-help"
                  >
                    <HelpIcon noVerticalAlign />
                  </button>
                </Popover>
              }
              isRequired
              fieldId="simple-form-name-01"
              helperText="Please provide your Bearer Token"
              aria-describedby="simple-form-name-01"
            >
              <TextInput
                isRequired
                type="text"
                id="profile-settings-form-apiUrl"
                name="profile-settings-form-input"
                aria-label="The Cluster API URL"
                value={apiUrl}
                onChange={handleApiUrlChange}
              />
            </FormGroup>
    </Form>
  </PageSection>
  );
}
