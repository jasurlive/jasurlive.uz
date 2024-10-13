import React, { useState, useEffect } from 'react';

const Resume = () => {
    // State variables for modal and error messages
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const cvLinks = [
        { file: 'Jasur_Anorkulov_CV_2024.pdf', password: 'amFzdXIyMDI0' },
        { file: 'BC_Jasur_2024.pdf', password: 'amFzdXIyMDI1' }
    ];

    const images = [
        'jasurlive/img/istanbul.jpg',
        'jasurlive/img/pic.png',
        'jasurlive/img/pic1.png',
        'jasurlive/img/pic2.png',
        'jasurlive/img/pic3.png',
        'jasurlive/img/pic4.png',
        'jasurlive/img/pic5.png',
        'jasurlive/img/pic7.png'
    ];

    useEffect(() => {
        // Load current image index from local storage
        const storedIndex = localStorage.getItem('currentImageIndex');
        if (storedIndex !== null) {
            setCurrentImageIndex(parseInt(storedIndex, 10));
        }
    }, []);

    const handleDownloadClick = (index) => {
        setErrorMessage('');
        setModalVisible(true);
        setCurrentImageIndex(index);
        setPassword(''); // Clear the password input
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSubmitPassword = () => {
        const { password: encodedPassword } = cvLinks[currentImageIndex];
        const decodedPassword = atob(encodedPassword);

        if (password === decodedPassword) {
            // Trigger download
            const link = document.createElement('a');
            link.href = cvLinks[currentImageIndex].file;
            link.download = cvLinks[currentImageIndex].file;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setModalVisible(false); // Hide modal after download
        } else {
            setErrorMessage('Incorrect password. Please try again.');
        }
    };

    const handleImageClick = () => {
        const newIndex = (currentImageIndex + 1) % images.length;
        setCurrentImageIndex(newIndex);
        localStorage.setItem('currentImageIndex', newIndex);
    };

    return (
        <div>
            <h1>My Resume</h1>
            <button className="download-btn" onClick={() => handleDownloadClick(0)}>Download CV 1</button>
            <button className="download-btn2" onClick={() => handleDownloadClick(1)}>Download CV 2</button>

            {modalVisible && (
                <div id="password-modal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Enter Password</h2>
                        <input
                            type="password"
                            id="password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmitPassword()}
                        />
                        <button id="submit-password" onClick={handleSubmitPassword}>Submit</button>
                        {errorMessage && <div id="error-message">{errorMessage}</div>}
                    </div>
                </div>
            )}

            <div className="image-flipper" onClick={handleImageClick}>
                <img id="imageSwitcher" src={images[currentImageIndex]} alt="Flipping" />
            </div>
        </div>
    );
};

export default Resume;
