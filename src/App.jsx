import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';
import logoImage from './logo.jpeg';
import SecurityPage from './SecurityPage';
import MyCardsPage from './MyCardsPage';

// Global styles
const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Inter', sans-serif;
    }
`;

/* --- Estilos comunes --- */
const Container = styled.div`
    min-height: 80vh;
    background: #eef6fc;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    max-width: 375px;
    margin: auto;
`;

const Card = styled.div`
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    padding: 24px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
`;

const Title = styled.h2`
    color: #2a5fa2;
    margin-bottom: 16px;
    font-size: 24px;
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: none;
    border-radius: 8px;
    background: #2a5fa2;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #224b85;
    }
`;

const SmallText = styled.p`
    font-size: 14px;
    color: #566e8e;
    margin-top: 8px;
`;

const QRWrapper = styled.div`
    margin-top: 16px;
`;

/* --- LoginPage con QR --- */
function LoginPage() {
    const navigate = useNavigate();
    const qrUrl = 'https://6314-200-118-62-205.ngrok-free.app';

    return (
        <Container>
            <Card>
                <Title>Bienvenido</Title>
                <Button onClick={() => navigate('/landing')}>Iniciar</Button>
                <SmallText>Escanea para abrir en tu celular:</SmallText>
                <QRWrapper>
                    <QRCodeCanvas value={qrUrl} size={128} />
                </QRWrapper>
            </Card>
        </Container>
    );
}

/* --- LandingPage con login simulado Banco Andino --- */
const LandingTitle = styled.h1`
    color: #10375C;
    font-weight: 700;
    margin-bottom: 24px;
    font-size: 28px;
`;

const LogoContainer = styled.div`
    width: 220px;
    height: 180px;
    margin: 0 auto 20px auto;
    border-radius: 16px;
    background: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 24px;
    user-select: none;
`;

const LogoImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
`;

const Input = styled.input`
    width: 90%;
    padding: 14px 16px;
    margin-bottom: 20px;
    border: 2px solid #F3C623;
    border-radius: 12px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
        border-color: #EB8317;
    }
`;

const StartButton = styled(Button)`
    background-color: #F3C623;
    color: #10375C;

    &:hover {
        background-color: #EB8317;
        color: white;
    }
`;

const FormError = styled.p`
    color: #EB8317;
    font-size: 14px;
    margin-bottom: 16px;
    text-align: left;
`;

function LandingPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('cliente@bancoandino.com');
    const [password, setPassword] = useState('contrasena123');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!email.trim()) {
            setError('Por favor ingresa tu correo electrónico');
            return;
        }
        if (!password.trim()) {
            setError('Por favor ingresa tu contraseña');
            return;
        }
        setError('');
        navigate('/dashboard');
    };

    return (
        <Container>
            <Card>
                <LogoContainer>
                    <LogoImage src={logoImage} alt="Logo Banco Andino" />
                </LogoContainer>
                <LandingTitle>Banco Andino</LandingTitle>
                {error && <FormError>{error}</FormError>}
                <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="username"
                    inputMode="email"
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <StartButton onClick={handleLogin}>Iniciar sesión</StartButton>
            </Card>
        </Container>
    );
}

/* --- Estilos para Dashboard --- */
const MenuButton = styled.button`
    background: #10375C;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 18px;
    margin-bottom: 20px;
    align-self: flex-start;
`;

const MenuList = styled.ul`
    list-style: none;
    padding: 0;
    margin-bottom: 32px;
    background: #F4F6FF;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(16, 55, 92, 0.1);
    width: 100%;
    max-width: 375px;
`;

const MenuItem = styled.li`
    padding: 12px 20px;
    border-bottom: 1px solid #ccc;
    color: ${props => (props.disabled ? '#999' : '#10375C')};
    font-weight: 600;
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    pointer-events: ${props => (props.disabled ? 'none' : 'auto')};

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${props => (props.disabled ? 'inherit' : '#F3C623')};
        color: ${props => (props.disabled ? '#999' : '#10375C')};
    }
`;

