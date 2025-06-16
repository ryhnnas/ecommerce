import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- KUMPULAN IKON SVG ---
const PencilIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>);
const CameraIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" /><path d="M7 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" /></svg>);
const BoxIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1.5 1.5 0 0 1-.629 1.28l-7.129 2.852a.5.5 0 0 1-.372 0L.63 13.442A1.5 1.5 0 0 1 0 12.162V3.5a.5.5 0 0 1 .314-.464L7.443.184z" /></svg>);
const CheckIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022z" /></svg>);
const UploadIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" /><path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" /></svg>);
const TrashIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg>);
const SuccessIllustration = (props) => (<svg {...props} viewBox="0 0 64 64"><path d="M51.9 48.4c-1.2-1.2-1.8-2.6-1.8-4.2s.6-3 1.8-4.2c2.4-2.4 2.4-6.4 0-8.8l-3.3-3.3c-.6-.6-1.3-.9-2.1-1.1s-1.6-.1-2.4.2c-1.3.4-2.5 1.2-3.4 2.2l-3.7 4c-.7.7-1.5 1.1-2.5 1.3s-2 .2-2.9-.2c-1.7-.6-3-2-3.6-3.7-.4-1-.4-2.1 0-3.1.5-1.1 1.3-2.1 2.3-2.8l2-1.7c2.4-2 3.1-5.3 1.7-8.1-1.4-2.8-4.7-4.2-7.8-3.3l-3.4 1c-1.3.4-2.5 1.2-3.4 2.2-2.4 2.4-2.4 6.4 0 8.8l3.3 3.3c.6.6 1.3.9 2.1 1.1s1.6.1 2.4-.2c1.3-.4 2.5-1.2 3.4-2.2l3.7-4c.7-.7 1.5-1.1 2.5-1.3s2-.2 2.9.2c1.7.6 3 2 3.6 3.7.4 1 .4 2.1 0 3.1-.5 1.1-1.3 2.1-2.3 2.8l-2 1.7c-2.4 2-3.1 5.3-1.7 8.1 1.4 2.8 4.7 4.2 7.8 3.3l.7-.2zM19 41.3c-.6-1.2-1-2.6-1-4.1 0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.5-.4 2.9-1 4.1-1.4 2.8-4.7 4.2-7.8 3.3-2.6-.7-4.6-2.8-5.2-5.3z" fill="#E6E6E6" /><path d="M48.8 19.5c-1.3 0-2.3-1-2.3-2.3v-4.5c0-1.3-1-2.3-2.3-2.3s-2.3 1-2.3 2.3v4.5c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3V8.3c0-1.3-1-2.3-2.3-2.3s-2.3 1-2.3 2.3v11.1c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3V14c0-1.3-1-2.3-2.3-2.3s-2.3 1-2.3 2.3v5.5c0 4.1 1.9 7.8 4.8 10.1l-2 1.7c-2.4 2-3.1 5.3-1.7 8.1 1.4 2.8 4.7 4.2 7.8 3.3l2.2-.6c1.3.4 2.6.6 4 .6 4.4 0 8.4-2.2 10.8-5.8 2.1-3.2 1.5-7.4-1.5-9.9l-3.3-3.3c-.3-.3-.7-.4-1-.4z" fill="#007BFF" /><path d="M37.5 41c.2 0 .4 0 .6-.1 2.9-.8 4.6-3.8 3.8-6.7s-3.8-4.6-6.7-3.8c-2.9.8-4.6 3.8-3.8 6.7.7 2.4 2.9 4 5.1 4z" fill="#C2DFFF" /><path d="M25.9 5.8c-1.3 0-2.3-1-2.3-2.3S24.6 1.2 25.9 1.2c1.3 0 2.3 1 2.3 2.3s-1.1 2.3-2.3 2.3z" fill="#0052CC" /><path d="M47.5 59.9H18.3c-2.1 0-3.8-1.7-3.8-3.8V12.1c0-2.1 1.7-3.8 3.8-3.8h29.2c2.1 0 3.8 1.7 3.8 3.8v43.9c0 2.1-1.7 3.9-3.8 3.9z" fill="#FFFFFF" /><path d="M42.3 20.3H23.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h18.8c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" fill="#C2DFFF" /><path d="m28.6 28.5-4.8 4.8c-.3.3-.7.4-1.1.4s-.8-.1-1.1-.4c-.6-.6-.6-1.5 0-2.1l4.8-4.8c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1z" fill="#007BFF" /><path d="M39.6 28.5H29.1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h10.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" fill="#B3B3B3" /><path d="M42.3 43.1H23.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h18.8c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" fill="#C2DFFF" /><path d="m28.6 51.3-4.8 4.8c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l4.8-4.8c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.1z" fill="#007BFF" /><path d="M39.6 51.3H29.1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h10.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" fill="#B3B3B3" /></svg>);

