import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";

const CreateCollection = () => {
    const [collectionName, setCollectionName] = useState('');
    const [username, setUsername] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const navigate = useNavigate();
    const { token } = useToken();
    const baseUrl = process.env.REACT_APP_API_HOST

    useEffect(() => {
        if (token) {
            setAccessToken(token);
        }
    }, [token]);

    useEffect(() => {


        const fetchUsername = async () => {
            const tokenUrl = `${baseUrl}/token`;
            const response = await fetch(tokenUrl, { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setUsername(data.account.username);
            }
        };

        fetchUsername();
    }, []);


    const handleInputChange = (event) => {
        setCollectionName(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/user/${username}/collections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ collection_name: collectionName }),
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/createcollection');
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };

    return (
        <div>
            <br /><br /><br />
            <h2>Create a Collection</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Collection Name:
                </label>
                <input
                    type="text"
                    value={collectionName}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Collection</button>
            </form>
        </div>
    );
};

export default CreateCollection;
