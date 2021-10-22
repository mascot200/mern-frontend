import React, {useState, useEffect} from 'react'
import useStyles from './styles'
import {useDispatch } from 'react-redux'
import {  Grid, Grow, Container, Paper, AppBar, TextField, Button} from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'


import Posts from '../../components/Posts/Posts'
import Form from '../../components/Form/Form'
import Pagination from '../Pagination'




import {getPosts, likePost, getPostsBySearch} from '../../actions/posts'
import '../../index.css'

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postId, setPostId] = useState(0)
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState([])

    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        // if enter key is pressed search
      }
    }

    const searchPost = () => {
        if(search.trim()){
          dispatch(getPostsBySearch({search}))
          history.push(`/posts/search?searchQuery=${search || 'none'}`)
        }else{
          history.push('/')
        }
    }
  
  
    useEffect(() => {
      dispatch(getPosts());
    }, [postId, dispatch]);

    
    return (
        <Grow in>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6} md={7}>
                <Posts    setPostId={setPostId}/>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                  <TextField
                    name="search"
                    variant="outlined"
                    label="Search memories"
                    fullWidth
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">Search</Button>
                </AppBar>
                <Form  postId={postId} setPostId={setPostId}/>
                <Paper elevation={6}>
                  <Pagination />
              </Paper>
              </Grid>
             
          </Grid>
        </Container>
      </Grow>

    )
}

export default Home