// --- KONSTANTA DATA ---
const deliveryServices = [
    { name: 'Self pickup', logo: 'https://img.icons8.com/pastel-glyph/64/4a90e2/box--v1.png' },
    { name: 'Kurir A', logo: 'https://img.icons8.com/pastel-glyph/64/4a90e2/box--v1.png' },
    { name: 'Kurir B', logo: 'https://img.icons8.com/pastel-glyph/64/4a90e2/box--v1.png' },
    { name: 'Kurir C', logo: 'https://img.icons8.com/pastel-glyph/64/4a90e2/box--v1.png' },
    { name: 'Kurir D', logo: 'https://img.icons8.com/pastel-glyph/64/4a90e2/box--v1.png' },
    { name: 'Kurir E', logo: 'https://img.icons8.com/pastel-glyph/64/4a90e2/box--v1.png' },
    { name: 'Kurir F', logo: 'https://img.icons8.com/pastel-glyph/64/4a90e2/box--v1.png' },
    { name: 'Kurir G', logo: 'https://img.icons8.com/pastel-glyph/64/4a90e2/box--v1.png' },
];

// --- OBJEK STYLES ---
const styles = {
    // Layout & Page
    page: { backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
    main: { maxWidth: '900px', margin: '0 auto', padding: '0 2rem' },
    header: { backgroundColor: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e9ecef' },
    headerTitle: { fontSize: '1.5rem', fontWeight: 'bold', color: '#0C5AA2' },
    headerActions: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
    userProfile: { display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' },
    userAvatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' },

    // Card
    card: { backgroundColor: 'white', borderRadius: '16px', padding: '2rem', marginTop: '1rem', border: '1px solid #e9ecef' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' },

    // Form
    formGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' },
    formGroup: { marginBottom: '1.5rem' },
    label: { display: 'block', fontWeight: '500', color: '#495057', marginBottom: '0.5rem' },
    input: { width: '100%', padding: '0.75rem 1rem', border: '1px solid #ced4da', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' },
    inputMuted: { backgroundColor: '#f8f9fa' },
    inputError: { borderColor: 'lightgrey', borderWidth: '2px' },
    textarea: { width: '100%', padding: '0.75rem 1rem', border: '1px solid #ced4da', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box', minHeight: '150px', resize: 'vertical' },
    charCounter: { fontSize: '0.75rem', color: '#6c757d', textAlign: 'right', marginTop: '0.25rem' },
    dimensionGroup: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' },
    dimensionLabel: { display: 'block', fontSize: '0.800rem', fontWeight: '400', color: '#6c757d', marginBottom: '0.25rem' },

    // Buttons
    buttonContainer: { display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', gap: '1rem' },
    button: { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', transition: 'opacity 0.2s' },
    buttonNext: { backgroundColor: '#0C5AA2', color: 'white' },
    buttonBack: { backgroundColor: '#e9ecef', color: '#495057' },

    // Stepper
    stepperContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '2rem 0 3rem 0' },
    stepNode: { display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#adb5bd', },
    stepIcon: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #e9ecef', backgroundColor: 'white', color: '#adb5bd', transition: 'all 0.3s ease' },
    stepLine: { height: '2px', width: '80px', backgroundColor: '#e9ecef', transition: 'background-color 0.3s ease' },
    stepText: { marginTop: '0.5rem', fontSize: '14px', fontWeight: '500' },

    // Photo Step
    photoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' },
    uploadBox: { border: '2px dashed #ced4da', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem', aspectRatio: '1/1', cursor: 'pointer', color: '#495057' },
    photoThumbnail: { position: 'relative', borderRadius: '8px', aspectRatio: '1/1', overflow: 'hidden' },
    photoImg: { width: '100%', height: '100%', objectFit: 'cover' },
    photoOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '8px', fontSize: '12px' },
    deleteButton: { position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.8)', color: '#dc3545', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    progressBar: { position: 'absolute', bottom: '0', left: 0, height: '4px', backgroundColor: '#007bff' },

    // Delivery Step
    deliveryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    deliveryOption: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '2px solid #ced4da', borderRadius: '8px', cursor: 'pointer', transition: 'border-color 0.2s' },
    deliveryOptionSelected: { borderColor: '#0C5AA2' },
    deliveryInfo: { display: 'flex', alignItems: 'center', gap: '1rem' },
    deliveryLogo: { height: '24px', objectFit: 'contain' },

    // Success Step
    successContainer: { textAlign: 'center', padding: '3rem 0' },
    successText: { fontSize: '1.25rem', fontWeight: '600', margin: '1.5rem 0' },
    successLink: { color: '#007bff', textDecoration: 'none', fontWeight: '500' },
};

// --- KOMPONEN STEPPER ---
const Stepper = ({ currentStep }) => {
    const steps = ['Deskripsi', 'Foto', 'Pengiriman'];
    const icons = [<PencilIcon />, <CameraIcon />, <BoxIcon />];

    const getStepStyle = (stepIndex) => {
        if (stepIndex < currentStep) return { icon: { backgroundColor: '#e0f3ff', borderColor: '#007bff', color: '#007bff' }, text: { color: '#007bff' }, line: { backgroundColor: '#007bff' } };
        if (stepIndex === currentStep) return { icon: { backgroundColor: '#0C5AA2', borderColor: '#0C5AA2', color: 'white' }, text: { color: '#0C5AA2' }, line: { backgroundColor: '#e9ecef' } };
        return { icon: {}, text: {}, line: {} };
    };

    return (
        <div style={styles.stepperContainer}>
            {steps.map((label, index) => {
                const stepStyle = getStepStyle(index + 1);
                return (
                    <React.Fragment key={label}>
                        <div style={{ ...styles.stepNode, ...stepStyle.text }}>
                            <div style={{ ...styles.stepIcon, ...stepStyle.icon }}>
                                {index + 1 < currentStep ? <CheckIcon /> : icons[index]}
                            </div>
                            <span style={styles.stepText}>{label}</span>
                        </div>
                        {index < steps.length - 1 && <div style={{ ...styles.stepLine, ...stepStyle.line }} />}
                    </React.Fragment>
                );
            })}
        </div>
    );
};


// --- KOMPONEN-KOMPONEN LANGKAH (STEPS) ---

const DescriptionStep = ({ data, handleChange, handleDimensionChange, onNext }) => (
    <div style={styles.card}>
        <div style={styles.cardTitle}>Fill in the basic information about your item</div>
        <div style={styles.formGrid}>
            <div>
                <div style={styles.formGroup}>
                    <label htmlFor="title" style={styles.label}>Title</label>
                    <input type="text" id="title" name="name" value={data.name} onChange={handleChange} style={styles.input} maxLength="60" />
                    <div style={styles.charCounter}>{data.name.length}/60</div>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="description" style={styles.label}>Description</label>
                    <textarea id="description" name="description" value={data.description} onChange={handleChange} style={styles.textarea} maxLength="1200"></textarea>
                    <div style={styles.charCounter}>{data.description.length}/1200</div>
                </div>
            </div>
            <div>
                <div style={styles.formGroup}>
                    <label htmlFor="units" style={styles.label}>Number of units available</label>
                    <input type="number" id="units" name="stock" value={data.stock} placeholder="Availability" onChange={handleChange} style={{ ...styles.input, ...styles.inputMuted }} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Dimensions (optional)</label>
                    <div style={styles.dimensionGroup}>
                        <div>
                            <label htmlFor="length" style={styles.dimensionLabel}>Panjang [cm]</label>
                            <input type="number" name="length" value={data.length} placeholder="Length [mm]" onChange={handleDimensionChange} style={styles.input} />
                        </div>
                        <div>
                            <label htmlFor="width" style={styles.dimensionLabel}>Lebar [cm]</label>
                            <input type="number" name="width" value={data.width} placeholder="Width [mm]" onChange={handleDimensionChange} style={styles.input} />
                        </div>
                        <div>
                            <label htmlFor="height" style={styles.dimensionLabel}>Tinggi [cm]</label>
                            <input type="number" name="height" value={data.height} placeholder="Height [mm]" onChange={handleDimensionChange} style={styles.input} />
                        </div>
                    </div>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="price" style={styles.label}>Price</label>
                    <input type="text" id="price" name="price" value={data.price} placeholder="Product price in PLN (gross)" onChange={handleChange} style={{ ...styles.input, ...styles.inputMuted }} />
                </div>
            </div>
        </div>
        <div style={styles.buttonContainer}>
            <button style={{ ...styles.button, ...styles.buttonNext }} onClick={onNext}>Next →</button>
        </div>
    </div>
);

const PhotosStep = ({ photo, onBack, onNext, handleFileUpload }) => (
    <div style={styles.card}>
        <div style={styles.cardTitle}>Add product photo</div>
        <div style={styles.photoGrid}>
            <label style={styles.uploadBox}>
                <UploadIcon />
                <span style={{ fontWeight: 600, marginTop: '8px' }}>Upload a photo</span>
                <span style={{ fontSize: '12px', color: '#6c757d' }}>Max size: 25Mb, Jpg, Png, Gif</span>
                <input type="file" hidden onChange={handleFileUpload} />
            </label>

            <div style={styles.photoThumbnail}>
                <img src={photo.url} alt="" style={styles.photoImg} />
                <div style={styles.photoOverlay}>
                    <div>{photo.original_filename}</div>
                    <div>{photo.bytes}</div>
                </div>
                <button style={styles.deleteButton}><TrashIcon /></button>
            </div>
        </div>
        <div style={styles.buttonContainer}>
            <button style={{ ...styles.button, ...styles.buttonBack }} onClick={onBack}>← Back</button>
            <button style={{ ...styles.button, ...styles.buttonNext }} onClick={onNext}>Next →</button>
        </div>
    </div>
);

const ShippingStep = ({ data, handleDeliveryChange, handleChange, onBack, onNext }) => {
    const isNextDisabled = !data.shippingTime;
    return (
        <div style={styles.card}>
            <div style={styles.cardTitle}>Select delivery options</div>
            <div style={styles.deliveryGrid}>
                {deliveryServices.map(service => (
                    <div key={service.name}
                        style={{ ...styles.deliveryOption, ...(data.deliveryOptions.includes(service.name) ? styles.deliveryOptionSelected : {}) }}
                        onClick={() => handleDeliveryChange(service.name)}>
                        <div style={styles.deliveryInfo}>
                            <input type="checkbox" checked={data.deliveryOptions.includes(service.name)} readOnly />
                            <label>{service.name}</label>
                        </div>
                        <img src={service.logo} alt={service.name} style={styles.deliveryLogo} />
                    </div>
                ))}
            </div>
            <div style={{ ...styles.formGroup, marginTop: '2rem' }}>
                <label style={styles.label}>Shipping time</label>
                <input type="text" name="shippingTime" value={data.shippingTime} onChange={handleChange} placeholder="dd/mm/yyy" style={{ ...styles.input, ...(isNextDisabled ? styles.inputError : {}) }} />
            </div>
            <div style={styles.buttonContainer}>
                <button style={{ ...styles.button, ...styles.buttonBack }} onClick={onBack}>← Back</button>
                <button style={{ ...styles.button, ...styles.buttonNext, ...(isNextDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}) }} onClick={onNext} disabled={isNextDisabled}>Next →</button>
            </div>
        </div>
    )
};

const SuccessStep = () => (
    <div style={styles.card}>
        <div style={styles.successContainer}>
            <SuccessIllustration style={{ width: '120px', height: '120px' }} />
            <p style={styles.successText}>Your advertisement was succesfully added!</p>
            <button style={{ ...styles.button, ...styles.buttonNext, marginBottom: '1rem' }}>View your advertisement →</button>
            <div>or <Link to="/" style={styles.successLink}>Return to home page</Link></div>
        </div>
    </div>
);


// --- KOMPONEN UTAMA (PARENT) ---
const AddProduct = () => {
    const [img, setImg] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        stock: '',
        length: 0, width: 0, height: 0,
        price: '',
        imageUrl: '',
        deliveryOptions: ['Courier DPD', 'Courier DPD cash on delivery', 'Courier Inpost', 'Parcel machine Inpost'],
        shippingTime: '',
    });

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]

        if (!file) return

        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "belanja.in")
        data.append("cloud_name", "deczjjet0")

        const response = await fetch("https://api.cloudinary.com/v1_1/deczjjet0/image/upload", {
            method: "POST",
            body: data
        })

        const uploadedImage = await response.json()
        setImg(uploadedImage)

        console.log(uploadedImage)
        console.log(file)
    }

    const handleNext = () => setCurrentStep(prev => prev < 4 ? prev + 1 : prev);
    const handleBack = () => setCurrentStep(prev => prev > 1 ? prev - 1 : prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDeliveryChange = (option) => {
        setFormData(prev => {
            const newOptions = new Set(prev.deliveryOptions);
            if (newOptions.has(option)) {
                newOptions.delete(option);
            } else {
                newOptions.add(option);
            }
            return { ...prev, deliveryOptions: Array.from(newOptions) };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        // Lakukan validasi akhir di sini jika perlu
        console.log("Submitting form...");
        await handleSubmit();
        handleNext(); // Pindah ke halaman sukses SETELAH submit berhasil
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <DescriptionStep data={formData} handleChange={handleChange} handleDimensionChange={handleDimensionChange} onNext={handleNext} />;
            case 2:
                return <PhotosStep photo={img} onBack={handleBack} onNext={handleNext} handleFileUpload={handleFileUpload} />;
            case 3:
                return <ShippingStep data={formData} handleDeliveryChange={handleDeliveryChange} handleChange={handleChange} onBack={handleBack} onNext={handleFormSubmit} />;
            case 4:
                return <SuccessStep />;
            default:
                return null;
        }
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();

        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('stock', formData.stock);
        form.append('price', formData.price);

        const payload = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            stock: formData.stock,
            imageUrl: img.url
        }
        try {

            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Gagal mengirim data');
            }

            const data = await response.json();
            // Reset form jika perlu
            // setFormData(...);
        } catch (error) {
            console.error('Error saat submit:', error);
            alert('Terjadi kesalahan: ' + error.message);
        }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Seller</h1>
                <div style={styles.headerActions}>
                    <div style={styles.userProfile}>
                        <img src="https://i.pravatar.cc/40?u=jankowalski" alt="Jan Kowalski" style={styles.userAvatar} />
                        <span>{name}</span>
                    </div>
                </div>
            </header>
            <main style={styles.main}>
                <Stepper currentStep={currentStep} />
                {renderStep()}
            </main>
        </div>
    );
};

export default AddProduct;