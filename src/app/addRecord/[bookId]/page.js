'use client'

import { useEffect } from "react";
import AddRecord from "../../components/AddRecord"
import { useRouter } from "next/navigation"
export default function AddRecords({params}){
    const bookId = params.bookId;
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            router.push("/");
        } 
    }, [])
    return (
        <AddRecord bookId={bookId}></AddRecord>
    )
}