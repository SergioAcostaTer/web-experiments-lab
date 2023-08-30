import locate, { Location } from "@/services/location"
import { useEffect, useState } from "react"


export default function useLocation(){
    const [location, setLocation] = useState<Location>()

    useEffect(()=>{
        locate().then((data) => setLocation(data))
    },[])

    useEffect(() => {
        console.log(location)
    },[location])


    return location
}