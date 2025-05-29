import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/* --- Estilos --- */
const SecurityContainer = styled.div`
    padding: 16px;
    max-width: 375px;
    margin: auto;
    background: #F4F6FF;
    min-height: 80vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SecurityTitle = styled.h2`
    color: #10375C;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 24px;
    text-align: center;
    width: 100%;
`;

const MiniCard = styled.div`
    background: white;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(16, 55, 92, 0.15);
    border: 3px solid ${props => (props.active ? '#3A9952' : '#ddd')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border-color 0.3s ease;
    width: 80%;
`;

const CardInfo = styled.div`
    color: #10375C;
    font-weight: 600;
`;

const CardDigits = styled.div`
    font-size: 14px;
    letter-spacing: 2px;
`;

const CardAlias = styled.div`
    font-size: 14px;
    color: #566e8e;
    margin-top: 4px;
`;

const StatusText = styled.div`
    color: ${props => (props.active ? '#3A9952' : '#B9321F')};
    font-weight: 700;
    margin-top: 6px;
    font-size: 14px;
    text-align: center;
`;

const ActionButton = styled.button`
    background-color: ${props => (props.active ? '#3A9952' : '#F3C623')};
    border: none;
    border-radius: 12px;
    padding: 8px 14px;
    cursor: pointer;
    font-weight: 600;
    color: ${props => (props.active ? 'white' : '#10375C')};
    transition: background-color 0.3s ease;
    margin-left: 16px;

    &:hover {
        background-color: ${props => (props.active ? '#2E7F3A' : '#EB8317')};
        color: white;
    }
`;

const InfoCircle = styled.div`
    width: 30px;
    height: 30px;
    background-color: #F3C623;
    color: #10375C;
    font-weight: bold;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    cursor: pointer;
    user-select: none;
    margin-left: 16px;

    &:hover {
        background-color: #EB8317;
        color: white;
    }
`;

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

/* --- Modal --- */
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
`;

const ModalTitle = styled.h3`
    font-weight: 700;
    font-size: 22px;
    color: #10375C;
    margin-bottom: 16px;
    text-align: center;
`;

const ModalText = styled.p`
    font-size: 14px;
    color: #10375C;
    margin-bottom: 12px;
    line-height: 1.4;
`;

const CheckboxLabel = styled.label`
    font-size: 14px;
    color: #10375C;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    user-select: none;

    input {
        margin-right: 10px;
    }

    a {
        color: #F3C623;
        text-decoration: underline;
        cursor: pointer;

        &:hover {
            color: #EB8317;
        }
    }
`;

const ModalButton = styled.button`
    width: 100%;
    padding: 12px;
    background: ${props => (props.disabled ? '#ccc' : '#3A9952')};
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    font-size: 16px;
    transition: background 0.3s ease;
    user-select: none;

    &:hover {
        background: ${props => (props.disabled ? '#ccc' : '#2E7F3A')};
    }
`;

/* --- Notification --- */
const Notification = styled.div`
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: #3A9952;
    color: white;
    padding: 14px 24px;
    border-radius: 12px;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    z-index: 1000;
`;

/* --- Autenticación Secundaria Modal (Dummy para demo) --- */
const AuthModalBackdrop = styled.div`
    position: fixed;
    top:0; left:0; right:0; bottom:0;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
`;

const AuthModalContent = styled.div`
    background: white;
    border-radius: 16px;
    padding: 24px;
    max-width: 320px;
    width: 90%;
    box-sizing: border-box;
    text-align: center;
`;

const AuthModalTitle = styled.h3`
    color: #10375C;
    font-weight: 700;
    margin-bottom: 16px;
`;

const AuthModalButton = styled.button`
    background-color: #3A9952;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2E7F3A;
    }
`;

/* --- SecurityPage con Modal y Notificación --- */
export default function SecurityPage({ cards, setCards }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Modales
    const [modalOpen, setModalOpen] = useState(false);               // Modal para activar CVV
    const [confirmDeactivateModalOpen, setConfirmDeactivateModalOpen] = useState(false); // Modal confirmar desactivar
    const [authModalOpen, setAuthModalOpen] = useState(false);       // Modal autenticación secundaria

    const [selectedCardId, setSelectedCardId] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [notification, setNotification] = useState(null);
    const [mode, setMode] = useState(null); // 'activate' | 'deactivate' | null

    // Cambiar cvvActive en cards
    const toggleCvv = (id) => {
        setCards(cards.map(card =>
            card.id === id ? { ...card, cvvActive: !card.cvvActive } : card
        ));
        closeAllModals();
    };

    // Abrir modal para activar
    const openModal = (id) => {
        setSelectedCardId(id);
        setModalOpen(true);
        setAcceptedTerms(false);
        setMode('activate');
    };

    // Click activar/desactivar
    const handleActionClick = (card) => {
        if (card.cvvActive) {
            // Desactivar: abrir modal de confirmación
            setSelectedCardId(card.id);
            setConfirmDeactivateModalOpen(true);
            setMode('deactivate');
        } else {
            // Activar: abrir modal activación sin autenticación
            openModal(card.id);
        }
    };

    // Checkbox términos
    const handleAcceptTermsChange = (e) => {
        setAcceptedTerms(e.target.checked);
    };

    // Activar sin autenticación
    const handleActivateClick = () => {
        if (selectedCardId !== null && acceptedTerms) {
            toggleCvv(selectedCardId);
            notifyActivation();
            setModalOpen(false);
        }
    };

    // Confirmar desactivación → abre autenticación
    const handleConfirmDeactivate = () => {
        setConfirmDeactivateModalOpen(false);
        setAuthModalOpen(true);
    };

    // Notificaciones
    const notifyActivation = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-CO');
        const formattedTime = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        const activatedCard = cards.find(c => c.id === selectedCardId);

        setNotification(
            `Has activado CVV dinámico para tu tarjeta •••• ${activatedCard.digits} el ${formattedDate} a las ${formattedTime}. Si no fuiste tú, contáctanos.`
        );

        setTimeout(() => {
            setNotification(null);
        }, 6000);
    };

    const notifyDeactivation = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-CO');
        const formattedTime = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        const deactivatedCard = cards.find(c => c.id === selectedCardId);

        setNotification(
            `Has desactivado CVV dinámico para tu tarjeta •••• ${deactivatedCard.digits} el ${formattedDate} a las ${formattedTime}. Si no fuiste tú, contáctanos.`
        );

        setTimeout(() => {
            setNotification(null);
        }, 6000);
    };

    // Autenticación secundaria exitosa para desactivar
    const handleAuthSuccess = () => {
        setAuthModalOpen(false);
        if (mode === 'deactivate' && selectedCardId !== null) {
            toggleCvv(selectedCardId);
            notifyDeactivation();
        }
        setMode(null);
        closeAllModals();
    };

    // Cierra todos modales y limpia estados
    const closeAllModals = () => {
        setModalOpen(false);
        setConfirmDeactivateModalOpen(false);
        setAuthModalOpen(false);
        setAcceptedTerms(false);
        setSelectedCardId(null);
        setMode(null);
    };

    const showInfo = () => {
        alert('Esta tarjeta no cumple con los requisitos para CVV dinámico, contáctese con el banco.');
    };

    const menuOptions = [
        { name: 'Inicio', action: () => { navigate('/dashboard'); setMenuOpen(false); }, disabled: false },
        { name: 'Perfil', action: () => {}, disabled: true },
        { name: 'Seguridad', action: () => { setMenuOpen(false); }, disabled: true },
        { name: 'Pagos', action: () => {}, disabled: true },
        { name: 'Mis Tarjetas', action: () => { navigate('/mycards'); setMenuOpen(false); }, disabled: false },
    ];

    return (
        <SecurityContainer>
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

            <SecurityTitle>Tarjetas con CVV Dinámico</SecurityTitle>

            {cards.map(card => (
                <MiniCard key={card.id} active={card.cvvActive}>
                    <CardInfo>
                        <CardDigits>**** **** **** {card.digits}</CardDigits>
                        <CardAlias>{card.alias}</CardAlias>
                        <StatusText active={card.cvvActive}>
                            {card.cvvActive ? 'Activo' : 'Inactivo'}
                        </StatusText>
                    </CardInfo>

                    {card.hasToggle ? (
                        <ActionButton active={card.cvvActive} onClick={() => handleActionClick(card)}>
                            {card.cvvActive ? 'Desactivar' : 'Activar'}
                        </ActionButton>
                    ) : (
                        <InfoCircle onClick={showInfo}>?</InfoCircle>
                    )}
                </MiniCard>
            ))}

            {/* Modal Activar CVV (sin autenticación) */}
            {modalOpen && (
                <ModalBackdrop>
                    <ModalContent>
                        <ModalTitle>Activar CVV Dinámico</ModalTitle>
                        <ModalText>
                            El CVV dinámico genera un código temporal que cambia cada cierto tiempo para mayor seguridad.
                        </ModalText>
                        <ModalText>
                            La duración del código es de 1 minuto. Solo puede usarse en compras en línea y no es válido para pagos presenciales.
                        </ModalText>
                        <CheckboxLabel>
                            <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={handleAcceptTermsChange}
                            />
                            Acepto los{' '}
                            <a href="https://tu-banco.com/terminos-y-condiciones" target="_blank" rel="noopener noreferrer">
                                Términos y Condiciones
                            </a>
                        </CheckboxLabel>
                        <ModalButton disabled={!acceptedTerms} onClick={handleActivateClick}>
                            Activar CVV dinámico
                        </ModalButton>
                        <ModalButton
                            style={{ marginTop: '10px', backgroundColor: '#B9321F' }}
                            onClick={closeAllModals}
                        >
                            Cancelar
                        </ModalButton>
                    </ModalContent>
                </ModalBackdrop>
            )}

            {/* Modal Confirmar Desactivación */}
            {confirmDeactivateModalOpen && (
                <ModalBackdrop>
                    <ModalContent>
                        <ModalTitle>Confirmar desactivación</ModalTitle>
                        <ModalText>¿Confirmas que deseas desactivar el CVV dinámico para esta tarjeta?</ModalText>
                        <ModalButton onClick={handleConfirmDeactivate}>Confirmar</ModalButton>
                        <ModalButton
                            style={{ marginTop: '10px', backgroundColor: '#B9321F' }}
                            onClick={closeAllModals}
                        >
                            Cancelar
                        </ModalButton>
                    </ModalContent>
                </ModalBackdrop>
            )}

            {/* Modal Autenticación Secundaria para desactivar */}
            {authModalOpen && (
                <AuthModalBackdrop>
                    <AuthModalContent>
                        <AuthModalTitle>Autenticación Secundaria</AuthModalTitle>
                        <p>Por favor, autentícate usando biometría o OTP para continuar.</p>
                        <AuthModalButton onClick={handleAuthSuccess}>Autenticar</AuthModalButton>
                        <AuthModalButton
                            style={{ marginTop: '10px', backgroundColor: '#B9321F' }}
                            onClick={closeAllModals}
                        >
                            Cancelar
                        </AuthModalButton>
                    </AuthModalContent>
                </AuthModalBackdrop>
            )}

            {notification && (
                <Notification>{notification}</Notification>
            )}
        </SecurityContainer>
    );
}
