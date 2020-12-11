import React from 'react'
import {Stack, Container, Inline, Box, Card, Text, Button, Flex, Grid, Heading, Spinner, Label, Switch} from '@sanity/ui'

import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'
import Preview from 'part:@sanity/base/preview'


import styles from './CommentTool.css'




class CommentTool extends React.Component {
  state = {}
  observables = {}


  handleReceiveList = documents => {
    this.setState({documents})
  }

  handleReceiveDocument = document => {
    this.setState({document})
  }
  updateApproved = (documentId, approved) => {

  }

  handleToggle = event => {
    const target = event.target;
    const newValue = target.value ? target.checked=false : target.checked = true;
    console.log(newValue)
    const stateDocument = this.state.documents.filter(doc => doc._id == target.name)
    const updatedDoc = this.updateApproved()
    console.log(stateDocument)
  }

  componentWillMount() {
    // Fetch 50 last updated, published documents
    this.observables.approvedList = client.observable
      .fetch(`*[_type == "comment"]{
        ...,
        post->{
        title
       }
       }`)
      .subscribe(this.handleReceiveList)
  }

  renderCommentList(approvalStatus) {
    const {documents} = this.state
    if (!documents) return <Spinner />
    const filteredDocs = documents.filter(doc => {
      return doc.approved === approvalStatus
    })
    return(
      <Stack as={'ul'}>
        {filteredDocs.map(doc => (
          <Card borderBottom as={'li'} padding={4}>
            <Grid columns={5} justify={'space-between'} align={'center'}>
              <Box column={4}>
                <Stack flex={1} space={3}>
                  <Text size={2}>{doc.comment}</Text>
                  <Text muted size={1}>By: {doc.name} - Post: {doc.post?.title}</Text> 
                </Stack>
              </Box>
              <Flex justify={'center'} align={'center'}>
                <Stack space={3}>
                  <Label>Approved?</Label>
                  <Switch 
                    name={doc._id}
                    onChange={this.handleToggle}
                    checked={this.state[doc._id] = approvalStatus} 
                    indeterminate={(approvalStatus === undefined) ? true : false} 
                  />
                </Stack>
              </Flex>
            </Grid>
          </Card>
        ))}
      </Stack>
    )
  }

  render() {
    return (
      <Container width={3}>
        <Card margin={3} padding={5} className={styles.container}>
          <Heading marginBottom={1} size={5} as={"h1"}>Comment Moderation Dashboard</Heading>
          <p>This is a blank slate for you to build on.</p>
          <p>Tools are just React components!</p>
        </Card>
        
        <Grid autoCols={"auto"} columns={[1, 1, 1, 2]}>

          <Card column={'full'} margin={3} className={styles.container}>
            <Box padding={4}>
              <Heading size={3} as={"h2"}>To Be Monderated</Heading>
              <p>Read through the comments and decide if they should go live.</p>
            </Box>
            {this.renderCommentList(undefined)}
          </Card> 

          <Card margin={3} className={styles.container}>
            <Box marginBottom={1} paddingX={4} paddingTop={4} paddingBottom={0}>
              <Heading size={3} as={"h2"}>Approved</Heading>
              <p>These are the good ones!</p>
            </Box>
            {this.renderCommentList(true)}
          </Card>

          <Card margin={3} className={styles.container}>
            <Box padding={4}>
              <Heading size={3} as={"h2"}>Disapproved?</Heading>
              <p>These are the bad ones!</p>
            </Box>
            {this.renderCommentList(false)}

          </Card>
        </Grid>
      </Container>
    )
  }
}

export default CommentTool
