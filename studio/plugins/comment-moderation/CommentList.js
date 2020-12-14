import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from './CommentTool'
import {Stack, Box, Card, Text, Flex, Grid, Spinner, Label, Switch} from '@sanity/ui'

import client from 'part:@sanity/base/client'

export default function CommentList({ approvalStatus }) {
    const {state, dispatch} = useContext(AppContext);

    const [commentToolData, setCommentTool] = useState([])
    const [reloadData, setReloadData] = useState(false)
    useEffect(() => {
        client.fetch((`*[_type == "comment"]{
            ...,
            post->{
                title
            }
         }`)).then(data =>  setCommentTool(data)) 
    }, [reloadData, state.resetData])
    
    function updateApproval(documentId) { 
        const status = commentToolData.filter(doc => documentId === doc._id)[0].approved
        let newStatus = (status === undefined) ? true : !status

        return client.patch(documentId)
                .set({"approved": newStatus})
                .commit()
                .then(result => {
                    dispatch({ type: 'UPDATE_DATA', data: !approvalStatus})
                    state.resetData == approvalStatus
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
    }

    async function handleToggle(event) {
        return await updateApproval(event.target.name)
    }
    

    if (!commentToolData || commentToolData.length === 0) return <Spinner />
    
    const filteredDocs = commentToolData.filter(doc => {
      return doc.approved === approvalStatus
    })

    return(
      <Stack as={'ul'}>
        {filteredDocs.map(doc => (
          <Card key={doc._id} borderBottom as={'li'} padding={4}>
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
                    onChange={handleToggle}
                    checked={doc.approved} 
                    indeterminate={(doc.approved === undefined) ? true : false} 
                  />
                </Stack>
              </Flex>
            </Grid>
          </Card>
        ))}
      </Stack>
    )
  }
  