import { Alert, AlertIcon, Box, Button, Flex, FormControl, Icon, Input, Link, Stack } from "@chakra-ui/react";
import Chat from "./chat";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { ExternalLinkIcon } from "@chakra-ui/icons";
const url = "http://127.0.0.1:5000/"


export default function FormChat() {
    const [stack, setStack] = useState([])
    const [quest, setQuest] = useState()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState('')
    const handleSubmit = () => {
        setLoading(true)
        axios.post(url, {
            text: quest
        }).then(function (res) {
            console.log(res)
            if (res.data === 0) {
                setAlert('Predict Gagal Harap melakukan ')
                setLoading(false)
            }
            else {
                const _stack = [...stack];
                _stack.push({ 'predict': res.data.predict, "pertanyaan": res.data.pertanyaan })
                setStack(_stack)
                setLoading(false)
            }
        }).catch(function (e) {
            console.log(e)
            setLoading(false)

        })
    }
    return (
        <Box>
            <Box my={2} p={2} width='50%' m='auto' h='96' backgroundColor='teal.900' overflowY="auto" borderTopRadius={10}>
                {alert === '' ? (
                    stack.map((items, i) => {
                        return (
                            <Chat
                                key={i}
                                message={items.pertanyaan}
                                res={items.predict}
                            />
                        )
                    })
                ) : null
                }
            </Box>

            <FormControl width={{ base: '100%', sm: '80%', md: '50%' }} m="auto">
                {alert != '' ?
                    <Alert status='error'>
                        <AlertIcon />
                        {alert}<Link color='teal.900' href='/'>
                            training <ExternalLinkIcon mx='2px' />
                        </Link>
                    </Alert>
                    :
                    null
                }
                <Flex>
                    <Input
                        p={1}
                        type='text'
                        bg={"blackAlpha.400"}
                        onChange={(e) => setQuest(e.target.value)}
                    />
                    <Stack direction='row' spacing={4}>
                        <Button
                            color='white'
                            isLoading={loading}
                            loadingText='Upload'
                            colorScheme='teal'
                            backgroundColor={'teal.400'}
                            variant='solid'
                            onClick={handleSubmit}

                        >
                            <Icon as={IoSend} />
                        </Button>
                    </Stack>
                </Flex>
            </FormControl>
        </Box>
    )
}