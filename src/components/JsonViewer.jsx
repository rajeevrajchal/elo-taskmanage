import React from 'react';
import ReactJson from "react-json-view-ssr";
import {Box} from "@chakra-ui/react";
import PropTypes from 'prop-types';

const JsonViewer = (props) => {
    const {jsonSchema,isResult} = props
    return (
        <Box>
            <ReactJson src={jsonSchema} theme="monokai"
                       collapsed={isResult}
                       style={{
                           height: '80vh',
                           borderRadius: '5px',
                           padding: '5px',
                           overflowY: "scroll"
                       }}/>
        </Box>
    );
};

JsonViewer.propTypes = {
    jsonSchema: PropTypes.any.isRequired,
    isResult: PropTypes.bool.isRequired
};

export default JsonViewer;
