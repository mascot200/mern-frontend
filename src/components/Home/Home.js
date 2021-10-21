import React, {useState, useEffect} from 'react'
import useStyles from './styles'
import {useDispatch } from 'react-redux'
import {  Grid, Grow, Container } from '@material-ui/core'


import Posts from '../../components/Posts/Posts'
import Form from '../../components/Form/Form'


import {getPosts, likePost} from '../../actions/posts'
import '../../index.css'

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postId, setPostId] = useState(0)
  
  
    useEffect(() => {
      dispatch(getPosts());
    }, [postId]);

    
    return (
        <Grow in>
        <Container>
          <Grid container justify="space-between" align="stretch">
              <Grid item xs={12} sm={7}>
                <Posts    setPostId={setPostId}/>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Form  postId={postId} setPostId={setPostId}/>
              </Grid>
          </Grid>
        </Container>
      </Grow>

    )
}

export default Home
