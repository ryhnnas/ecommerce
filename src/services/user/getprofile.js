import { getUser } from "../../pages/dashboard";

export default async function fetchProfile(
    setName,
    setUsername,
    setEmail,
) {
    try {
        const profileData = await getUser();
        setName(profileData.name)
        setUsername(profileData.username)
        setEmail(profileData.email)
    } catch (err) {
        console.error("INI ERROR" + err)
    }
}