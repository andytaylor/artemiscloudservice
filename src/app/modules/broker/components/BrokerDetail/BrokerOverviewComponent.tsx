import React, { useState } from "react";
import { PageSection, PageSectionVariants, Title, List, ListItem, OrderType, ListComponent,Card, CardTitle, CardBody, CardFooter, Gallery, GalleryItem  } from '@patternfly/react-core';
import { Chart, ChartBar, ChartVoronoiContainer, ChartAxis, ChartGroup } from '@patternfly/react-charts';
import { getBrokerCPU, getBrokerMemory, getBrokerStorage } from "@app/modules/kubeapi";

export const BrokerOverviewComponent: React.FunctionComponent = ({}) => {

  const cpuData = getBrokerCPU();
  const memData = getBrokerMemory();
  const storageData = getBrokerStorage();

  const toChartData = (item, type) => {
    const dataRow = {
      name: type,
      x: item.podName,
      y: item.usage
    };
    return dataRow;
  }
  const toChartMemoryData = (item) => {
    return toChartData(item, "Memory");
  }
  const toChartCPUData = (item) => {
    return toChartData(item, "CPU");
  }
  const toChartStorageData = (item) => {
    return toChartData(item, "Storage");
  }

  const chartCPUData = cpuData.map(toChartCPUData);
  const chartMemData = memData.map(toChartMemoryData);
  const chartStorageData = storageData.map(toChartStorageData);

  const createChart = (name, chartData) => (

    <div style={{ height: '250px', width: '300px' }}>
        <Chart
          ariaTitle={name + " Bar chart"}
          containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
          domain={{y: [0,100]}}
          domainPadding={{ x: [30, 30] }}
          height={250}
          padding={{
            bottom: 50,
            left: 50,
            right: 50, // Adjusted to accommodate legend
            top: 50
          }}
          width={300}
        >
          <ChartBar barWidth={20}
            data={chartData} />
        </Chart>
      </div>
  )

  const thruput = () => (
    <div style={{ height: '250px', width: '300px' }}>
      <Chart
        ariaTitle="Throughput Bar chart"
        containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
       // domain={{y: [0,9]}}
        domainPadding={{ x: [24, 25] }}
        legendData={[{ name: 'In' }, { name: 'Out' }]}
        legendOrientation="vertical"
        legendPosition="right"
        height={250}
        padding={{
          bottom: 50,
          left: 50,
          right: 100, // Adjusted to accommodate legend
          top: 50
        }}
        width={300}
      >
        <ChartAxis />
        <ChartAxis dependentAxis showGrid />
        <ChartGroup offset={20}>
          <ChartBar barWidth={20} data={[{ name: 'In', x: '1 hr', y: 1234 }, { name: 'In', x: '1 day', y: 1100 }, { name: 'In', x: '1 week', y: 1100 }]} />
          <ChartBar barWidth={20} data={[{ name: 'out', x: '1 hr', y: 2122 }, { name: 'Out', x: '1 day', y: 1222 }, { name: 'In', x: '1 week', y: 1100 }]} />
        </ChartGroup>
      </Chart>
    </div>
  );

  return (
     <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h3" size="lg">Status</Title>
        <br />
        <Gallery hasGutter>
          <GalleryItem>
            <Title headingLevel="h5" size="lg">CPU</Title>
            {createChart("CPU", chartCPUData)}
        </GalleryItem>
        <GalleryItem>
          <Title headingLevel="h5" size="lg">Memory</Title>
          {createChart("Memory", chartMemData)}
        </GalleryItem>
        <GalleryItem>
          <Title headingLevel="h5" size="lg">Storage</Title>
          {createChart("Storage", chartStorageData)}
        </GalleryItem>
        <GalleryItem>
        <Title headingLevel="h5" size="lg">Messages in/out</Title>
          { thruput() }
        </GalleryItem>
        </Gallery>
        <br />
        <Title headingLevel="h3" size="lg">Connecting to this broker</Title>
        <br />
         <List component={ListComponent.ol} type={OrderType.number}>
            <ListItem>Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum enim urna ornare pellentesque felis eget.</ListItem>
            <ListItem>Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum enim urna ornare pellentesque felis eget.</ListItem>
            <ListItem>Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum enim urna ornare pellentesque felis eget.</ListItem>
          </List>
        <br />
        <Title headingLevel="h3" size="lg">Sending and receiving messages</Title>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum enim urna ornare pellentesque felis eget maximus lacinia lorem nulla auctor massa vitae ultricies varius curabitur consectetur lacus sapien a lacinia urna tempus quis vestibulum vitae augue non augue lobortis semper nullam fringilla odio quis ligula consequat condimentum integer tempus sem.</p>
      </PageSection>
  );
};
