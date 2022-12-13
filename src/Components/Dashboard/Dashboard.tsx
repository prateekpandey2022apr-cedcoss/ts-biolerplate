import { Text, Card, Page, Badge, Button } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import StorageWrapper from '../../Services/storageWrapper';

const Dashboad = () => {

    const navigate = useNavigate();

    const storage = new (StorageWrapper as any)();
    storage.setStorage(sessionStorage);

    console.log(storage.get("kk"));

    return (
        <Page>
            <Card title="Online store dashboard" sectioned>
                <p>View a summary of your online store's performance.</p>
                <p>Value: {storage.get("kk")}</p>
                <p>Session: {storage.get("session")}</p>
                <Button onClick={() => {
                    navigate("/");
                }} primary>Logout</Button>
            </Card>
        </Page>
    )
}

export default Dashboad;