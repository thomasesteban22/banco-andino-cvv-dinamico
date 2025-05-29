# Banco Andino CVV Dinámico

## Descripción

Esta aplicación web simula un sistema bancario para Banco Andino que incorpora la funcionalidad de CVV dinámico en las tarjetas de crédito y débito. El CVV dinámico es un código de seguridad temporal que cambia periódicamente para proteger las transacciones en línea, incrementando la seguridad y reduciendo el riesgo de fraude.

## Funcionalidades principales

- Login Simulado con correo y contraseña predefinidos.
- Dashboard personalizado con saludo, menú y saldo fijo.
- Gestión de tarjetas con activación y desactivación del CVV dinámico.
- Visualización en “Mis Tarjetas” solo de tarjetas con CVV activo.
- Visualización segura del CVV dinámico con autenticación secundaria y temporizador circular de 60 segundos.
- Confirmación y autenticación MFA/biometría para desactivar CVV dinámico.
- Menú lateral responsivo con opciones habilitadas y deshabilitadas.

## Tecnologías utilizadas

- React 18, React Router v6, Styled Components, QRCode.react, JavaScript ES6+.
- Git y GitHub para control de versiones y hospedaje.

## Estructura del proyecto

- App.jsx: rutas y estado global de tarjetas.
- DashboardPage.jsx: saldo y listado de tarjetas.
- SecurityPage.jsx: activación/desactivación de CVV dinámico.
- MyCardsPage.jsx: visualización de CVV con temporizador.
- LoginPage.jsx y LandingPage.jsx: login simulado.
- Componentes y estilos organizados en carpetas según corresponda.

## Instalación y ejecución

Clonar repositorio, instalar dependencias con `npm install` y correr con `npm start`. Abrir en `http://localhost:3000`.

## Uso de la aplicación

- Iniciar sesión con credenciales predeterminadas.
- Navegar por menú a Dashboard, Seguridad y Mis Tarjetas.
- Activar CVV dinámico en Seguridad aceptando términos.
- Desactivar CVV dinámico con confirmación y autenticación secundaria.
- En Mis Tarjetas, ver solo tarjetas activas y visualizar CVV con temporizador circular de 60 segundos que se oculta automáticamente.
- El sistema solicita autenticación secundaria cada vez que se quiere ver o desactivar el CVV dinámico.

## Consideraciones de seguridad

- MFA/biometría simulada mediante prompt para proteger acceso a CVV.
- CVV visible solo durante 60 segundos con contador visual circular.
- Aplicación orientada a demostración funcional, no lista para producción real.

## Mejoras futuras

- Integrar APIs reales de autenticación multifactor y biometría.
- Persistencia en backend para estados y datos.
- Mejoras de accesibilidad y responsividad.
- Soporte multilenguaje y pruebas automatizadas.

## Autor

Thomas Esteban  
[GitHub](https://github.com/thomasesteban22)

## Licencia

MIT License
