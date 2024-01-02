import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import reelistr_logo from './reelistr_logo.png';
import { Link } from "react-router-dom"
const baseUrl = process.env.REACT_APP_API_HOST

export default function CollectionList() {
    const [collections, setCollections] = useState([]);
    const [username, setUsername] = useState('');
    const { token } = useToken();

    useEffect(() => {
        if (token && username) {
            const fetchCollections = async () => {
                const collectionsUrl = `${baseUrl}/user/${username}/collections`;
                const response = await fetch(collectionsUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCollections(data);
                } else {
                    throw new Error("Failed to retrieve collections")
                }
            }
            fetchCollections();
        }
    }, [token, username])

    useEffect(() => {
        const fetchUsername = async () => {
            const tokenUrl = `${baseUrl}/token`;
            const response = await fetch(tokenUrl, { credentials: "include" });
            if (response.ok) {
                const data = await response.json();
                setUsername(data.account.username);
            }
        }
        fetchUsername();
    }, [])

    return (
        <>
            <div className="profile-container">
                <Container className="user-container">
                    <Row>
                        <Col>
                        </Col>
                        <Col xs={6}>
                            <h1>your reelistr collections</h1>
                            <Link to="/createcollection"><button>+ Add Collection</button></Link>
                            <button>+ Edit Collection</button>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className="p-4">
                <Row xs={1} md={3} lg={4} className="g-3 justify-content-md-center">
                    {collections.map((collection) => {
                        return (
                            <Col key={collection.collection_id} xs='4'>
                                <Card className="flex-fill custom-card">
                                    <Card.Header style={{ fontSize: '26px' }}>{collection.collection_name}</Card.Header>
                                    <a href={'/user/:username/collections' + collection.collection_id}>
                                        <Card.Img variant='top' src={reelistr_logo}
                                            alt={collection.collection_name} />
                                    </a>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    )
}
