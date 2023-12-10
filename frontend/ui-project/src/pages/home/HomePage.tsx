import {useAllJobs, useLoggedUser} from "../../hooks/useCustomQuery";
import {useNavigate} from "react-router-dom";
import {Queries} from "../../constants/constants.ts";
import React, {useEffect} from "react";
import AppNavBar from "../../components/navbar/AppNavBar.tsx";
import JobPost from "../../components/job-post/JobPost.tsx";


export default function HomePage() {
    const {data: user} = useLoggedUser();
    const navigate = useNavigate();
    const {data: jobs} = useAllJobs();

    useEffect(() => {
        const token = localStorage.getItem(Queries.TOKEN);
        if (token == null) navigate("/register");
    }, [navigate]);

    useEffect(() => {
        console.log(user);
        console.log(jobs)
    }, [user, jobs, navigate]);

    return (
        <>
            <AppNavBar/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                gap: '10px'
            }}>
                {jobs?.map((jobPost, index) => (
                    <div style={{maxWidth: '1000px', width: '100%'}}>
                        <JobPost key={index} jobPost={jobPost}/>
                    </div>
                ))}
            </div>
        </>
    );
}
