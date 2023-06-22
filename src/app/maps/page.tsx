"use client"
import React, { useEffect, useState } from 'react';

const Page: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.permissions) {
                navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
                    if (permissionStatus.state === 'granted') {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                setLatitude(position.coords.latitude);
                                setLongitude(position.coords.longitude);
                            },
                            (error) => {
                                console.error('Error retrieving location:', error);
                                setError('Error retrieving location. Please try again.');
                            },
                            { enableHighAccuracy: true }
                        );
                    } else if (permissionStatus.state === 'prompt') {
                        setError('Please allow access to your location.');
                    } else if (permissionStatus.state === 'denied') {
                        setError('Access to location denied. Please enable it in your device settings.');
                    }
                });
            } else {
                console.error('Geolocation permissions API is not supported by this browser.');
            }
        };

        getLocation();
    }, []);

    return (
        <div>
            {latitude && longitude ? (
                <p>
                    Latitude: {latitude}, Longitude: {longitude}
                </p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Loading location...</p>
            )}
        </div>
    );
};

export default Page;
