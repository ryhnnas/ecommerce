import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Aset Anda (pastikan path-nya benar)
import logoImage from '../assets/logo.png';
import productImage from '../assets/baju1.jpeg';

// --- Kumpulan Komponen Ikon (SVG) ---
const ShoppingCartIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /></svg>);
const SearchIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg>);
const BellIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" /></svg>);
const UserIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" /></svg>);
const CloseIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg>);

// --- Data & Fungsi ---
const dummyCartItems = [
];
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount).replace('Rp', 'Rp ').trim();
};



// --- STYLED COMPONENTS ---
const vibrantBlue = '#0055FF';

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

  @media (max-width: 768px) {
    left: 16px;
    right: 16px;
  }
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
  padding: 12px 24px;
  box-shadow: 0 8px 30px rgba(0, 136, 255, 0.3);
  transition: box-shadow 0.3s ease;

  ${({ $isScrolled }) => $isScrolled && css` box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); `}
  
  @media (max-width: 768px) {
    padding: 8px 12px;
    gap: 12px;
  }

  ${({ $isSearchOpen }) => $isSearchOpen && css`
    @media (max-width: 1024px) {
      & > *:not(.search-container-mobile) {
        visibility: hidden;
      }
    }
  `}
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const LogoImage = styled.img`
  height: 40px;
  @media (max-width: 768px) {
    height: 32px;
  }
`;

const DesktopSearchContainer = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  border: 1px solid #dee2e6;
  border-radius: 999px;
  overflow: hidden;

  @media (max-width: 1024px) {
    display: none; // Sembunyikan di layar kecil
  }
`;

const MobileSearchContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (min-width: 1025px) {
    display: none; // Sembunyikan di layar besar
  }
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
  border-radius: 0 999px 999px 0;
`;

const SearchButtonText = styled.span``;

const MobileSearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0C5AA2;
  border-radius: 50%;
  
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const OverlaySearchContainer = styled.div`
  display: flex;
  position: absolute;
  left: 12px;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  background-color: white;
  z-index: 1300;
  border: 1px solid #dee2e6;
  border-radius: 999px;
  overflow: hidden;
  
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease, visibility 0.2s ease;

  ${({ $isOpen }) => $isOpen && css`
    visibility: visible;
    opacity: 1;
  `}
`;

const CloseSearchButton = styled.button`
    background: none;
    border: none;
    padding: 0 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #6c757d;
`;

const ActionsContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #343a40;
  padding: 0;
  display: flex;
`;

const UserIconWrapper = styled(Link)`
  background-color: #f1f3f5;
  border-radius: 50%;
  padding: 8px;
  display: flex;
  color: #343a40;
`;

const CartPopup = styled.div`
  position: absolute;
  top: calc(100% + 15px);
  right: 0;
  width: 380px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid #e9ecef;
  z-index: 1200;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;

  @media (max-width: 480px) {
    width: 90vw;
    right: -20px;
  }

   ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    `}
`;


// Styling untuk CartContainer (dihapus &:hover)
const CartContainer = styled.div`
  position: relative;
  cursor: pointer;
`;


const CartHeader = styled.h3` font-size: 1.25rem; font-weight: 600; color: #212529; margin: 0; padding: 1.5rem 1.5rem 0 1.5rem; margin-bottom: 1.5rem; `;
const CartItemList = styled.div` display: flex; flex-direction: column; gap: 1.5rem; max-height: 40vh; overflow-y: auto; padding: 0 1.5rem; `;
const CartItem = styled.div` display: flex; align-items: center; gap: 1rem; `;
const ItemImage = styled.img` width: 64px; height: 64px; border-radius: 8px; background-color: #f1f3f5; object-fit: cover; `;
const ItemInfo = styled.div` flex: 1; `;
const ItemName = styled.div` font-weight: 600; color: #212529; margin-bottom: 4px; `;
const ItemDetails = styled.div` font-size: 0.875rem; color: #6c757d; margin-bottom: 4px; `;
const ItemPrice = styled.div` font-weight: bold; font-size: 1rem; color: #212529; `;
const RemoveItemButton = styled.button` background: none; border: none; cursor: pointer; color: #adb5bd; &:hover { color: #343a40; } `;
const CartFooter = styled.div` margin-top: 1.5rem; border-top: 1px solid #e9ecef; padding: 1.5rem; `;
const Subtotal = styled.div` display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-size: 1rem; font-weight: 600; `;
const CartButtons = styled.div` display: flex; flex-direction: column; gap: 0.75rem; `;
const ButtonLink = styled(Link)` text-decoration: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; text-align: center; transition: opacity 0.2s ease; &:hover { opacity: 0.9; } `;
const PrimaryButton = styled(ButtonLink)` background-color: ${vibrantBlue}; color: white; border: 1px solid ${vibrantBlue}; `;
const SecondaryButton = styled(ButtonLink)` background-color: white; color: ${vibrantBlue}; border: 1px solid ${vibrantBlue}; `;


