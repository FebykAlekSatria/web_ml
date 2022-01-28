import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

export default function Best(props) {
    return (
        <Box>
            <Center m='auto'>
                <Text fontWeight='bold' fontSize='xl' textAlign='center'>Best Params</Text>
            </Center>
            <Flex>
                <Grid templateColumns='repeat(5, 1fr)' gap={4} m='auto'>

                    <GridItem colSpan={2}>
                        <Text fontSize='md'>Kernel : {props.kernel}</Text>
                    </GridItem>
                    <GridItem colStart={4} colEnd={6}>
                        <Text fontSize='md'>C : {props.c}</Text>
                    </GridItem>
                    <GridItem colStart={6} colEnd={6}>
                        <Text fontSize='md'>Gamma : {props.gamma}</Text>
                    </GridItem>
                </Grid>
            </Flex>
        </Box>
    )
}