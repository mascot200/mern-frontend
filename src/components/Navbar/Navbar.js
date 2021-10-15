import React, {useState, useEffect } from 'react';
import {AppBar, Typography, Button,Avatar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import useStyles from './styles'


const  Navbar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const  [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const classes = useStyles()

    console.log(user)

    const logout = () => {
      dispatch({type: "LOGOUT"})
      history.push('/')
      setUser(null)
    }

    useEffect(() => {
      const token = user?.token
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])



    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
        <Typography className={classes.userName} variant="h6">Memory</Typography>
        </Link>
        <Toolbar className={classes.toolbar}>
          {user?.result ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.firstName.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
    
    );
}

export default Navbar;