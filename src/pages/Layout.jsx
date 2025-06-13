import { Outlet } from "react-router-dom";

export default function Layout(){
    return (
//        <navbar />
        <main>
            <Outlet />
        </main>
//        <footer />
    )
}