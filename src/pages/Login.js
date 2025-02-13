"use client"

import { useState, useEffect } from "react"
import app from '../Conf/config'
import { getAuth } from "firebase/auth"
import { useRouter } from "next/router"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import Dashboard from "./Dashboard"



const Home = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);

            } else {
                setUser(null)
            }
        });
        return () => unsubscribe();
    }, [])

    const signInWithGoogle = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        try{
            await signInWithPopup(auth, provider);
            router.push("/dashboard")
        } catch(error) {
            console.error("Error signing in with google:" + error.message);
        }
    };

    return(
        <div className="flex flex-col items-center justify-content h-screen">
            {user ? (
                <Dashboard/>
            ) : (
                <button onClick={signInWithGoogle}
                className="bg-blue-500"
                >SIGN IN with google</button>
            )}
        </div>
    )
}

export default Home