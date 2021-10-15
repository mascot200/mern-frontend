import React from 'react';
import useStyles from './styles'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import moment from 'moment'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const Post = ({post, setPostId }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
       <Card className={classes.card}>
           <CardMedia  className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">{post.name} ({moment(post.createdAt).fromNow()})</Typography>
            </div>

            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={() => setPostId(post._id)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>

            <CardContent>
               <Typography conponent="p" color="textSecondary" variant="body2">
                   {post.message }
                </Typography>
            </CardContent>

             <CardActions className={classes.cardActions}>
             <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
              <Likes />
             </Button>

                 <Button  size="small" color="default" onClick={() => dispatch(deletePost(post._id))}>
                     <DeleteIcon fontSize="small" />
                   
                 </Button>
            </CardActions>
       </Card>
    );
}

export default Post;