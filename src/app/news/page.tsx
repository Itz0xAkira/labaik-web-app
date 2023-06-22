"use client"
import React, { useEffect, useState } from 'react';

const Page: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    useEffect(() => {
        // Check if the geolocation API is supported by the browser
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Retrieve the latitude and longitude from the position object
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => {
                    console.error('Error retrieving location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <div>
            {latitude && longitude ? (
                <p>
                    Latitude: {latitude}, Longitude: {longitude}
                </p>
            ) : (
                <p>Loading location...</p>
            )}
        </div>
    );
};

export default Page;


