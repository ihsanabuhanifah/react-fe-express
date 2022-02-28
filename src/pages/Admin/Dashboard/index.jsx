import {useSelector}  from "react-redux"

export default function Dashboard() {
    const state = useSelector((state)=>state.auth)
    
    return (
        <div>
            Selemat Datang {state.nama}
        </div>
    )
}