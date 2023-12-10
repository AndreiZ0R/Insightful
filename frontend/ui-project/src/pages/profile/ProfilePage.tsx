import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    SxProps,
    Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import {useLoggedUser} from '../../hooks/useCustomQuery';
import Navbar from "../../components/navbar/AppNavBar.tsx";
import {BACKGROUND_DARK, BACKGROUND_LIGHT, PRIMARY_COLOR} from '../../constants/theming.ts';
import React, {useEffect} from "react";
import {getCv} from "../../api/api.ts";

export default function ProfilePage() {
    const {data: user} = useLoggedUser();

    useEffect(() => {
        console.log(user);
    }, [user]);

    const getInitials = (name: string | undefined) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
    };

    const formatDate = (dateString: string | undefined) => {
        // const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return dateString ? new Date(dateString).toLocaleDateString() : '';
    };

    const iconsSx: SxProps = {
        color: PRIMARY_COLOR
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Set to full viewport height
                backgroundColor: BACKGROUND_LIGHT,
            }}>
                <Navbar/>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    overflow: 'auto',
                    flexGrow: 1,
                }}>
                    <Paper elevation={3} sx={{
                        width: '100%',
                        margin: 0,
                        borderRadius: 0,
                        backgroundColor: BACKGROUND_LIGHT,
                        backdropFilter: 'blur(30px)',
                        padding: '5vh',
                        boxSizing: 'border-box',
                    }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                                <Avatar sx={{
                                    width: 120,
                                    height: 120,
                                    fontSize: '4rem',
                                    background: 'radial-gradient(circle, rgba(54,220,154,1) 29%, rgba(197,53,236,1) 100%)'
                                }}>
                                    {getInitials(user?.name)}
                                </Avatar>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography variant="h5" gutterBottom>{user?.name}</Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <EmailIcon sx={iconsSx}/>
                                        </ListItemIcon>
                                        <ListItemText primary={user?.email}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PhoneIcon sx={iconsSx}/>
                                        </ListItemIcon>
                                        <ListItemText primary={user?.phoneNumber}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CakeIcon sx={iconsSx}/>
                                        </ListItemIcon>
                                        <ListItemText primary={formatDate(user?.birthDate)}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <WorkIcon sx={iconsSx}/>
                                        </ListItemIcon>
                                        <ListItemText primary={user?.profile.currentTitle}/>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>

                        <Divider sx={{my: 2}}/>

                        <Typography variant="h6" gutterBottom>Studies</Typography>
                        <List>
                            {user?.profile.studies.map((study) => (
                                <ListItem key={study.studyId.toString()}>
                                    <ListItemIcon>
                                        <SchoolIcon sx={iconsSx}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={study.degree}
                                        secondary={`${formatDate(study.startDate)} - ${formatDate(study.endDate)}, ${study.studyLocation}`}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Divider sx={{my: 2}}/>

                        <Typography variant="h6" gutterBottom>Experiences</Typography>
                        <List>
                            {user?.profile.experiences.map((exp) => (
                                <ListItem key={exp.experienceId.toString()}>
                                    <ListItemText
                                        primary={`${exp.company}, ${exp.position}`}
                                        secondary={`${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`}
                                    />
                                    <Typography variant="body2" sx={{mt: 1}}>
                                        Skills: {exp.skills.map((skill) => skill.skillName).join(', ')}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>

                        {/*todo: fa sa mearga pdf*/}
                        <Button variant="outlined" onClick={() => {
                            console.log("Sending cv request");
                            getCv(user?.);
                        }} sx={{
                            mt: 2,
                            color: PRIMARY_COLOR,
                            borderColor: PRIMARY_COLOR,
                            '&:hover': {
                                borderColor: PRIMARY_COLOR
                            }
                        }}>
                            See CV
                        </Button>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}