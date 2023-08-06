import { setUser, clearUser } from "@/redux/actions/authActions";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function UserInfo({ children }) {

    const { data: session, status: sessionStatus } = useSession();
    const dispatch = useDispatch();

    function getUserInfo() {
        if (sessionStatus === 'loading') {
            dispatch(setUser({ status: "loading", user: null }));
            return;
        }
        if (sessionStatus === 'unauthenticated') {
            dispatch(clearUser());
            return;
        }
        fetch("/api/users?id=" + session.user.id)
            .then(res => res.json())
            .then(data => {
                dispatch(setUser({ status: "authenticated", user: data.user }));
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [sessionStatus, dispatch])

    return (
        <>
            {children}
        </>
    )
}