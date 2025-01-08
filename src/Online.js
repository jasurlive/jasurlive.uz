import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';
import { doc, setDoc, collection, onSnapshot, serverTimestamp, query, where } from 'firebase/firestore';
import { UAParser } from 'ua-parser-js'; // Correct import statement
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

function Online() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Generate a unique identifier for the user
        const userId = uuidv4();
        const userStatusDocRef = doc(firestore, 'status', userId);

        const parser = new UAParser();
        const uaResult = parser.getResult();

        const isOfflineForFirestore = {
            state: 'offline',
            last_changed: serverTimestamp(),
        };

        const isOnlineForFirestore = {
            state: 'online',
            last_changed: serverTimestamp(),
            userAgent: navigator.userAgent,
            browser: uaResult.browser.name,
            os: uaResult.os.name,
            device: uaResult.device.model || 'Desktop',
        };

        console.log('Setting user status to online:', isOnlineForFirestore);
        setDoc(userStatusDocRef, isOnlineForFirestore)
            .then(() => console.log('User status set to online'))
            .catch((error) => console.error('Error setting user status:', error));

        // Update user status to online every minute
        const updateInterval = setInterval(() => {
            console.log('Updating user status to online:', isOnlineForFirestore);
            setDoc(userStatusDocRef, isOnlineForFirestore)
                .then(() => console.log('User status updated to online'))
                .catch((error) => console.error('Error updating user status:', error));
        }, 60000); // 1 minute

        // Mark user as offline after 10 minutes of inactivity
        const inactivityTimeout = setTimeout(() => {
            console.log('Setting user status to offline due to inactivity:', isOfflineForFirestore);
            setDoc(userStatusDocRef, isOfflineForFirestore)
                .then(() => console.log('User status set to offline due to inactivity'))
                .catch((error) => console.error('Error setting user status to offline:', error));
        }, 600000); // 10 minutes

        const handleOnlineStatus = (snapshot) => {
            const users = snapshot.docs.map(doc => doc.data());
            console.log('Users snapshot:', users);
            const onlineUsersList = users.filter(user => user.state === 'online');
            console.log('Online users:', onlineUsersList);
            setOnlineUsers(onlineUsersList);
            setLoading(false);
        };

        const userStatusCollectionRef = collection(firestore, 'status');
        const onlineUsersQuery = query(userStatusCollectionRef, where('state', '==', 'online'));
        const unsubscribe = onSnapshot(onlineUsersQuery, handleOnlineStatus);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                console.log('Setting user status to offline:', isOfflineForFirestore);
                setDoc(userStatusDocRef, isOfflineForFirestore)
                    .then(() => console.log('User status set to offline'))
                    .catch((error) => console.error('Error setting user status:', error));
            } else {
                console.log('Setting user status to online:', isOnlineForFirestore);
                setDoc(userStatusDocRef, isOnlineForFirestore)
                    .then(() => console.log('User status set to online'))
                    .catch((error) => console.error('Error setting user status:', error));
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        window.addEventListener('beforeunload', () => {
            console.log('Setting user status to offline before unload:', isOfflineForFirestore);
            setDoc(userStatusDocRef, isOfflineForFirestore)
                .then(() => console.log('User status set to offline before unload'))
                .catch((error) => console.error('Error setting user status:', error));
        });

        return () => {
            clearInterval(updateInterval);
            clearTimeout(inactivityTimeout);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            unsubscribe();
            setDoc(userStatusDocRef, isOfflineForFirestore)
                .then(() => console.log('User status removed'))
                .catch((error) => console.error('Error removing user status:', error));
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>On: {onlineUsers.length}</h1>
            <ul>
                {onlineUsers.map((user, index) => (
                    <li key={index}>
                        <p>User Agent: {user.userAgent}</p>
                        <p>Browser: {user.browser}</p>
                        <p>OS: {user.os}</p>
                        <p>Device: {user.device}</p>
                        <p>Last Changed: {user.last_changed ? new Date(user.last_changed.toDate()).toLocaleString() : 'N/A'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Online;
