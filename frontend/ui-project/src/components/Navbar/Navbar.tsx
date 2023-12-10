import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase, Paper } from '@mui/material';
import { AccountCircle, Home, Search as SearchIcon } from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';

import logoTransparent from '../../assets/logo_transparent.svg';

function Navbar({ isRecruiter }) {
    const BACKGROUND_DARK = '#242424';
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState('');

    // Function to navigate to the search results page
    const redirectToSearch = () => {
        history.push(`/search-results?query=${searchQuery}`);
    };

    // Function to handle the search action
    const handleSearch = (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            redirectToSearch();
        }
    };

    // Function to handle Enter key press in the input field
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            redirectToSearch();
        }
    };

    return (
        <AppBar position="static" sx={{
            backgroundColor: BACKGROUND_DARK,
            paddingLeft: '15%',
            paddingRight: '10%',
            maxHeight: '8vh',
            alignCenter: 'center'
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    <div style={{ maxWidth: '40%' }}>
                        <img src={logoTransparent} alt="logo"
                             style={{ height: 'auto', width: '100%', marginTop: '20px' }} />
                    </div>
                </Typography>

                <div>
                    <Button color="inherit" component={Link} to="/" style={{ marginRight: '10vh' }}>
                        <Home />
                        Home
                    </Button>

                    <IconButton color="inherit" component={Link} to="/profile">
                        <AccountCircle />
                    </IconButton>

                    <Paper component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        <InputBase
                            placeholder="Search Jobs"
                            inputProps={{ 'aria-label': 'search jobs' }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onClick={(e) => e.stopPropagation()} // Added to stop event propagation
                            sx={{ ml: 1, flex: 1 }}
                        />
                        <IconButton type="button" onClick={handleSearch} sx={{ p: '10px' }}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
