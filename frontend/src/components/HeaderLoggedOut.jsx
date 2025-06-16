import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Aset Anda (pastikan path-nya benar)
import logoImage from '../assets/logo.png';

// --- Kumpulan Komponen Ikon (SVG) ---
const SearchIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg> );
const CloseIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg> );

// --- STYLED COMPONENTS (Sebagian besar sama dengan HeaderLoggedIn) ---
const HeaderWrapper = styled.header`
    height: 100px;
    font-family: 'Inter', sans-serif;
`;

const HeaderBar = styled.div`
    position: fixed;
    top: 16px;
    left: 24px;
    right: 24px;
    z-index: 1100;
    transition: top 0.3s ease-in-out;

    ${({ $isScrolled }) => $isScrolled && css` top: 0px; `}

    @media (max-width: 768px) { left: 16px; right: 16px; }
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    background-color: white;
    border-radius: 999px;
    padding: 12px 16px; // Padding disesuaikan sedikit
    box-shadow: 0 8px 30px rgba(0, 136, 255, 0.3);
    transition: box-shadow 0.3s ease;

    ${({ $isScrolled }) => $isScrolled && css` box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); `}
    
    @media (max-width: 768px) { padding: 8px 12px; gap: 12px; }

    ${({ $isSearchOpen }) => $isSearchOpen && css`
        @media (max-width: 1024px) {
            & > *:not(.search-container-mobile) { visibility: hidden; }
        }
    `}
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    margin-right: auto; // Ini mendorong search bar dan tombol ke kanan
`;

const LogoImage = styled.img`
    height: 40px;
    @media (max-width: 768px) { height: 32px; }
`;

const DesktopSearchContainer = styled.div`
    flex: 1;
    max-width: 500px;
    display: flex;
    border: 1px solid #dee2e6;
    border-radius: 999px;
    overflow: hidden;
    @media (max-width: 1024px) { display: none; }
`;

const MobileSearchContainer = styled.div`
    display: flex;
    align-items: center;
    @media (min-width: 1025px) { display: none; }
`;

const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    padding: 10px 20px;
    font-size: 16px;
    background-color: transparent;
`;

const SearchButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    border: none;
    background-color: #0C5AA2;
    color: white;
    cursor: pointer;
    font-weight: 500;
    padding: 0 24px;
`;

const MobileSearchButton = styled.button`
    background: none; border: none; cursor: pointer; color: white;
    padding: 10px; display: flex; align-items: center; justify-content: center;
    background-color: #0C5AA2; border-radius: 50%;
    @media (max-width: 768px) { padding: 8px; }
`;

const OverlaySearchContainer = styled.div`
    display: flex; position: absolute; left: 12px; right: 12px; top: 50%;
    transform: translateY(-50%); width: auto; background-color: white; z-index: 1300;
    border: 1px solid #dee2e6; border-radius: 999px; overflow: hidden;
    visibility: hidden; opacity: 0; transition: opacity 0.2s ease, visibility 0.2s ease;
    ${({ $isOpen }) => $isOpen && css` visibility: visible; opacity: 1; `}
`;

const CloseSearchButton = styled.button`
    background: none; border: none; padding: 0 16px; display: flex; align-items: center;
    cursor: pointer; color: #6c757d;
`;

const ActionsContainer = styled.nav`
    display: flex;
    align-items: center;
    gap: 12px;
`;

// --- ✨ PERUBAHAN UTAMA: STYLE UNTUK TOMBOL LOGIN & REGISTER ---
const AuthButton = styled(Link)`
    padding: 10px 24px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:active {
        transform: scale(0.98);
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 14px;
    }
`;

const LoginButton = styled(AuthButton)`
    background-color: #e9ecef;
    color: #495057;

    &:hover {
        background-color: #dee2e6;
    }
`;

const RegisterButton = styled(AuthButton)`
    background-color: #e9ecef;
    color: #495057;

    &:hover {
        background-color: #dee2e6;
    }
`;

// --- KOMPONEN HEADER LOGGED OUT ---
const HeaderLoggedOut = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <HeaderWrapper>
            <HeaderBar $isScrolled={isScrolled}>
                <HeaderContent $isScrolled={isScrolled} $isSearchOpen={isSearchOpen}>
                    
                    <LogoLink to="/">
                        <LogoImage src={logoImage} alt="Logo Belanja.in" />
                    </LogoLink>

                    <DesktopSearchContainer>
                        <SearchInput type="text" placeholder="Mau cari apa?" />
                        <SearchButton>
                            <SearchIcon />
                            <span>Cari</span>
                        </SearchButton>
                    </DesktopSearchContainer>

                    {/* ✨ PERUBAHAN UTAMA: TOMBOL AKSI UNTUK LOGGED OUT */}
                    <ActionsContainer>
                        <MobileSearchContainer>
                           <MobileSearchButton onClick={() => setIsSearchOpen(true)}>
                                <SearchIcon />
                           </MobileSearchButton>
                        </MobileSearchContainer>

                        {/* Tombol Notif, Cart, dan User diganti dengan Login & Register */}
                        <LoginButton to="/login">Login</LoginButton>
                        <RegisterButton to="/register">Register</RegisterButton>
                    </ActionsContainer>
                    
                    <OverlaySearchContainer $isOpen={isSearchOpen} className="search-container-mobile">
                        <SearchInput type="text" placeholder="Cari produk..." autoFocus />
                        <CloseSearchButton onClick={() => setIsSearchOpen(false)}>
                            <CloseIcon />
                        </CloseSearchButton>
                    </OverlaySearchContainer>

                </HeaderContent>
            </HeaderBar>
        </HeaderWrapper>
    );
};

export default HeaderLoggedOut;