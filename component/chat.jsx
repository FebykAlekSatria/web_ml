import { Box, Flex, Tag, Text } from "@chakra-ui/react";

export default function Chat(props) {
    return (
        <Box>
            <Flex
                justifyContent="flex-end"
            >
                <Flex
                    pr={2}
                    py={2}
                    pl={4}
                    borderRadius={12}
                    boxShadow="0 2px 2px #0f0f0f0f"
                    bg={"teal"}
                    // ml={isMine ? "auto" : undefined}
                    // mr={isMine ? undefined : "auto"}
                    justifyContent="flex-end"
                // maxWidth={700}
                >
                    <Text fontSize={15} maxWidth={400}>
                        {props.message}
                    </Text>
                    <Flex
                        pl={4}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Text fontSize={10} maxWidth={400}>
                            User
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Box my={4} >
                <Tag
                    pr={4}
                    py={2}
                    pl={2}
                    variant="subtle"
                    mb={2}
                    bg={"blackAlpha.400"}
                    color="white"
                >
                    Kalimat terdeteksi {props.res}
                </Tag>
            </Box>

        </Box>
    )
}