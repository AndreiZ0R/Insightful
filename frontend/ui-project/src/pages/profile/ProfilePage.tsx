import {
    Typography,
    Box,
    Paper,
    Grid,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { useLoggedUser } from '../../hooks/useCustomQuery';
import Navbar from "../../components/Navbar/Navbar.tsx"; // Update the import path as needed

const PRIMARY_COLOR = '#C535EC';
const BACKGROUND_LIGHT = '#FAFAFA';
const TEXT_COLOR = '#333'; // Professional text color

export default function ProfilePage() {
    const { data: user } = useLoggedUser();

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateString ? new Date(dateString).toLocaleDateString(undefined, options) : '';
    };

    return (
        <>
            <Navbar />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'auto',
                minHeight: 'calc(100vh - 64px)',
                backgroundColor: BACKGROUND_LIGHT,
            }}>
                <Paper elevation={3} sx={{
                    width: '100%',
                    m: 0,
                    borderRadius: 0,
                    backgroundColor: BACKGROUND_LIGHT,
                    backdropFilter: 'blur(30px)',
                    padding: '10vh',
                }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center" textColor={TEXT_COLOR}>
                        <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                            <Avatar sx={{width: 120, height: 120, fontSize: '4rem', bgcolor: PRIMARY_COLOR}}>
                                {getInitials(user?.name)}
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h5" gutterBottom>{user?.name}</Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <EmailIcon color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText primary={user?.email}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PhoneIcon color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText primary={user?.phoneNumber}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CakeIcon color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText primary={formatDate(user?.birthDate)}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <WorkIcon color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText primary={user?.profile.currentTitle}/>
                                </ListItem>
                                {/* Add other details with icons as needed */}
                            </List>
                        </Grid>
                    </Grid>

                    <Divider sx={{my: 2}}/>

                    <Typography variant="h6" gutterBottom>Studies</Typography>
                    <List>
                        {user?.profile.studies.map((study) => (
                            <ListItem key={study.studyId.toString()}>
                                <ListItemIcon>
                                    <SchoolIcon color="primary"/>
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
                </Paper>
            </Box>
        </>
    );
}