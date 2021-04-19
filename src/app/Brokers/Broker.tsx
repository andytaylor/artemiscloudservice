import React from 'react';
import { Nav, NavExpandable, NavItem, NavItemSeparator, NavList, NavGroup, PageSection, Title } from '@patternfly/react-core';

class Broker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0
    };
    this.onSelect = result => {
      this.setState({
        activeItem: result.itemId
      });
    };
  }

  render() {
    const { activeItem } = this.state;
    return (
     <PageSection>
        <Title headingLevel="h1" size="lg">Broker</Title>
        <Nav onSelect={this.onSelect} variant="tertiary">
          <NavList>
            <NavItem href="#" to="overview">Overview</NavItem>
            <NavItem href="#" to="details">Details</NavItem>
            <NavItem href="#">Clients</NavItem>
            <NavItem href="#">Addresses</NavItem>
            <NavItem href="#">Address Settings</NavItem>
          </NavList>
        </Nav>
      </PageSection>
    );
  }
}
export { Broker };