// --- KOMPONEN HEADER UTAMA ---
const Header = ({ getProducts }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const navigate = useNavigate()

  const handleSubmit = async () => {
    console.log("Search Input Value:", inputValue);
    const response = await fetch(`http://localhost:8080/api/products/search?name=${inputValue}`)
    const data = await response.json()
    console.log(data.map(e => e.id))
    navigate(`/search/${inputValue}`)
    // You can call an API or filter items based on input value
  };

  const searchItem = async () => {
    const search = useParams();
    console.log(nameSearch)
    // const response = await fetch(`http://localhost:8080/api/products/search?name=${search}`)
  }

  const getCartItems = async () => {

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      const data = await response.json()
      setCartItems(data.items)
      console.log("CART", data.items)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    getCartItems()
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0);
  }, [cartItems]);

  // const navigate = useNavigate()

  const toCheckOut = () => {
    // handleCart()
    window.location.href = "/checkout"
    console.log("erros")
  }

  const deleteFromCart = async (itemId) => {

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/api/cart/items/product/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('Cart updated:', data);
      getCartItems();
    } catch (e) {
      console.error('Update error:', e);
    }


  }


  return (
    <HeaderWrapper>
      <HeaderBar $isScrolled={isScrolled}>
        <HeaderContent $isScrolled={isScrolled} $isSearchOpen={isSearchOpen}>

          <LogoLink to="/">
            <LogoImage src={logoImage} alt="Logo Perusahaan" />
          </LogoLink>

          <DesktopSearchContainer>
            <SearchInput type="text" value={inputValue} onChange={handleChange} placeholder="Mau cari apa?" />
            <SearchButton onClick={handleSubmit}>
              <SearchIcon />
              <SearchButtonText>Cari</SearchButtonText>
            </SearchButton>
          </DesktopSearchContainer>

          <ActionsContainer>
            <MobileSearchContainer>
              <MobileSearchButton onClick={() => setIsSearchOpen(true)}>
                <SearchIcon />
              </MobileSearchButton>
            </MobileSearchContainer>

            {/* <IconButton aria-label="Notifikasi"><BellIcon /></IconButton> */}

            <CartContainer onClick={toggleCartPopup}>
              <IconButton as="div" aria-label="Keranjang Belanja"> <ShoppingCartIcon /> </IconButton>
              <CartPopup isOpen={isCartOpen}>
                <CartHeader>Keranjang Belanja ({String(cartItems.length).padStart(2, '0')})</CartHeader>
                <CartItemList>
                  {cartItems.map(item => (
                    <CartItem key={item.id}>
                      <ItemImage src={item.imageUrl} alt={item.name} />
                      <ItemInfo>
                        <ItemName>{item.productName}</ItemName>
                        <ItemDetails>{item.details}</ItemDetails>
                        <span>{item.quantity}x</span>
                        <ItemPrice>{formatCurrency(item.subtotal)}</ItemPrice>
                      </ItemInfo>
                      <button onClick={() => deleteFromCart(item.productId)}><CloseIcon /></button>
                      {/* <RemoveItemButton onClick={console.log(item.productId)}><CloseIcon /></RemoveItemButton> */}
                    </CartItem>
                  ))}
                </CartItemList>
                <CartFooter>
                  <Subtotal><span>Subtotal:</span><span>{formatCurrency(subtotal)}</span></Subtotal>
                  <CartButtons>
                    <button onClick={toCheckOut}>BELI SEKARANG →</button>
                    <SecondaryButton to="/cart">LIHAT KERANJANG</SecondaryButton>
                  </CartButtons>
                </CartFooter>
              </CartPopup>
            </CartContainer>

            <UserIconWrapper to="/dashboard" aria-label="Profil Pengguna">
              <UserIcon />
            </UserIconWrapper>
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

export default Header;