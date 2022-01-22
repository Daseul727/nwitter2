import { dbService, storageService  } from "fbase";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    
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

        let attachmentUrl = "";
        if (attachment !== ""){
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        

        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        });
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        //console.log(event.target.files);
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
            //console.log(finishedEvent);
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        }
        
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => setAttachment("");

    return (
        <>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
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