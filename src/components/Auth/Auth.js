import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LoupeOutlined'
import { GoogleLogin } from 'react-google-login' 
import Icon from './icon'
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'

import useStyles from './styles'
import Input from './Input'

import { signIn, signUp } from '../../actions/auth'


const initialData = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const history = useHistory()
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialData)
    const dispatch = useDispatch()

    const handleChange = (e) => { 
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => { 
        e.preventDefault()
        if(isSignUp){
            dispatch(signUp(formData, history))
        }else{
            dispatch(signIn(formData, history))
        }
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)

    }
  

    const googleSuccess = async(res) => {
      const result = res?.profileObj;
      const token = res?.tokenId; //
        try {
            dispatch({type: "START_LOADING"})
            dispatch({ type: "AUTH", data: { result, token } });
            history.push('/')
            dispatch({type: "END_LOADING"})
        } catch (error) {
            console.error(error)
        }
    }
    const googleFailure = async(error) => {
        console.log(error)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus  half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} autoFocus  />
                        { isSignUp &&  <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"  />}
                    </Grid>
                    
                     <Button type="submit" fullWidth variant="contained" color="primary" className={classes.form}>
                         {isSignUp ? "Sign Up" : "Sign In"}
                     </Button>

                     <GoogleLogin
                        clientId="477162869160-pugp5e6n1ff8c2nklkg1pdf53l70jpfa.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                 className={classes.googleButton} 
                                 color="default"
                                 fullWidth onClick={renderProps.onClick} 
                                 disabled={renderProps.disabled} 
                                 startIcon={ < Icon />} variant="contained">
                                  Google Sign in
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                     <Grid  container justify="center">
                         <Grid item>
                            <Typography variant="body2" onClick={switchMode}>
                                { isSignUp ? "Already have an account?, Sign in" : "Don't have an account? Create a free account"}
                            </Typography>
                         </Grid>
                     </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
