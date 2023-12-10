import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Queries } from "../../constants/constants.ts";
import {useJobs, useLoggedUser} from "../../hooks/useCustomQuery.ts";
import AppNavBar from "../../components/navbar/AppNavBar.tsx";
import JobPostComponent from "../../components/job-post/JobPost.tsx";
import {JobPost} from "../../models/response.ts"; // Renamed to avoid confusion with JobPost type

export default function HomePage() {
    const { data: user } = useLoggedUser();
    const navigate = useNavigate();
    const { data: jobs } = useJobs();

    useEffect(() => {
        const token = localStorage.getItem(Queries.TOKEN);
        if (token == null) navigate("/register");
    }, [navigate]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    const mockJobPosts: JobPost[] = [
        {
            jobPostingId: BigInt(3),
            userId: BigInt(103),
            title: "Product Manager",
            description: "Lead the planning, strategy, and development of new products.",
            requirements: "Experience in product lifecycle management, strong communication skills.",
            location: "Boston",
            jobType: "Full-time",
            postedDate: "2023-02-05",
            applicationDeadLine: "2023-04-05",
            acceptedDisability: "None specified"
        },
        {
            jobPostingId: BigInt(4),
            userId: BigInt(104),
            title: "UI/UX Designer",
            description: "Design intuitive and user-friendly interfaces for web and mobile applications.",
            requirements: "Proficient in design software, understanding of UX principles.",
            location: "Remote",
            jobType: "Contract",
            postedDate: "2023-01-20",
            applicationDeadLine: "2023-03-30",
            acceptedDisability: "None specified"
        },
        {
            jobPostingId: BigInt(5),
            userId: BigInt(105),
            title: "Cybersecurity Analyst",
            description: "Monitor and protect systems from cyber threats.",
            requirements: "Knowledge in information security, experience with security tools.",
            location: "Dallas",
            jobType: "Full-time",
            postedDate: "2023-02-15",
            applicationDeadLine: "2023-04-15",
            acceptedDisability: "None specified"
        },
        {
            jobPostingId: BigInt(6),
            userId: BigInt(106),
            title: "Technical Support Engineer",
            description: "Provide technical support and resolve customer IT issues.",
            requirements: "Strong problem-solving skills, knowledge of IT systems and networks.",
            location: "San Jose",
            jobType: "Part-time",
            postedDate: "2023-02-18",
            applicationDeadLine: "2023-05-01",
            acceptedDisability: "Full Blind"
        },
        {
            jobPostingId: BigInt(7),
            userId: BigInt(107),
            title: "Content Writer",
            description: "Develop written content for websites, blogs, and marketing materials.",
            requirements: "Excellent writing skills, experience in SEO and content marketing.",
            location: "Remote",
            jobType: "Freelance",
            postedDate: "2023-01-25",
            applicationDeadLine: "2023-04-25",
            acceptedDisability: "None specified"
        }

    ];

    return (
        <>
            <AppNavBar />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                gap: '10px'
            }}>
                {mockJobPosts?.map((jobPost, index) => (
                    <div style={{ maxWidth: '1000px', width: '100%' }}>
                        <JobPostComponent key={index} jobPost={jobPost} />
                    </div>
                ))}
            </div>
        </>
    );
}
