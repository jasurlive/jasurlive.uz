import React, { useEffect, useState } from 'react';
import { firestore } from './add/firebase';
import { doc, setDoc, collection, onSnapshot, serverTimestamp, query, where } from 'firebase/firestore';
import { UAParser } from 'ua-parser-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './css/home.css';

function Online() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    useEffect(() => {
        let userId = localStorage.getItem('userId');

        if (!userId) {
            userId = `user-${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('userId', userId);
        }

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
            browser: uaResult.browser.name,
            os: uaResult.os.name,
            device: uaResult.device.model || 'Desktop',
            ip: '',
        };

        setDoc(userStatusDocRef, isOnlineForFirestore, { merge: true });

        const fetchIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                const ipAddress = data.ip;

                setDoc(userStatusDocRef, {
                    ...isOnlineForFirestore,
                    ip: ipAddress,
                }, { merge: true });
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };

        fetchIp();

        let activityTimeout;
        let inactivityTimeout;

        const startActivityTimeout = () => {
            if (activityTimeout) clearTimeout(activityTimeout);

            inactivityTimeout = setTimeout(() => {
                setDoc(userStatusDocRef, isOfflineForFirestore, { merge: true });
            }, 600000);
        };

        const handleUserActivity = () => {
            startActivityTimeout();
            setDoc(userStatusDocRef, isOnlineForFirestore, { merge: true });
        };

        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);

        startActivityTimeout();

        const userStatusCollectionRef = collection(firestore, 'status');
        const onlineUsersQuery = query(userStatusCollectionRef, where('state', '==', 'online'));

        const handleOnlineStatus = (snapshot) => {
            const users = snapshot.docs.map(doc => doc.data());
            const onlineUsersList = users.filter(user => user.state === 'online');
            setOnlineUsers(onlineUsersList);
            setLoading(false);
        };

        const unsubscribe = onSnapshot(onlineUsersQuery, handleOnlineStatus);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                setDoc(userStatusDocRef, isOfflineForFirestore, { merge: true });
            } else {
                setDoc(userStatusDocRef, isOnlineForFirestore, { merge: true });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        window.addEventListener('beforeunload', () => {
            setDoc(userStatusDocRef, isOfflineForFirestore, { merge: true });
        });

        return () => {
            clearTimeout(inactivityTimeout);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            unsubscribe();
            setDoc(userStatusDocRef, isOfflineForFirestore, { merge: true });
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
        };
    }, []);

    const toggleDetails = () => {
        setIsDetailVisible(!isDetailVisible);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className=".container-online-users">
            <h1>👥🟢 Online: {onlineUsers.length}</h1>
            <h5><button onClick={toggleDetails}>
                {isDetailVisible ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                )}
                {isDetailVisible ? ' Hide' : ' Show'}
            </button></h5>

            {isDetailVisible && (
                <ul>
                    {onlineUsers.map((user, index) => (
                        <li key={index}>
                            <p>Browser: {user.browser}</p>
                            <p>IP Address: {user.ip}</p>
                            <p>OS: {user.os}</p>
                            <p>Device: {user.device}</p>
                            <p>Last Changed: {user.last_changed ? new Date(user.last_changed.toDate()).toLocaleString() : 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Online;
