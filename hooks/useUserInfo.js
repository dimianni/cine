import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";


export default function useUserInfo() {

    const { data: session, status: sessionStatus } = useSession();
    const [userInfo, setUserInfo] = useState(null);
    const [status, setStatus] = useState('loading');

    function getUserInfo() {
        if (sessionStatus === 'loading') {
            return;
        }
        if (sessionStatus === 'unauthenticated') {
            setStatus('unauthenticated');
            return;
        }
        fetch("/api/users?id=" + session.user.id)
            .then(res => res.json())
            .then(data => {
                setUserInfo(data.user)
                setStatus('authenticated');
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [sessionStatus])

    return { userInfo, setUserInfo, status }
}