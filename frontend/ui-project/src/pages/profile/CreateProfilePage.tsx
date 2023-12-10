import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Divider, Grid, SxProps, TextField} from '@mui/material';
import {ExperienceCreate, ProfileCreate, Registration, StudyCreate, UserLoggedIn} from '../../models/response';
import {useRegister, useStoredUser} from "../../hooks/useCustomQuery.ts";
import {useNavigate} from 'react-router-dom';


const tfSxProps: SxProps = {
    marginTop: "5px",
    marginBottom: "5px",
    borderRadius: "15px"
}

const StudySection = (
    {
        study,
        onStudyChange,
    }: {
        study: StudyCreate;
        onStudyChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
    }) => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
                fullWidth
                label="Study Start Date"
                name="startDate"
                value={study.startDate}
                onChange={(e) => onStudyChange(e, 0)} // Assuming only one study for simplicity
                sx={tfSxProps}
            />
            <TextField
                fullWidth
                label="Study End Date"
                name="endDate"
                value={study.endDate}
                onChange={(e) => onStudyChange(e, 0)} // Assuming only one study for simplicity
                sx={tfSxProps}
            />
            <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={study.degree}
                onChange={(e) => onStudyChange(e, 0)} // Assuming only one study for simplicity
                sx={tfSxProps}
            />
            <TextField
                fullWidth
                label="Study Location"
                name="studyLocation"
                value={study.studyLocation}
                onChange={(e) => onStudyChange(e, 0)} // Assuming only one study for simplicity
                sx={tfSxProps}
            />
        </Grid>
    </Grid>
);

const ExperienceSection = (
    {
        experience,
        onExperienceChange,
        onSkillChange,
        addSkill,
        experienceIndex,
    }: {
        experience: ExperienceCreate;
        onExperienceChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
        onSkillChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, expIndex: number, skillIndex: number) => void;
        addSkill: (experienceIndex: number) => void; // Define addSkill here
        experienceIndex: number;
    }) => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
                fullWidth
                label="Experience Start Date"
                name="startDate"
                value={experience.startDate}
                onChange={(e) => onExperienceChange(e, experienceIndex)}
                sx={tfSxProps}
            />
            <TextField
                fullWidth
                label="Experience End Date"
                name="endDate"
                value={experience.endDate}
                onChange={(e) => onExperienceChange(e, experienceIndex)}
                sx={tfSxProps}
            />
            <TextField
                fullWidth
                label="Company"
                name="company"
                value={experience.company}
                onChange={(e) => onExperienceChange(e, experienceIndex)}
                sx={tfSxProps}
            />
            <TextField
                fullWidth
                label="Position"
                name="position"
                value={experience.position}
                onChange={(e) => onExperienceChange(e, experienceIndex)}
                sx={tfSxProps}
            />
            {experience.skills.map((skill, skillIndex) => (
                <>
                    <h4>Skill no. {skillIndex + 1}</h4>
                    <TextField
                        key={skillIndex}
                        fullWidth
                        label={`Skill ${skillIndex + 1}`}
                        value={skill.skillName}
                        onChange={(e) => onSkillChange(e, experienceIndex, skillIndex)}
                        sx={tfSxProps}
                    />
                </>

            ))}
            <Button variant="outlined" onClick={() => addSkill(experienceIndex)} sx={{mt: 1, mb: 1}}>
                Add Skill
            </Button>
        </Grid>
    </Grid>
);

export default function CreateProfilePage() {
    const navigate = useNavigate();
    const {data: user} = useStoredUser();
    const registerUserProfile = useRegister();
    const [profile, setProfile] = useState<ProfileCreate>({
        currentTitle: '',
        currentWorkplace: '',
        description: '',
        experiences: [],
        studies: []
    });

    useEffect(() => {
        if (user === undefined) navigate("/register");
    }, [user, navigate]);

    const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({...profile, [e.target.name]: e.target.value});
    };

    const handleExperienceChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const updatedExperiences = [...profile.experiences];
        updatedExperiences[index] = {...updatedExperiences[index], [e.target.name]: e.target.value};
        setProfile({...profile, experiences: updatedExperiences});
    };

    const handleSkillChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, expIndex: number, skillIndex: number) => {
        const updatedExperiences = [...profile.experiences];
        const updatedSkills = updatedExperiences[expIndex].skills;
        updatedSkills[skillIndex] = {skillName: e.target.value};
        updatedExperiences[expIndex] = {...updatedExperiences[expIndex], skills: updatedSkills};
        setProfile({...profile, experiences: updatedExperiences});
    };

    const addExperience = () => {
        setProfile({
            ...profile,
            experiences: [...profile.experiences, {startDate: '', endDate: '', company: '', position: '', skills: []}],
        });
    };

    const addSkill = (experienceIndex: number) => { // Define addSkill here
        const updatedExperiences = [...profile.experiences];
        updatedExperiences[experienceIndex].skills.push({skillName: ''});
        setProfile({...profile, experiences: updatedExperiences});
    };

    const handleStudyChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const updatedStudies = [...profile.studies];
        updatedStudies[index] = {...updatedStudies[index], [e.target.name]: e.target.value};
        setProfile({...profile, studies: updatedStudies});
    };

    const addStudy = () => {
        setProfile({
            ...profile,
            studies: [...profile.studies, {startDate: '', endDate: '', degree: '', studyLocation: ''}],
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user !== undefined) {
            const registration: Registration = {
                ...user,
                profile: profile
            }
            console.log(registration);

            registerUserProfile.mutate(registration, {
                onSuccess: (data: UserLoggedIn) => {
                    console.log(data);
                    // navigate("/profile");
                    navigate("/");
                }
            })
        }
    };


    return (
        <Card sx={{minWidth: 275, margin: 'auto', mt: 3, p: 2}}>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} sx={{margin: 2}}>
                    <h1>General Info</h1>
                    <TextField
                        fullWidth
                        label="Current Title"
                        name="currentTitle"
                        value={profile.currentTitle}
                        onChange={handleProfileChange}
                        sx={tfSxProps}
                    />
                    <TextField
                        fullWidth
                        label="Current Workplace"
                        name="currentWorkplace"
                        value={profile.currentWorkplace}
                        onChange={handleProfileChange}
                        sx={tfSxProps}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={profile.description}
                        multiline
                        rows={4}
                        onChange={handleProfileChange}
                        sx={tfSxProps}
                    />
                    <Divider sx={{my: 2}}/>
                    {profile.experiences.length != 0 ? <h1>Experience</h1> : <></>}
                    {profile.experiences.map((experience, index) => (
                        <>
                            <h3>#{index + 1}</h3>
                            <ExperienceSection
                                key={index}
                                experience={experience}
                                onExperienceChange={handleExperienceChange}
                                onSkillChange={handleSkillChange}
                                addSkill={addSkill}
                                experienceIndex={index}
                            />
                        </>

                    ))}
                    {profile.studies.length != 0 ? <h1>Studies</h1> : <></>}
                    {profile.studies.map((study, index) => (
                        <>
                            <h3>#{index + 1}</h3>
                            <StudySection
                                key={index}
                                study={study}
                                onStudyChange={handleStudyChange}
                            />
                        </>
                    ))}


                    <Button variant="contained" onClick={addExperience} sx={{mt: 2}}>
                        Add Experience
                    </Button>
                    <Button variant="contained" onClick={addStudy} sx={{mt: 2}}>
                        Add Study
                    </Button>
                    <Button type="submit" variant="contained" sx={{mt: 2}}>
                        Submit
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}