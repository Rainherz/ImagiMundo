import { Toaster } from "@/shared/components/ui/sonner";
import AppRouter from "../router";

import "@/shared/styles/global.css";

export default function AppBuild(){
    return (
        <>
            <AppRouter/>
            <Toaster/>
        </>
    )
}