const Greeting = styled.h2`
    color: #10375C;
    margin-bottom: 8px;
    align-self: flex-start;
`;

/* --- Balance Container y Label --- */
const BalanceContainer = styled.div`
    align-self: flex-start;
    margin-bottom: 24px;
    font-family: 'Inter', sans-serif;
`;

const BalanceLabel = styled.div`
    font-size: 14px;
    color: #566e8e;
    margin-bottom: 4px;
    margin-top: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
`;

const Balance = styled.p`
    color: #EB8317;
    font-weight: 700;
    font-size: 24px;
    margin: 0px;
`;

const CardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`;

const CardItem = styled.div`
    background: white;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 4px 14px rgba(16, 55, 92, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CardInfo = styled.div`
    color: #10375C;
    font-weight: 600;
`;

const CardDigits = styled.span`
    font-size: 18px;
    letter-spacing: 2px;
`;

const CardAlias = styled.span`
    display: block;
    font-size: 14px;
    color: darkorange;
    margin-top: 4px;
`;

const CardStatus = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: ${props => (props.active ? '#3A9952' : '#B9321F')};
    margin-right: 12px;
`;

const ActionButton = styled.button`
    background: ${props => (props.active ? '#B9321F' : '#3A9952')};
    color: white;
    border: none;
    border-radius: 12px;
    padding: 8px 14px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;

    &:hover {
        background: ${props => (props.active ? '#8A2416' : '#2E7F3A')};
    }
`;

/* --- DashboardPage --- */
function DashboardPage({ cards, setCards }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const menuOptions = [
        { name: 'Inicio', action: () => { navigate('/dashboard'); setMenuOpen(false); }, disabled: false },
        { name: 'Perfil', action: () => {}, disabled: true },
        { name: 'Seguridad', action: () => { navigate('/security'); setMenuOpen(false); }, disabled: false },
        { name: 'Pagos', action: () => {}, disabled: true },
        { name: 'Mis Tarjetas', action: () => { navigate('/mycards'); setMenuOpen(false); }, disabled: false },
    ];

    const toggleCardStatus = (id) => {
        setCards(cards.map(card =>
            card.id === id ? { ...card, active: !card.active } : card
        ));
    };

    return (
        <Container>
            <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? 'Cerrar ×' : 'Menú ☰'}
            </MenuButton>

            {menuOpen && (
                <MenuList>
                    {menuOptions.map((opt, i) => (
                        <MenuItem
                            key={i}
                            onClick={opt.disabled ? undefined : opt.action}
                            disabled={opt.disabled}
                        >
                            {opt.name}
                        </MenuItem>
                    ))}
                </MenuList>
            )}

            <Greeting>¡Hola Thomas!</Greeting>

            <BalanceContainer>
                <BalanceLabel>Balance</BalanceLabel>
                <Balance>$ 1.267.003,00</Balance>
            </BalanceContainer>

            <CardList>
                {cards.map(card => (
                    <CardItem key={card.id}>
                        <CardInfo>
                            <CardDigits>**** **** **** {card.digits}</CardDigits>
                            <CardAlias>{card.alias}</CardAlias>
                        </CardInfo>
                        <div>
                        </div>
                    </CardItem>
                ))}
            </CardList>
        </Container>
    );
}

/* --- App con rutas --- */
export default function App() {
    const [cards, setCards] = useState([
        { id: 1, digits: '1234', alias: 'Visa Débito', active: true, cvvActive: false, hasToggle: true },
        { id: 2, digits: '5678', alias: 'Visa Crédito', active: false, cvvActive: false, hasToggle: false },
        { id: 3, digits: '9012', alias: 'Visa Débito', active: true, cvvActive: false, hasToggle: true },
    ]);

    return (
        <>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="/dashboard" element={<DashboardPage cards={cards} setCards={setCards} />} />
                    <Route path="/security" element={<SecurityPage cards={cards} setCards={setCards} />} />
                    <Route path="/mycards" element={<MyCardsPage cards={cards} />} />
                </Routes>
            </Router>
        </>
    );

}
