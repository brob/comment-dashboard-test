import React, {useEffect, useState} from 'react'
import CommentList from './CommentList'

import {Stack, Container, Inline, Box, Card, Text, Button, Flex, Grid, Heading, Spinner, Label, Switch} from '@sanity/ui'

import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'
import Preview from 'part:@sanity/base/preview'


import styles from './CommentTool.css'

export default function CommentTool() {



  // getDocInState = documentId => {
  //   // console.log(documentId)
  //   // return this.state.documents.filter(doc => doc._id === documentId)
  // }
  // updateApproved = (documentId, approved) => {
  //   // console.log(this.getDocInState(documentId))
  //   // console.log(approved)
  //   // this.getDocInState(documentId)[0].approved = approved
  //   // return this.getDocInState(documentId)[0]
  // }



  
    return (
      <Container width={3}>
        <Card margin={3} padding={5} className={styles.container}>
          <Heading marginBottom={1} size={5} as={"h1"}>Comment Moderation Dashboard</Heading>
          <p>This is a blank slate for you to build on.</p>
          <p>Tools are just React components!</p>
        </Card>
        
        <Grid autoCols={"auto"} columns={[1, 1, 1, 2]}>

          <Card column={'full'} margin={3} className={styles.container}>
            <Card marginBottom={1} paddingX={4} paddingTop={4} borderBottom={1} paddingBottom={0}>
              <Heading size={3} as={"h2"}>To Be Monderated</Heading>
              <p>Read through the comments and decide if they should go live.</p>
            </Card>
            <CommentList approvalStatus={undefined} />
          </Card> 

          <Card margin={3} className={styles.container}>
            <Card marginBottom={1} paddingX={4} paddingTop={4} borderBottom={1} paddingBottom={0}>
              <Heading size={3} as={"h2"}>Approved</Heading>
              <p>These are the good ones!</p>
            </Card>
            <CommentList approvalStatus={true} />
          </Card>

          <Card margin={3} className={styles.container}>
            <Card marginBottom={1} paddingX={4} paddingTop={4} borderBottom={1} paddingBottom={0}>
              <Heading size={3} as={"h2"}>Disapproved?</Heading>
              <p>These are the bad ones!</p>
            </Card>
            <CommentList approvalStatus={false} />

          </Card>
        </Grid>
      </Container>
    )
}