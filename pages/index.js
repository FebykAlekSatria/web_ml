import { Box, Button, Icon, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, GridItem, Input, Spacer, Stack, useColorMode, Center, Text, Spinner } from '@chakra-ui/react'
import React from 'react';
import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../component/navbar.tsx'
import { AttachmentIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Prepocessing from '../component/prepocessing';
import TfIdf from '../component/tfidf';
import Best from '../component/best';
import Peforma from '../component/peforma';
import { MdSettings, MdDataUsage, MdAnalytics, MdFactCheck } from 'react-icons/md'
import { FaSortNumericUpAlt } from 'react-icons/fa'
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState()
  const [menu, setMenu] = useState('')
  const [loading, setLoading] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()

  const [score, setScore] = useState([], [])
  const [mean, setMean] = useState([])
  const [confusion, setConfusion] = useState([[], []])
  const [kernel, setKernel] = useState()
  const [c, setC] = useState('')
  const [gamma, setGamma] = useState()
  const [prepocessing, setPrepocessing] = useState([''])
  const [file, setFile] = useState('')
  const [tfidf, setTfidf] = useState('')
  const url = "http://192.168.156.40:5000/"


  // const
  const hendleUpload = () => {

    let formdata = new FormData()
    formdata.append('file', file)

    // axios({
    //   headers: ('Access-Control-Allow-Origin', 'http://localhost:3000'),
    //   // headers.append('Access-Control-Allow-Credentials', 'true');
    //   url: "http://192.168.156.40:5000/upload",
    //   method: "POST",
    //   data: '"C:\Users\febyk\Postman\files\dataset_lengkap.csv"'
    // }).then((res) => {
    //   console.log(res)
    // })

    axios.post(url + "upload", { file: file }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    },
    )
      .then(function (res) {
        console.log(res)
      }).catch(function (e) {
        console.log(e)
      })
    console.log(formdata)
  }
  const handlePrepocessing = () => {
    setMenu('pre')
    setLoading(true)
    axios.post(url + "prepocessing")
      .then(function (res) {
        // console.log(res.data.)
        setPrepocessing(res.data.data)
        setLoading(false)
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
        console.log(res.data)
        setTfidf(res.data)
        setLoading(false)
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
        console.log(res)
        setC(res.data.c)
        setKernel(res.data.kernel)
        setGamma(res.data.gamma)
        setLoading(false)
      }).catch(function (e) {
        console.log(e)
        setLoading(false)
      })
  }
  const handleTraining = () => {
    setMenu('train')
    setLoading(true)
    axios.post(url + "training", {
      kernel: kernel,
      c: c,
      gamma: gamma
    })
      .then(function (res) {
        console.log(res.data)
        setConfusion(res.data.confusion)
        setScore(res.data.score)
        setMean(res.data.means)
        setLoading(false)
      }).catch(function (e) {
        console.log(e)
        setLoading(false)
      })
  }

  return (
    <>
      <Head>
        <title>Klasifikasi</title>
      </Head>
      <Navbar />
      <Box width={{ base: '100%', sm: '100%', md: '80%' }} height='auto' mx='auto' borderRadius={10} pb={5} my={10} backgroundColor='teal' color='white'>
        <Button onClick={toggleColorMode} backgroundColor='transparent'>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <FormControl width={{ base: '100%', sm: '80%', md: '50%' }} m="auto">
          <Flex>
            <Input
              p={1}
              id='file'
              type='file'
              // multiple
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={(e) => setFile(e.target.value)}
            />
            <Stack direction='row' spacing={4}>
              <Button
                color='white'
                isLoading={false}
                loadingText='Upload'
                colorScheme='red'
                variant='solid'
                onClick={hendleUpload}

              >
                Upload
              </Button>
            </Stack>
          </Flex>
          <Text fontSize='xs' textAlign='left' color='teal.200'>Format csv dan tedapat dua kolom Kalimat dan Kelas dengan pembatas titik koma ( ; )</Text>

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
                  isDisabled={file === '' ? true : false}
                  backgroundColor='teal.400'
                  colorScheme='teal'
                  value='pre'
                  onClick={handlePrepocessing}
                >Prepocessing</Button>

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
                  onClick={handleTraining}
                >Training & Peforma</Button>

              </Stack>
            </Box>


          </Box>
        </Box>
        <Box w="90%" mx='auto'>
          <GridItem colStart={4} colEnd={6} h='1' bg='papayawhip' mb={2} />
          {loading ?
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
            </Center>

            :
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
                    gamma={gamma}
                  />
                  :
                  menu === 'train' ?
                    <Center>
                      <Box>
                        <Text fontWeight='bold' fontSize='xl' textAlign='center'>Training dan Peforma</Text>
                        <Box borderWidth={2} borderRadius={20} borderColor='white' my={2} p={2}>
                          <Text fontWeight='bold' fontSize='lg'>Persamaan :</Text>
                          <Text>Accurasy = (TP+TN) / (TP+FP+FN+TN)</Text>
                          <Text>Precision = (TP) / (TP + FP) </Text>
                          <Text>Recall = TP / (TP + FN)</Text>
                          <Text>F1 = (2 * Recall * Precision) / (Recall + Precision)</Text>
                        </Box>
                        <Flex wrap='wrap'>
                          {
                            score.map((data, index) => {
                              return (
                                <Peforma
                                  key={index}
                                  tn={confusion[index][0]}
                                  fp={confusion[index][1]}
                                  fn={confusion[index][2]}
                                  tp={confusion[index][3]}
                                  index={data[0]}
                                  acc={data[1]}
                                  pre={data[2]}
                                  rec={data[3]}
                                  f1={data[4]}
                                  time={data[5]}
                                />
                              )
                            })
                          }


                        </Flex>
                        <Box m={4} >
                          <Text fontSize='md'>Accurasy : {mean[1]}</Text>
                          <Text fontSize='md'>Presisi : {mean[2]}</Text>
                          <Text fontSize='md'>Recall :{mean[3]}</Text>
                          <Text fontSize='md'>F1 : {mean[4]}</Text>
                          <Text fontSize='md'>Time : {mean[5]}</Text>
                        </Box>
                      </Box>
                    </Center>
                    : null
          }

        </Box>
      </Box>
    </>
  )
}
