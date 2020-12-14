


export default function Comment(doc) {

    return (
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
                onChange={handleToggle}
                checked={doc.approved} 
                indeterminate={(doc.approved === undefined) ? true : false} 
            />
            </Stack>
        </Flex>
        </Grid>
    </Card>)
}