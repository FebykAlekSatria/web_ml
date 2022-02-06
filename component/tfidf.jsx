import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Text, Center, Box, Link } from "@chakra-ui/react";

export default function TfIdf(props) {
    return (
        <Center>
            <Box>
                <Text fontWeight='bold' fontSize='xl' textAlign='center'>Tf-Idf</Text>
                <Text>
                    Klik jika anda ingin mendownload {' '}
                    <Link color='teal.900' href={props.link} isExternal>
                        TF-IDF.CSV <ExternalLinkIcon mx='2px' />
                    </Link>
                </Text>
            </Box>
        </Center>
    )
}