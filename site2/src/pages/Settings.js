import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getDatabase, ref, child, set, get, onAuthStateChanged } from "firebase/database";
import '../firebase.js';
import { Link } from 'react-router-dom';

function Settings() {
    const [unlogged, setUnlogged] = useState(true);

    const [sex, setSex] = useState("M");
    const [weight, setWeight] = useState("");
    const [email, setEmail] = useState("");

    const [sex2, setSex2] = useState("");
    const [weight2, setWeight2] = useState("");
    const [email2, setEmail2] = useState("");

    const auth = getAuth();
    const db = getDatabase();
    const provider = new GoogleAuthProvider();
    let userId = 0;
    let readData = [];

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
                userId = auth.currentUser.uid;
                setUnlogged(false);

                readData = readUserData(userId);
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
            // Sign-out successful
            setUnlogged(true);
            setSex2("");
            setEmail2("");
            setWeight2("");
        }).catch((error) => {
            // An error happened.
        });
    }

    function readUserData(userId) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const vals = snapshot.val();
                setSex2(vals.sex);
                setEmail2(vals.email);
                setWeight2(vals.weight);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }

    function writeUserData(userId, ssex, wweight, eemail) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            sex: ssex,
            weight: wweight,
            email: eemail
        });
        readUserData(userId);

        
    }

    function updateId() {
        try { userId = auth.currentUser.uid; setUnlogged(false); }
        catch (e) { userId = 0; setUnlogged(true); }

        try { readUserData(userId); } catch (e) { console.log('sad') }
    }

    useEffect(() => updateId())

    return (
        <div>
            <h1>Settings:</h1>
            {unlogged
                ? <div> <button onClick={login}> Sign in</button> </div>
                : <div> <form>
                    <label>
                        Weight:
                        <input
                            type="text"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </label><br></br>
                    <label>
                        Emergency Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label><br></br>
                    <label>
                        Sex:
                        <select value={sex} onChange={(e) => setSex(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">N/A</option>
                        </select>
                    </label><br></br>
                </form> <button onClick={() => writeUserData(userId, sex, weight, email)}>Submit</button> <br></br><br></br>
                    <div>
                        <button onClick={logout} >Sign Out</button>
                    </div>
                </div>
            }
            <br></br>
            Your Settings:<br></br>
            Weight: {weight2}<br></br>
            Emergency Email: {email2}<br></br>
            Sex: {sex2} <br></br>
            <br></br>

            <Link to='../'> ← Back </Link>

        </div>
    )
}

export default Settings