
import { useParams } from "react-router";
import { UserDisplay } from "../components/UserDisplay";

export const UserPage = () => {
    const { username } = useParams<{ username: string }>();
    
    if (!username) {
        return (
            <div className="text-center text-red-500 py-8">
                <p>Invalid user profile URL</p>
            </div>
        );
    }

    return (
        <div className="pt-1">
            <UserDisplay username={decodeURIComponent(username)} />
        </div>
    );
};