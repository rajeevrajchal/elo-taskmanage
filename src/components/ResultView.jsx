import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import JsonViewer from "./JsonViewer";
import userSet from "../mock-data/user-set.json"
import PropTypes from "prop-types";

const ResultView = (props) => {
    const {managedTask} = props
    console.log('managedTask',managedTask)
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Result </Tab>
                    <Tab>User Set</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <JsonViewer jsonSchema={managedTask || {}} isResult={false}/>
                    </TabPanel>
                    <TabPanel>
                        <JsonViewer jsonSchema={userSet} isResult={false}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

ResultView.propTypes = {
    managedTask: PropTypes.any.isRequired
};

export default ResultView;
