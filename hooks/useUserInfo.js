import { setUser, clearUser } from "@/redux/actions/authActions";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


export default function useUserInfo() {

    const { data: session, status: sessionStatus } = useSession();
    const [userInfo, setUserInfo] = useState(null);
    const [status, setStatus] = useState('loading');

    const dispatch = useDispatch();

    function getUserInfo() {
        if (sessionStatus === 'loading') {
            setStatus('loading');
            return;
        }
        if (sessionStatus === 'unauthenticated') {
            setStatus('unauthenticated');
            dispatch(clearUser());
            return;
        }
        fetch("/api/users?id=" + session.user.id)
            .then(res => res.json())
            .then(data => {
                setUserInfo(data.user)
                setStatus('authenticated');
                dispatch(setUser(data.user)); 
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [sessionStatus, dispatch])

    return { userInfo, setUserInfo, status }
}