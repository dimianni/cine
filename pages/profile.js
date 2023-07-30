import useUserInfo from "@/hooks/useUserInfo"

export default function Profile(){

    const { userInfo } = useUserInfo()

    return (
        <div>
            <h1>{userInfo ? userInfo.name : "Loading..."}</h1>
        </div>
    )
}