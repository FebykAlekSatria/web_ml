import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

export default function Prepocessing(props) {
    return (
        <Box>
            <Center m='auto'>
                <Text fontWeight='bold' fontSize='xl'>Prepocessing</Text>
            </Center>
            <Flex>
                <Grid templateColumns='repeat(5, 1fr)' gap={4} m='auto'>

                    <GridItem colSpan={2}>
                        <Text fontSize='md'>Data Mentah : <br />
                            1. {props.mentah1} <br />
                            2. {props.mentah2}
                        </Text>
                    </GridItem>
                    <GridItem colStart={4} colEnd={6}>
                        <Text fontSize='md'>Data Prepocessing : <br />
                            1. [{props.prepos1}] <br />
                            2. [{props.prepos2}]
                        </Text>
                    </GridItem>
                </Grid>
            </Flex>
        </Box>
    )
}