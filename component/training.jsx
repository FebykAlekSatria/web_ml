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
    Text,
    Spacer
} from '@chakra-ui/react'

export default function Training(props) {
    return (
        <Box borderWidth={2} borderRadius={20} borderColor='white' my={4}>
            {/* <Text fontSize='lg' fontWeight='bold' textAlign='center'><b>Kernel : {props.kernel} C : {props.c}</b></Text> */}
            <Box my={2} px={40}>
                <Table variant='' size='sm' borderWidth={2} textAlign='center'>
                    <TableCaption>Confusion matrix</TableCaption>
                    <Thead>
                        <Tr backgroundColor='teal.400'>
                            <Th >Uji Ke-</Th>
                            <Th colSpan={2}>Kelas Positif/OOD</Th>
                            <Th colSpan={2}>Kelas Negatif/ID</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr backgroundColor='teal.400'>
                            <Td></Td>
                            <Td>TP</Td>
                            <Td>FP</Td>
                            <Td>TN</Td>
                            <Td>FN</Td>
                        </Tr>
                        {
                            props.confusion.map((data, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{data[0]}</Td>
                                        <Td>{data[1]}</Td>
                                        <Td>{data[2]}</Td>
                                        <Td>{data[3]}</Td>
                                    </Tr>
                                )
                            }
                            )}

                    </Tbody>
                    <Tfoot>

                    </Tfoot>
                </Table>
                <Box fontSize='sm' textAlign='center' my={4}>
                    <Text fontWeight='bold' >Persamaan :</Text>
                    <Text>Accurasy = (TP + TN)/ (TP + FP + FN + TN)</Text>
                    <Text>Precision = (TP) / (TP + FP) </Text>
                    <Text>Recall = TP / (TP + FN)</Text>
                    <Text>F-score = (2 * Recall * Precision) / (Recall + Precision)</Text>
                    <Text>FRR = FN / (FN + TP)</Text>
                    <Text>FAR = FP / (FP + TN)</Text>
                </Box>

            </Box>
            <Table variant='' size='sm'>
                <TableCaption>Performa</TableCaption>
                <Thead>
                    <Tr backgroundColor='teal.400'>
                        <Th>Uji Ke-</Th>
                        {/* <Th colSpan={2}>Positif</Th>
                    <Th colSpan={2}>Negatif</Th> */}
                        <Th>Accurasy</Th>
                        <Th>Precision</Th>
                        <Th>Recall</Th>
                        <Th>F-score</Th>
                        <Th>FRR</Th>
                        <Th>FAR</Th>
                        <Th>Time</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr backgroundColor='teal.400'>
                        <Td></Td>
                        {/* <Td>TP</Td>
                    <Td>FP</Td>
                    <Td>TN</Td>
                    <Td>FN</Td> */}
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                    </Tr>
                    {
                        props.score.map((data, index) => {
                            return (
                                <Tr key={index}>
                                    <Td>{data[0]}</Td>
                                    <Td>{data[1]}</Td>
                                    <Td>{data[2]}</Td>
                                    <Td>{data[3]}</Td>
                                    <Td>{data[4]}</Td>
                                    <Td>{data[5]}</Td>
                                    <Td>{data[6]}</Td>
                                    <Td>{data[7]}</Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
                <Tfoot>

                </Tfoot>
            </Table>

        </Box>
    )
}