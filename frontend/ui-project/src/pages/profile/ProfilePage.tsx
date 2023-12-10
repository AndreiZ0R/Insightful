import {useLoggedUser} from "../../hooks/useCustomQuery.ts";

export default function ProfilePage() {
    // const {profileId} = useParams();
    // useEffect(() => {
    //     console.log(profileId)
    // }, [profileId]);

    const {data: user} = useLoggedUser();

    return (
        <>
            <div>Name: {user?.name}</div>
        </>
    )
}