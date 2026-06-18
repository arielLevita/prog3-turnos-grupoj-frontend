<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12&height=160&section=header&text=Sistema%20de%20Turnos%20Médicos&fontSize=32&fontColor=ffffff&desc=Aplicaci%C3%B3n%20Frontend%20%E2%80%94%20Grupo%20J%20%E2%80%94%20Programaci%C3%B3n%203%20%E2%80%94%20UNER&descSize=14&descAlignY=78" width="100%" />

[![React](https://img.shields.io/badge/React_v19-61DAFB?style=flat-square&logo=react&logoColor=black)](#)
[![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=flat-square&logo=react-router&logoColor=white)](#)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](#)
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-7A42F4?style=flat-square&logo=sweetalert&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](#)

**Interfaz de usuario SPA (Single Page Application) para la gestión integral de turnos médicos y administración clínica.**  
Desarrollada bajo una arquitectura de componentes modulares, optimización de renderizado contra condiciones de carrera, y un sistema de navegación inteligente basado en el control de acceso por roles.

</div>

## 🚀 Características Principales del Frontend

### 🔐 Seguridad y Control de Acceso por Capas
* **Rutas Protegidas Declarativas:** Implementación de componentes guardianes que validan tokens y restringen accesos según niveles estrictos (Médicos, Pacientes y Administradores).
* **Gestión Efímera de Sesión:** Persistencia segura mediante `sessionStorage` combinada con un temporizador de auto-logout asíncrono para prevenir accesos no autorizados por inactividad.

### 🧑‍🦽 Portal del Paciente (Registro y Reservas)
* **Onboarding Automatizado:** Formulario de registro autónomo integrado que consume la cartilla pública de obras sociales y sincroniza la creación en paralelo del usuario y la ficha de paciente (atención bajo cobertura o particular).
* **Calendario de Reservas Asincrónico:** Selector dinámico de días hábiles y franjas horarias configurables, con cálculo inteligente y automático de aranceles según la consulta del profesional y los descuentos vigentes de la obra social.

### 👔 Panel de Administración Centralizado
* **Arquitectura de Rutas Anidadas (`Sub-routing`):** Pestañas de control dinámico que desacoplan la lógica de negocio y optimizan las peticiones de red mediante carga bajo demanda.
* **Módulos CRUD Integrados:** Interfaz ágil para la gestión interactiva en tiempo real de profesionales, especialidades (con políticas locales de actualización automática contra caché) y usuarios.

## 👥 Equipo de Desarrollo

<div align="center">

| <a href="https://github.com/arielLevita"><img src="https://github.com/arielLevita.png" width="72px" style="border-radius:50%"/><br/><b>Ariel Levita</b></a> | <a href="https://github.com/Elisa-Beltramone"><img src="https://github.com/Elisa-Beltramone.png" width="72px" style="border-radius:50%"/><br/><b>Elisa Beltramone</b></a> | <a href="https://github.com/wox9000"><img src="https://github.com/wox9000.png" width="72px" style="border-radius:50%"/><br/><b>Walter Cuesta</b></a> |
|:---:|:---:|:---:|
|  |  |  |

| <a href="https://github.com/GabrielORoman"><img src="https://github.com/GabrielORoman.png" width="72px" style="border-radius:50%"/><br/><b>Gabriel Roman</b></a> | <a href="https://github.com/MaryOlivares"><img src="https://github.com/MaryOlivares.png" width="72px" style="border-radius:50%"/><br/><b>María Olivares</b></a> | <a href="https://github.com/NerinaBonnin"><img src="https://github.com/NerinaBonnin.png" width="72px" style="border-radius:50%"/><br/><b>Nerina Bonnin</b></a> |
|:---:|:---:|:---:|
|  |  |  |

</div>

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12&height=80&section=footer" width="100%" />

*Facultad de Ciencias de la Administración · UNER | FCAD · Tecnicatura Universitaria en Desarrollo Web · Programación 3 · 2026*
</div>
