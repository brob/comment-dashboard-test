import React, { useReducer } from 'react'
import CommentList from './CommentList'

import { Container, Card, Grid, Heading } from '@sanity/ui'
import styles from './CommentTool.css'

export const AppContext = React.createContext();

const initialState = {
  resetData: ""
};

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_DATA':
            console.log('action data', action.data)
            return {
                resetData: action.data
            };

        default:
            return initialState;
    }
}

export default function CommentTool() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Container width={3}>
      <Card margin={3} padding={5} className={styles.container}>
        <Heading marginBottom={1} size={5} as={"h1"}>Comment Moderation Dashboard</Heading>
        <p>Moderate your comments here. Each box shows the latest 5 from each group.</p>
      </Card>
      <AppContext.Provider value={{ state, dispatch }}>

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
      </AppContext.Provider>

    </Container>
  )
}