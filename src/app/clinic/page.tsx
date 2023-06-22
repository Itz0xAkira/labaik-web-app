"use client"
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ActionButton, ServiceButton } from '@/components/ServiceButton/ServiceButton';
import { mailcIcon, PhoneIcon, MsgIcon } from '@/config/icons';
import { i18n } from '@/config/translations.config';
import emailjs from '@emailjs/browser';
import { Dialog } from 'primereact/dialog';

const Page: React.FC = () => {

    const [inputValue, setInputValue] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleWhatsApp = () => {
        const url = `https://wa.me/${phoneNumber}`;
        window.open(url, '_blank');
    };

    const phoneNumber = '+966580080933';

    const handleCall = () => {
        window.open(`tel:${phoneNumber}`);
    };


    const handleTextChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        setShowConfirmation(true);
    };

    const hideConfirmation = () => {
        setShowConfirmation(false);
    };

    const sendEmail = () => {
        emailjs.send("service_09qioyx", "template_jj86w0q", {
            from_name: "Clinic-Test",
            message: inputValue,
        }, "H4fSOwXz72vNi8xpN")
            .then((result) => {
                console.log(result.text);
                handleSubmit()
            }, (error) => {
                console.log(error.text);
                handleSubmit()
            });
        handleSubmit()
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <InputText placeholder="Enter text" onChange={handleTextChange} value={inputValue} style={{ width: "80vw", height: "30vh", marginTop: "5vh", backgroundColor: "#FAEED9", color: "black" }} />

            <div className="overflow-x-auto flex flex-row gap-2 justify-center flex-wrap  w-full max-w-full h-[40vh] md:h-[38vh] p-2" style={{ marginTop: "2vh" }}>
                <ActionButton
                    label={i18n.t("actions.sendmail")}
                    icon={mailcIcon}
                    onClick={sendEmail}
                />
                <ActionButton
                    label={i18n.t("actions.callus")}
                    icon={PhoneIcon}
                    onClick={handleCall}
                />
                <Dialog
                    visible={showConfirmation}
                    onHide={hideConfirmation}
                    header="Submission Confirmation"
                    footer={<Button label="OK" onClick={hideConfirmation} />}
                >
                    <div>
                        <p>Submitted successfully!</p>
                    </div>
                </Dialog>
                <ActionButton
                    label={"WhatsApp"}
                    icon={MsgIcon}
                    onClick={handleWhatsApp}
                />
            </div>
        </div>
    );
};

export default Page;
