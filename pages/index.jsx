import { Box, Button, Icon, Flex, FormControl, GridItem, Input, Spacer, Stack, useColorMode, Center, Text, Spinner, Heading, Link, Alert, AlertIcon, Thead, Table, TableCaption, Tr, Th, Tbody, Tfoot, Td, HStack, FormLabel, RadioGroup, Radio, FormHelperText } from '@chakra-ui/react'
import React from 'react';
import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../component/navbar.tsx'
import { AttachmentIcon, ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Prepocessing from '../component/prepocessing';
import TfIdf from '../component/tfidf';
import Best from '../component/best';
import Training from '../component/training';
import { MdDataUsage, MdAnalytics, MdFactCheck } from 'react-icons/md'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import { FaSortNumericUpAlt } from 'react-icons/fa'
import axios from 'axios';
import NextLink from "next/link"

export default function Home() {
  const [menu, setMenu] = useState('')
  const [menuHasil, setMenuHasil] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingUp, setLoadingUp] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const [alert, setAlert] = useState('')


  const [score, setScore] = useState([], [])
  const [model, setModel] = useState(false)
  const [confusion, setConfusion] = useState([[], []])
  const [kernel, setKernel] = useState('linear')
  const [c, setC] = useState('1')
  const [bestAcc, setBestAcc] = useState()
  const [prepocessing, setPrepocessing] = useState([''])
  const [file, setFile] = useState('')
  const [upload, setUpload] = useState('')
  const [tfidf, setTfidf] = useState('')
  const url = "https://oodapi.herokuapp.com/"


  // const
  const handleC = (val) => {
    if (val === '0.1') {
      setC(0.1)
    } else if (val === '1') {
      setC(1)
    } else {
      setC(10)
    }
  }
  const hendleUpload = () => {
    setLoadingUp(true)
    var formData = new FormData();
    formData.append("file", file);
    axios.post(url + 'upload', formData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(function (res) {
        console.log(res)
        if (res.data === 0) {
          setAlert('Upload gagal')
          setLoadingUp(false)
        }
        else {
          setUpload(res.data)
          setLoadingUp(false)
          setModel(false)
          setAlert('')
        }
      }).catch(function (e) {
        console.log(e)
        setLoadingUp(false)

      })
  }
  const handlePrepocessing = () => {
    setMenu('pre')
    setLoading(true)
    axios.post(url + "preprocessing")
      .then(function (res) {
        console.log(res.data)
        if (res.data === 0) {
          setAlert('preprocessing gagal')
          setLoading(false)
        } else {
          setPrepocessing(res.data.data)
          setLoading(false)
          setAlert('')
        }
      }).catch(function (e) {
        console.log(e)
        setLoading(false)
      })
  }
  const handleTfidf = () => {
    setMenu('tf')
    setLoading(true)
    axios.post(url + "tfidf")
      .then(function (res) {
        if (res.data === 0) {
          setAlert('TF-IDF gagal')
          setLoading(false)
        } else {
          setTfidf(res.data)
          setLoading(false)
          setAlert('')
        }
      }).catch(function (e) {
        console.log(e)
        setLoading(false)
      })
  }
  const handleBest = () => {
    setMenu('best')
    setLoading(true)
    axios.post(url + "best")
      .then(function (res) {
        if (res.data === 0) {
          setAlert('Best param gagal')
          setLoading(false)
        } else {
          console.log(res)
          setC(res.data.c)
          setKernel(res.data.kernel)
          setBestAcc(res.data.accurasy)
          setLoading(false)
          setAlert('')
        }
      }).catch(function (e) {
        console.log(e)
        setLoading(false)
      })
  }
  const handleTraining = () => {
    setLoading(true)
    axios.post(url + "training", {
      kernel: kernel,
      c: c,
    })
      .then(function (res) {
        if (res.data === 0) {
          setAlert('Training gagal')
          setLoading(false)
        } else {
          console.log(res)
          setConfusion(res.data.confusion)
          setScore(res.data.score)
          setLoading(false)
          setModel(true)
          setAlert('')
          setMenuHasil(true)
        }
      }).catch(function (e) {
        console.log(e)
        setLoading(false)
        setMenuHasil(false)
      })
  }

  return (
    <>
      <Head>
        <title>Klasifikasi</title>
      </Head>
      <Navbar />
      <Box width={{ base: '100%', sm: '100%', md: '80%' }} height='auto' mx='auto' borderRadius={10} pb={5} my={10} backgroundColor='teal' color='white'>
        <Flex>
          <Box >
            <Button onClick={toggleColorMode} backgroundColor='transparent' m={4}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Box>
          <Spacer />
          <Box>
            <Text fontWeight={'bold'} fontSize={'xl'} my={5}>Model</Text>
          </Box>
          <Spacer />
          <Box m={5}>
            {model ? <NextLink href={'/deteksi'} passHref>
              <Icon as={BsFillArrowRightSquareFill} w={8} h={8} />
            </NextLink>
              : null
            }

          </Box>
        </Flex>
        <FormControl width={{ base: '100%', sm: '80%', md: '50%' }} m="auto">
          <Flex>
            <Input
              p={1}
              id='file'
              type='file'
              name='file'
              // multiple
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Stack direction='row' spacing={4}>
              <Button
                color='white'
                isLoading={loadingUp ? true : false}
                loadingText='Upload'
                colorScheme='teal'
                bg={'teal.400'}
                variant='solid'
                onClick={hendleUpload}

              >
                Upload
              </Button>
            </Stack>
          </Flex>
          <Text fontSize={9} textAlign='left' color='teal.200'>Format csv dan tedapat dua kolom Kalimat dan Kelas dengan pembatas titik koma ( ; )</Text>
          {alert != '' ?
            <Alert status='error'>
              <AlertIcon />
              {alert}
            </Alert>
            :
            null
          }
        </FormControl>
        <Box width={{ base: '100%', sm: '95%', md: '80%' }} mx='auto' my={10}>

          <Box mx='auto' display={{ md: 'flex' }}>
            <Box w={40}
            >
              <Stack>
                <Icon as={MdDataUsage} w={20} h={20} m='auto' />
                <Button
                  h='auto'
                  py={2}
                  borderRadius={15}
                  color='white'
                  isDisabled={upload === '' ? true : false}
                  backgroundColor='teal.400'
                  colorScheme='teal'
                  value='pre'
                  fontSize={'sm'}
                  onClick={handlePrepocessing}
                >Preprocessing</Button>

              </Stack>
            </Box>

            <Spacer />
            <Box w={40}
            >

              <Stack>
                <Icon as={FaSortNumericUpAlt} w={12} h={12} mx='auto' my={4} />
                <Button
                  h='auto'
                  py={2}
                  borderRadius={15}
                  color='white'
                  isDisabled={prepocessing[0] === '' ? true : false}
                  backgroundColor='teal.400'
                  colorScheme='teal'
                  fontSize={'sm'}
                  onClick={handleTfidf}
                >TF-IDF</Button>

              </Stack>
            </Box>
            <Spacer />
            <Box w={40}

            >

              <Stack>
                <Icon as={MdFactCheck} w={20} h={20} m='auto' />

                <Button
                  h='auto'
                  py={2}
                  borderRadius={15}
                  color='white'
                  isDisabled={tfidf === '' ? true : false}
                  backgroundColor='teal.400'
                  colorScheme='teal'
                  fontSize={'sm'}
                  onClick={handleBest}
                >Best Params</Button>
              </Stack>
            </Box>

            <Spacer />
            <Box w={40}
            >

              <Stack>
                <Icon as={MdAnalytics} w={20} h={20} m='auto' />
                <Button
                  h='auto'
                  py={2}
                  borderRadius={15}
                  color='white'
                  isDisabled={c === '' ? true : false}
                  backgroundColor='teal.400'
                  colorScheme='teal'
                  onClick={() => setMenu('train')}
                  fontSize={'sm'}
                >Training & Peforma</Button>

              </Stack>
            </Box>


          </Box>
        </Box>
        <Box w="90%" mx='auto'>
          <GridItem colStart={4} colEnd={6} h='1' bg='papayawhip' mb={2} />
          {
            loading ?
              <Center>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='teal.400'
                  size='lg' />
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='teal.400'
                  size='lg' />
              </Center> :

              alert != '' ?
                null :
                menu === 'pre' ?
                  <Prepocessing
                    mentah1={prepocessing[0]}
                    mentah2={prepocessing[1]}
                    prepos1={prepocessing[2]}
                    prepos2={prepocessing[3]}
                  />
                  :
                  menu === 'tf' ?
                    <TfIdf
                      link={url + 'tfidf'}
                    />
                    :
                    menu === 'best' ?
                      <Best
                        kernel={kernel}
                        c={c}
                        acc={bestAcc}
                      />
                      :
                      null
          }

          {
            menu === 'train' ?
              <Center>
                <Box>
                  <Text fontWeight='bold' fontSize='xl' textAlign='center'>Training dan Peforma</Text>
                  <Box>
                    <FormControl as='code'>
                      <FormLabel as='code'>Silahkan pilih Kernel</FormLabel>
                      <RadioGroup defaultValue={kernel} onChange={(vel) => setKernel(vel)}>
                        <HStack spacing='24px'>
                          <Radio value='linear'>Linear</Radio>
                          <Radio value='rbf'>RBF</Radio>
                        </HStack>
                      </RadioGroup>
                    </FormControl>
                    <FormControl as='code'>
                      <FormLabel as='c'>Silahkan pilih Nilai C</FormLabel>
                      <RadioGroup defaultValue='0.1' onChange={(vel) => handleC(vel)}>
                        <HStack spacing='24px'>
                          <Radio value='0.1'>0.1</Radio>
                          <Radio value='1'>1</Radio>
                          <Radio value='10'>10</Radio>
                        </HStack>
                      </RadioGroup>
                    </FormControl>
                    <Button my={4} size='sm' colorScheme='red' onClick={handleTraining}>Train</Button>
                  </Box>
                  {menuHasil ?
                    <Training
                      kernel={kernel}
                      c={c}
                      score={score}
                      confusion={confusion}
                    />
                    : null
                  }

                </Box>
              </Center>
              : null
          }
        </Box>

      </Box>
    </>
  )
}
