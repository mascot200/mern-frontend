import React, {useState, useEffect} from 'react';
import useStyles from './styles'
import { TextField, Button, Typography, Paper, CircularProgress } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'


import { createPost, updatePost} from '../../actions/posts'


const Form = ({setPostId, postId}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setPostData] = useState( { title: '', message: '', tags: '',  selectedFile: '', });
    const post = useSelector((state) => postId ? state.posts.find((p) => p._id === postId) : null)
    const user = JSON.parse(localStorage.getItem('profile'))
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleSubmit = async (e) => {
       setIsLoading(true)
       e.preventDefault();
       if(postId === 0){
            dispatch(createPost({ ...postData, name: user?.result?.name}));
            clear()
       }else{
          dispatch(updatePost(postId, { ...postData, name: user?.result?.name}));
          clear()
       }
    
    }

    const clear = () => {
        setPostId(0)
        setPostData({ title: '', message: '', tags: '',  selectedFile: '', })
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }else{
        return (
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                     <Typography variant="h5">{postId ? 'Editing' : 'Creating'} a Memory</Typography>
                     
     
                     <TextField 
                         variant="outlined"
                         name="title"
                         label="Title"
                         fullWidth
                         value={postData.title}
                         onChange={(e) => setPostData({ ...postData, title: e.target.value})}
                         className={classes.textInput}
     
                     />
     
                     <TextField 
                         variant="outlined"
                         name="message"
                         label="Message"
                         fullWidth
                         value={postData.message}
                         className={classes.textInput}
                         onChange={(e) => setPostData({ ...postData, message: e.target.value})}
     
                     />
     
                     <TextField 
                         variant="outlined"
                         name="tags"
                         label="Tags"
                         fullWidth
                         value={postData.tags}
                         onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}
                         className={classes.textInput}
     
                     />
                     <div className={classes.fileInput}>
                         <FileBase
                             type="file"
                             multiple={false}
                             onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                         />
                     </div>
     
                     <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit {isLoading ?  <CircularProgress   /> : ""}   </Button>
                     <Button  variant="contained" color="secondary" size="large" onClick={clear}  fullWidth>Clear</Button>
                  
                </form>
            </Paper>
         );
    }

    
}

export default Form;