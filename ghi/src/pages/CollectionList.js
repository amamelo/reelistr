import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import reelistr_logo from './reelistr_logo.png';

export default function CollectionList() {
    // const [collectionName, setCollectionName] = useState('');
    const [collections, setCollections] = useState([]);
    const [username, setUsername] = useState('');
    const { token } = useToken();

    const fetchUsername = async () => {
        const tokenUrl = 'http://localhost:8000/token';
        const response = await fetch(tokenUrl, { credentials: "include" });
        if (response.ok) {
            const data = await response.json();
            setUsername(data.account.username);
        }
    }

    // const fetchCollections = async () => {
    //     const collectionsUrl = `http://localhost:8000/${username}/collections/`;
    //     const response = await fetch(collectionsUrl, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //     });
    //     if (response.ok) {
    //         const data = await response.json();
    //         setCollections(data);
    //         // setCollectionName(data)
    //         // console.log(data[1]['collection_name'])


    //         const collectionNames = data.map(collection => collection.collection_name);
    //         console.log(collectionNames)


    //     } else {
    //         throw new Error("Failed to retrieve collections")
    //     }

    // }

    useEffect(() => {
        if (token && username) {
            const fetchCollections = async () => {
                const collectionsUrl = `http://localhost:8000/${username}/collections/`;
                const response = await fetch(collectionsUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCollections(data);
                    const collectionNames = data.map(collection => collection.collection_name);
                    console.log(collectionNames)
                } else {
                    throw new Error("Failed to retrieve collections")
                }
            }
            fetchCollections();
        }
    }, [token, username])

    useEffect(() => {
        fetchUsername();
    }, [])

    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <div>
            <h1>Collection List</h1>
        </div>
        <Container className="p-4">
        <Row xs={1} md={3} lg={4} className="g-3 justify-content-md-center">
            {collections.map((collection) => {
                return (
                    <Col key={collection.id} xs='4'>
                        <Card style={{ width: '80%', height: '80%' }} className="flex-fill">
                            <Card.Header style={{ fontSize: '26px' }}>{collection.collection_name}</Card.Header>
                            <a href={'/user/' + collection.collection_id}>
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

