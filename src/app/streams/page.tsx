"use client"
import React from 'react';
import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';
import { i18n } from '@/config/translations.config';

interface CardItem {
    id: number;
    title: string;
    imageUrl: string;
    url: string;
}

const cards: CardItem[] = [
    {
        id: 1,
        title: i18n.t("Stream.makkah"),
        imageUrl: 'https://hotelmedia.crs.haj.gov.sa/Haj.Nusuk/img/3_Banner.jpeg',
        url: 'https://www.youtube.com/watch?v=qK-zm6rcYmA',
    },
    {
        id: 2,
        title: i18n.t("Stream.maddenh"),
        imageUrl: 'https://iili.io/H6SMgGn.md.jpg',
        url: 'https://www.youtube.com/watch?v=AYj2iUokADA',
    },
    {
        id: 3,
        title: i18n.t("title.maddinaRadio"),
        imageUrl: 'https://iili.io/H6SMgGn.md.jpg',
        url: 'https://www.youtube.com/watch?v=gUC3TjCrwRw',
    },
    {
        id: 3,
        title: i18n.t("title.quranRadio"),
        imageUrl: 'https://hotelmedia.crs.haj.gov.sa/Haj.Nusuk/img/3_Banner.jpeg',
        url: 'https://www.youtube.com/watch?v=pPi07uTbZXQ',
    },
    // Add more card objects as needed
];

const Page: React.FC = () => {
    const handleCardClick = (url: string) => {
        window.open(url, '_blank');
        // Or you can use any other method to handle the click event
    };

    return (
        <ScrollPanel className="card-list-container" style={{ overflow: "auto", width: '100%', height: '100vh' }}>
            <div className="card-list">
                {cards.map((card) => (
                    <div key={card.id} className="card-item">
                        <Card className="card h-[20vh] rounded-xl" style={{ margin: "2vh" }} onClick={() => handleCardClick(card.url)}>
                            <div
                                className="card-image"
                                style={{ backgroundImage: `url(${card.imageUrl})`, backgroundSize: 'cover' }}
                            ></div>
                            <div className="card-content">
                                <h2>{card.title}</h2>
                            </div>
                        </Card>
                    </div>
                ))
                }
            </div >
        </ScrollPanel >
    );
};

export default Page;
