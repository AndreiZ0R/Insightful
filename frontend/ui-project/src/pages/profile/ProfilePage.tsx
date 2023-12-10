import {useStoredUser} from "../../hooks/useCustomQuery.ts";

export default function ProfilePage() {
    // const {profileId} = useParams();
    // useEffect(() => {
    //     console.log(profileId)
    // }, [profileId]);

    const {data: user} = useStoredUser();

    return (
        <>
            <div>Name: {user?.name}</div>
        </>
    )
}