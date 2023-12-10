import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {AccountCircle, Home} from '@mui/icons-material';
import {Link} from 'react-router-dom';

import logoTransparent from '../../assets/logo_transparent.svg';
import {BACKGROUND_DARK} from "../../constants/theming.ts";
import {JobPost as JobPostType} from "../../models/response.ts";

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
    const iconStyle = {
        fontSize: '2.5rem',
    };

    return (
        <AppBar position="static" sx={{
            backgroundColor: BACKGROUND_DARK,
            paddingLeft: '15%',
            paddingRight: '10%',
            maxHeight: '10vh', // Keep or adjust the maximum height of the navbar
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Typography variant="h4" sx={{ display: { xs: 'none', md: 'block' } }}>
                        Insightful
                    </Typography>
                    <div style={{ minWidth: '80px', minHeight: '80px', height: '100%', width: 'auto' }}>
                        {/* Increase minWidth and minHeight as needed */}
                        <img src={logoTransparent} alt="logo"
                             style={{ height: '100%', width: '100%', maxHeight: '15vh' }} />
                    </div>
                </Box>

                <Box style={{alignItems:'center', justifyContent:'center'}}>
                    <Button color="inherit" component={Link} to="/" style={{marginRight: '10vh', alignItems:'center', justifyContent:'center'}}>
                        <Home style={iconStyle}/>
                        Home
                    </Button>

                    <Button color="inherit" component={Link} to="/profile" style={{marginRight: '10vh', alignItems:'center', justifyContent:'center'}}>
                        <AccountCircle style={iconStyle}/>
                        Profile
                    </Button>

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
                </Box>
            </Toolbar>
        </AppBar>
    );
}