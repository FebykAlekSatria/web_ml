import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Icon, Link, Spacer, Text, useColorMode } from "@chakra-ui/react"
import FormChat from "../component/formChat"
import Navbar from '../component/navbar.tsx'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import NextLink from "next/link"


export default function Predict() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box >
            <Navbar />
            <Box width={{ base: '100%', sm: '100%', md: '80%' }} height='auto' mx='auto' pb={10} borderRadius={10} backgroundColor='teal' color='white'>
                <Flex>
                    <Box >
                        <Button onClick={toggleColorMode} backgroundColor='transparent' m={4}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon
                            />}
                        </Button>
                    </Box>
                    <Spacer />
                    <Box>
                        <Text fontWeight={'bold'} fontSize={'xl'} my={5}>Deteksi Masukan</Text>
                    </Box>
                    <Spacer />
                    <Box m={5}>
                        <NextLink href={'/'}>
                            <Icon as={BsFillArrowLeftSquareFill} w={8} h={8} />
                        </NextLink>
                    </Box>
                </Flex>
                <FormChat />
            </Box>
        </Box>

    )
}