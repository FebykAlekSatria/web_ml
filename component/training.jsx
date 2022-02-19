import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Box,
    Flex,
    Text
} from '@chakra-ui/react'

export default function Training(props) {
    return (
        <Flex wrap="wrap" mx={4}>
            <Table variant='simple' w={40}>
                <TableCaption>Confusion index {props.index}</TableCaption>
                <Thead>
                    <Tr>
                        <Th ></Th>
                        <Th isNumeric>OOD</Th>
                        <Th isNumeric>ID</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Th>OOD</Th>
                        <Td isNumeric>{props.tp}</Td>
                        <Td isNumeric>{props.fn}</Td>
                    </Tr>
                    <Tr>
                        <Th>ID</Th>
                        <Td isNumeric>{props.fp}</Td>
                        <Td isNumeric>{props.tn}</Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th></Th>
                        <Th isNumeric>OOD</Th>
                        <Th isNumeric>ID</Th>
                    </Tr>
                </Tfoot>
            </Table>
            <Box m={4} >
                <Text fontSize='md'>Accurasy : {props.acc}</Text>
                <Text fontSize='md'>Presisi : {props.pre}</Text>
                <Text fontSize='md'>Recall : {props.rec}</Text>
                <Text fontSize='md'>F1 : {props.f1}</Text>
                <Text fontSize='md'>Time : {props.time}</Text>
            </Box>
        </Flex>
    )
}