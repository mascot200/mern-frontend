import React from 'react';
import Post from './Post/Post'
import useStyles from './styles'
import {useSelector} from 'react-redux'
import {Grid, CircularProgress, Typography} from '@material-ui/core'

const  Posts = ({ setPostId }) => {
  const classes = useStyles()
  const {posts, isLoading} = useSelector((state) => state.posts)

  if(!posts.length && !isLoading) return "No post to load"
    return (
      isLoading  ?  <CircularProgress />: (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          { posts.map((post) => (
            <Grid key={post?._id} item xs={12} sm={6} md={4}>
              <Post post={post} setPostId={setPostId} />
            </Grid>
          )) }
        </Grid>
      )
    );
}

export default Posts;