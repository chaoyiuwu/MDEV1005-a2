import React from 'react';
import { Button, Fieldset, Field, Input, Label, Legend } from '@headlessui/react'
import { firebaseSignOut } from '../../firebase/AuthService';

const handleSignOut = () => {
    SignOut();
}
const SignOut = async () => {
    try {
        await firebaseSignOut();
    }
    catch (error) {

    }
} 

const Dashboard = () => {
    return (
        <div>
            <p>dashboard</p>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
};

export default Dashboard;