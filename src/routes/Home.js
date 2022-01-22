import { dbService  } from "fbase";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // const getNweets = async() => {
    //     const dbNweets = await getDocs(collection(dbService,"nweets"));
        
    //     //dbNweets.forEach((document) => console.log(document.data()));
        
    //     dbNweets.forEach((document) => {
    //         const nweetObject = { ...document.data(), id: document.id};
    //         setNweets((prev) => [nweetObject, ...prev])
        
    //     });
    // };

    useEffect(() => {
        //getNweets();
        const q = query(collection(dbService, 'nweets'), orderBy('createdAt', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            const newArray = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
                }
            });
            setNweets(newArray);
        });

    },[]);


    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
          });
        setNweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    };

    return (
        <>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="Nweet" />
        </form>
        <div>
            {nweets.map((nweet) => (
                // <div key={nweet.id}>
                //     <h4>{nweet.text}</h4> 
                // </div>
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
        </>
    );

};

export default Home;