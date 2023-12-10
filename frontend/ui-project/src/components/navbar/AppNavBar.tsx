import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import {AccountCircle, Home} from '@mui/icons-material';
import {Link} from 'react-router-dom';

import logoTransparent from '../../assets/logo_transparent.svg';
import {BACKGROUND_DARK} from "../../constants/theming.ts";

// type NavbarProps = {
//     isRecruiter?: boolean
// }

export default function Navbar() {
    // const [searchQuery, setSearchQuery] = useState<string>('');

    // Function to navigate to the search results page
    // const redirectToSearch = () => {
    // };

    // Function to handle the search action
    // const handleSearch = (_: MouseEventHandler<HTMLAnchorElement>) => {
    //     // event.preventDefault();
    //     if (searchQuery.trim() !== '') {
    //         redirectToSearch();
    //     }
    // };

    // Function to handle Enter key press in the input field
    // const handleKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //         redirectToSearch();
    //     }
    // };

    return (
        <AppBar position="static" sx={{
            backgroundColor: BACKGROUND_DARK,
            paddingLeft: '15%',
            paddingRight: '10%',
            maxHeight: '8vh',
            alignCenter: 'center'
        }}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h4">
                        Insightful
                    </Typography>
                    <Typography variant="h6" component="div">
                        <div style={{maxWidth: '40%'}}>
                            <img src={logoTransparent} alt="logo"
                                 style={{height: '100%', width: '100%', marginTop: '20px'}}/>
                        </div>
                    </Typography>
                </Box>


                <div>
                    <Button color="inherit" component={Link} to="/" style={{marginRight: '10vh'}}>
                        <Home/>
                        Home
                    </Button>

                    <IconButton color="inherit" component={Link} to="/profile">
                        <AccountCircle/>
                    </IconButton>

                    {/*<Paper component="div" sx={{display: 'flex', alignItems: 'center'}}>*/}
                    {/*    <InputBase*/}
                    {/*        placeholder="Search Jobs"*/}
                    {/*        inputProps={{'aria-label': 'search jobs'}}*/}
                    {/*        value={searchQuery}*/}
                    {/*        onChange={(e) => setSearchQuery(e.target.value)}*/}
                    {/*        onClick={(e) => e.stopPropagation()}*/}
                    {/*        // Added to stop event propagation*/}
                    {/*        sx={{ml: 1, flex: 1}}*/}
                    {/*    />*/}
                    {/*    <IconButton type="button" onClick={() => {*/}
                    {/*        console.log("clicked");*/}
                    {/*    }} sx={{p: '10px'}}>*/}
                    {/*        <SearchIcon/>*/}
                    {/*    </IconButton>*/}
                    {/*</Paper>*/}
                </div>
            </Toolbar>
        </AppBar>
    );
}