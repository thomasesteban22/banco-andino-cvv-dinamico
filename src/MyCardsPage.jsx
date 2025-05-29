import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/* --- Estilos --- */
const Container = styled.div`
    padding: 16px;
    max-width: 375px;
    margin: auto;
    background: #eef6fc;
    min-height: 80vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h2`
    color: #10375C;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 24px;
    text-align: center;
    width: 100%;
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
    color: #566e8e;
    margin-top: 4px;
`;

const Button = styled.button`
    background-color: #3A9952;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 8px 14px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #2E7F3A;
    }
`;

const NoCardsMessage = styled.span`
    color: #B9321F;
    font-weight: 700;
    font-size: 16px;
    margin-top: 20px;
    text-align: center;
    width: 100%;
`;

/* --- Menu --- */
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
    width: 30%;
    max-width: 375px;
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

/* --- Modal Backdrop y contenido --- */
const ModalBackdrop = styled.div`
    position: fixed;
    top: 0; left: 0; right:0; bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalContent = styled.div`
    background: white;
    border-radius: 16px;
    padding: 24px;
    max-width: 360px;
    width: 90%;
    box-sizing: border-box;
    text-align: center;
`;

const ModalTitle = styled.h3`
    font-weight: 700;
    font-size: 22px;
    color: #10375C;
    margin-bottom: 16px;
`;

const ModalText = styled.p`
    font-size: 16px;
    color: #10375C;
    margin-bottom: 24px;
`;

/* --- Temporizador circular --- */
const TimerCircleWrapper = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 24px auto;
`;

const TimerSvg = styled.svg`
    transform: rotate(-90deg);
    width: 120px;
    height: 120px;
`;

const TimerBackgroundCircle = styled.circle`
    fill: none;
    stroke: #ddd;
    stroke-width: 8;
`;

const TimerProgressCircle = styled.circle`
    fill: none;
    stroke: #3A9952;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.2s linear;
`;

const TimerText = styled.div`
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: 700;
    color: #10375C;
`;


/* --- Componente principal --- */
export default function MyCardsPage({ cards }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Estado para autenticacion secundaria y modal CVV
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [cvvModalOpen, setCvvModalOpen] = useState(false);

    // Tarjeta seleccionada
    const [selectedCard, setSelectedCard] = useState(null);

    // CVV generado simulado
    const [cvvCode, setCvvCode] = useState('');

    // Timer para mostrar segundos restantes
    const [timeLeft, setTimeLeft] = useState(60);

    // Ref para intervalo de timer
    const intervalRef = useRef(null);

    // Filtrar tarjetas activas CVV
    const activeCards = cards.filter(card => card.cvvActive);

    // Manejar click en "Ver CVV dinámico"
    const handleViewCvvClick = (card) => {
        setSelectedCard(card);
        setAuthModalOpen(true); // Abrir modal autenticación secundaria
    };

    // Simular autenticación secundaria exitosa
    const handleAuthSuccess = () => {
        setAuthModalOpen(false);
        setCvvModalOpen(true);
        setCvvCode(generateRandomCvv());
        setTimeLeft(60);
    };

    // Genera CVV aleatorio de 3 dígitos
    const generateRandomCvv = () => {
        return Math.floor(100 + Math.random() * 900).toString();
    };

    // Maneja timer del modal CVV
    useEffect(() => {
        if (!cvvModalOpen) {
            clearInterval(intervalRef.current);
            return;
        }
        if (timeLeft === 0) {
            setCvvModalOpen(false);
            clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [cvvModalOpen, timeLeft]);

    // Cálculos para el círculo SVG del temporizador
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const totalTime = 60;
    const strokeDashoffset = circumference * (1 - timeLeft / totalTime);

    const menuOptions = [
        { name: 'Inicio', action: () => { navigate('/dashboard'); setMenuOpen(false); }, disabled: false },
        { name: 'Perfil', action: () => {}, disabled: true },
        { name: 'Seguridad', action: () => { navigate('/security'); setMenuOpen(false); }, disabled: false },
        { name: 'Pagos', action: () => {}, disabled: true },
        { name: 'Mis Tarjetas', action: () => { setMenuOpen(false); }, disabled: true },
    ];

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

            <Title>Mis Tarjetas con CVV Dinámico</Title>

            {activeCards.length === 0 ? (
                <NoCardsMessage>No hay tarjetas con CVV activo</NoCardsMessage>
            ) : (
                <CardList>
                    {activeCards.map(card => (
                        <CardItem key={card.id}>
                            <CardInfo>
                                <CardDigits>**** **** **** {card.digits}</CardDigits>
                                <CardAlias>{card.alias}</CardAlias>
                            </CardInfo>
                            <Button onClick={() => handleViewCvvClick(card)}>
                                Ver CVV dinámico
                            </Button>
                        </CardItem>
                    ))}
                </CardList>
            )}

            {/* Modal autenticación secundaria */}
            {authModalOpen && (
                <ModalBackdrop>
                    <ModalContent>
                        <ModalTitle>Autenticación secundaria requerida</ModalTitle>
                        <ModalText>Por favor, confirma tu identidad para ver el CVV dinámico.</ModalText>
                        <Button onClick={handleAuthSuccess}>Confirmar identidad</Button>
                        <Button
                            style={{ backgroundColor: '#B9321F', marginTop: '10px' }}
                            onClick={() => setAuthModalOpen(false)}
                        >
                            Cancelar
                        </Button>
                    </ModalContent>
                </ModalBackdrop>
            )}

            {/* Modal CVV dinámico con temporizador */}
            {cvvModalOpen && (
                <ModalBackdrop>
                    <ModalContent>
                        <ModalTitle>CVV Dinámico</ModalTitle>

                        <TimerCircleWrapper>
                            <TimerSvg width="120" height="120" viewBox="0 0 120 120">
                                <TimerBackgroundCircle
                                    r={radius}
                                    cx="60"
                                    cy="60"
                                />
                                <TimerProgressCircle
                                    r={radius}
                                    cx="60"
                                    cy="60"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                />
                            </TimerSvg>
                            <TimerText>{timeLeft}s</TimerText>
                        </TimerCircleWrapper>

                        <ModalText style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '4px' }}>
                            {cvvCode}
                        </ModalText>

                        <Button onClick={() => setCvvModalOpen(false)}>Cerrar</Button>
                    </ModalContent>
                </ModalBackdrop>
            )}
        </Container>
    );
}
