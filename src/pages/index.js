import Head from 'next/head'
import {Container, Box, Center, Heading, Button, Grid} from "@chakra-ui/react"
import {ArrowForwardIcon} from '@chakra-ui/icons'
import DataSets from "../components/DataSets";
import ResultView from "../components/ResultView";
import useTaskManipulation from "../hooks/useTaskManipulation";
import {useState} from "react";
import ds1 from "../mock-data/ds_1.json"

const Home = () => {
    const {postManageTask} = useTaskManipulation()
    const [selectedTask, setSelectedTask] = useState(ds1 || {})
    const [managedTask, setManagedTask] = useState({})
    const handleSelectedTask = (jsonSchema) => {
        setSelectedTask(jsonSchema)
        setManagedTask({})
    }
    const handleManipulation = async () => {
        const res = await postManageTask(selectedTask)
        setManagedTask(res || {})
    }
    return (
        <Box>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container maxW="container.xl" py={5}>
                <Center>
                    <Heading>Task Management</Heading>
                </Center>
                <Grid templateColumns="1fr 200px 1fr" gap={6} marginY={5}>
                    <Box h="85vh" padding={3}>
                        <DataSets setSelectedTask={handleSelectedTask}/>
                    </Box>
                    <Grid h="85vh" placeContent='center'>
                        <Center>
                            <Button
                                colorScheme="pink"
                                size="sm"
                                rightIcon={<ArrowForwardIcon/>}
                                onClick={() => handleManipulation()}>
                                Test System
                            </Button>
                        </Center>
                    </Grid>
                    <Box h="85vh" padding={3}>
                        <ResultView managedTask={managedTask}/>
                    </Box>
                </Grid>
            </Container>
        </Box>
    )
}

export default Home
