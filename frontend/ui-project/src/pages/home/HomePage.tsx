import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Queries} from "../../constants/constants.ts";
import {useAllJobs, useLoggedUser} from "../../hooks/useCustomQuery.ts";
import AppNavBar from "../../components/navbar/AppNavBar.tsx";
import JobPostComponent from "../../components/job-post/JobPost.tsx";

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
    }, [user]);

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
                        <JobPostComponent key={index} jobPost={jobPost}/>
                    </div>
                ))}
            </div>
        </>
    );
}
