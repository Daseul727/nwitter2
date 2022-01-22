import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, orderBy, getDocs} from "firebase/firestore";
import Nweet from "components/Nweet";


const Profile = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const navigate = useNavigate();
    
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const getMyNweets = async () => {

        // const nweets = collection(dbService, 'nweets').where("creatorO=Id","===","userObj.uid");
        // let allTodos = await getDocs(nweets);
        
        // const nweets = await getDoc(collection,"nweets")
        //         .where("creatorId","===",userObj.uid)
        //         .orderBy("createdAt","asc").data();


        // const citiesRef = collection(dbService, "nweets");
        // const q = query(citiesRef, where("creatorId", "==", userObj.uid));
        
        // const querySnapshot = await getDocs(q);
 
        //const nweetArray = querySnapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data());
        // });
        //setNweets(nweetArray);

        const q = query(collection(dbService, 'nweets'),where("creatorId", "==", userObj.uid), orderBy('createdAt', 'asc'));
        onSnapshot(q, (querySnapshot) => {
            const newArray = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
                }
            });
            setNweets(newArray);
        });
}

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
        <div>
            {nweets.map((nweet) => (
                // <div key={nweet.id}>
                //     <h4>{nweet.text}</h4> 
                // </div>
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
        </>
    );

};

export default Profile;
