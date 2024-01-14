import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getDatabase, ref, child, set, get } from "firebase/database";
import '../firebase.js';

const Settings = () => {

    const auth = getAuth();
    const db = getDatabase();
    const provider = new GoogleAuthProvider();
    

    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(error.message);
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });

    }
    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    function writeUserData(userId, ssex, wweight, rrate) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            sex: ssex,
            weight: wweight,
            rate: rrate
        });
    }

    function readUserData(userId) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const userId = auth.currentUser.uid;
    const clc = writeUserData(userId, '2', 2, 2);
    const rlr = readUserData(userId);

    return (
        <>
            <main >
                <section>
                    <div>
                        <div>
                            <button
                                onClick={login}
                            >
                                Login
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>

                        <div>
                            <button
                                onClick={() => writeUserData(userId, '2', 2, 2)}
                            >
                                pew
                            </button>
                        </div>

                        <div>
                            <button
                                onClick={() => readUserData(userId)}
                            >
                                aaa
                            </button>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Settings