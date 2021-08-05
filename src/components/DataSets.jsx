import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import JsonViewer from "./JsonViewer";
import ds1 from "../mock-data/ds_1.json"
import ds2 from "../mock-data/ds_2.json"
import ds3 from "../mock-data/ds_3.json"

const DataSets = (props) => {
    const {setSelectedTask} = props
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab onClick={() => setSelectedTask(ds1)}>Set 1</Tab>
                    <Tab onClick={() => setSelectedTask(ds2)}>Set 2</Tab>
                    <Tab onClick={() => setSelectedTask(ds3)}>Set 3</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <JsonViewer jsonSchema={ds1} isResult={false}/>
                    </TabPanel>
                    <TabPanel>
                        <JsonViewer jsonSchema={ds2} isResult={false}/>
                    </TabPanel>
                    <TabPanel>
                        <JsonViewer jsonSchema={ds3} isResult={false}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export default DataSets;
