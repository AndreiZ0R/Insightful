import React, { useState } from "react";
import {
    Avatar,
    Card,
    CardHeader,
    IconButton,
    CardContent,
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, TextField, SxProps, InputAdornment
} from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {PRIMARY_COLOR, SECONDARY_COLOR} from "../../constants/theming.ts";
import {JobPost as JobPostType} from "../../models/response.ts";

type JobPostProps = {
    jobPost: JobPostType
}

const iconsSx: SxProps = {
    color: SECONDARY_COLOR
};
const buttonSx: SxProps = {
    color: PRIMARY_COLOR
};

export default function JobPost({jobPost}: JobPostProps) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [applicationData, setApplicationData] = useState({
        applicationId: '',  // Assuming this is generated or fetched from somewhere
        jobId: jobPost.jobPostingId.toString(),
        applicantUserId: '',  // Assuming this comes from user context or similar
        submissionDate: new Date().toISOString().split('T')[0],  // Current date
        status: 'pending',
        email: '',
        coverLetter: '',
        cv: null,  // For file upload
        lastName: undefined,
        location: undefined,
        firstName: undefined
    });

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setApplicationData({ ...applicationData, email: '', coverLetter: '', cv: null }); // Reset specific fields
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplicationData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setApplicationData({ ...applicationData, cv: e.target.files[0] });
    };

    const handleApply = () => {
        // Logic for applying to the job
        console.log("Applying to job:", jobPost.title);
        setOpen(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <>
            <Card sx={{maxWidth: 1000, m: 3, p: 7}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: 'secondary.main'}}>
                        </Avatar>
                    }
                    action={
                        <MoreVertIcon fontSize="large"/>
                    }
                    title={jobPost.title}
                    subheader={`Posted on: ${formatDate(jobPost.postedDate)}`}
                    titleTypographyProps={{variant: 'h6'}}></CardHeader>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {jobPost.description}
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 1}}>
                        <LocationOnIcon color="action" fontSize="large" sx={iconsSx}/>
                        <Typography variant="caption">{jobPost.location}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 1}}>
                        <AccessTimeIcon color="action" fontSize="large" sx={iconsSx} />
                        <Typography variant="caption">Deadline: {formatDate(jobPost.applicationDeadLine)}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 1}}>
                        <AccessTimeIcon color="action" fontSize="large" sx={iconsSx}/>
                        <Typography variant="caption">Accepted disability: {jobPost.acceptedDisability}</Typography>
                    </Box>
                    <Button variant="contained"  onClick={handleClickOpen} sx={{ mt: 2, backgroundColor: SECONDARY_COLOR,
                        borderColor: PRIMARY_COLOR,
                        '&:hover': {
                            borderColor: PRIMARY_COLOR
                        } }}>
                        Apply Job
                    </Button>
                </CardContent>
            </Card>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Apply for {jobPost.title}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="First Name"
                        type="text"
                        name="firstName"
                        fullWidth
                        value={applicationData.firstName}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon sx={iconsSx}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        name="lastName"
                        fullWidth
                        value={applicationData.lastName}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon sx={iconsSx}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Location"
                        type="text"
                        name="location"
                        fullWidth
                        value={applicationData.location}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOnIcon sx={iconsSx}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Email Address"
                        type="email"
                        name="email"
                        fullWidth
                        value={applicationData.email}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={iconsSx}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Cover Letter"
                        type="text"
                        name="coverLetter"
                        fullWidth
                        multiline
                        rows={4}
                        value={applicationData.coverLetter}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AssignmentIcon sx={iconsSx}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<DescriptionIcon sx={buttonSx}/>}
                        sx={{backgroundColor: PRIMARY_COLOR,
                            borderColor: PRIMARY_COLOR,
                            '&:hover': {
                                borderColor: PRIMARY_COLOR,
                                backgroundColor: SECONDARY_COLOR
                            }}}
                    >
                        Upload CV
                        <input
                            type="file"
                            hidden
                            accept=".pdf"
                            name="cv"
                            onChange={handleFileChange}
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{backgroundColor: PRIMARY_COLOR,
                        borderColor: PRIMARY_COLOR,
                        '&:hover': {
                            borderColor: PRIMARY_COLOR
                        }}}>Cancel</Button>
                    <Button onClick={handleApply} variant="outlined" sx={{backgroundColor: SECONDARY_COLOR,
                        borderColor: PRIMARY_COLOR,
                        '&:hover': {
                            borderColor: PRIMARY_COLOR
                        }}}>Apply</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}