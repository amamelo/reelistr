import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";
const baseUrl = process.env.REACT_APP_API_HOST

const CreateCollection = () => {
    const [collectionName, setCollectionName] = useState('');
    const [username, setUsername] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const navigate = useNavigate();
    const { token } = useToken();

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
                navigate(`/user/${username}/collections`);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <div div className="offset-3 col-6">
                <form className="signup-form" onSubmit={handleFormSubmit}>
                    <h2>Create a Collection</h2>
                    <div className="mb-3"></div>
                    <label className="form-label">
                        Collection Name:
                        <input
                            type="text"
                            value={collectionName}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </label>
                    <div>
                        <button type="submit">Create Collection</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCollection;
