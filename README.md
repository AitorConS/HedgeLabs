
---

# **NEXUS – Product Landing & Pre-Order Application**

NEXUS es una esfera robótica autoequilibrada desarrollada por HedgeLabs. Este repositorio contiene la aplicación web oficial utilizada como landing page y sistema de pre-órdenes del producto. El sitio combina visualización 3D interactiva, presentación de especificaciones técnicas y funcionalidad de compra integrada.

---

## 🚀 **Descripción General**

La aplicación provee:

* Visualización 3D interactiva del robot NEXUS
* Información detallada de características y especificaciones
* Flujo de pre-orden con procesamiento de pagos
* UI moderna, responsiva y basada en componentes
* Integraciones externas para manejo de transacciones

El objetivo del proyecto es ofrecer una experiencia de marketing premium que permita a los usuarios conocer el producto y realizar una reserva de manera simple e intuitiva.

---

## 🤖 **Producto: NEXUS**

Según la metadata declarada en el código fuente, NEXUS es presentado como:

> **"Advanced Balancing Ball Robot"**
> **"Self-Balancing Robotic Sphere"**
> con “advanced stabilization technology, precision control, and cutting-edge design”.

El sitio combina elementos multimedia y contenido informativo que destacan:

* Estabilización avanzada
* Control de precisión
* Diseño moderno y sofisticado
* Animaciones y assets visuales

---

## 🧩 **Arquitectura de la Aplicación**

La aplicación está construida como **Single-Page Application (SPA)** con enfoque completamente cliente-side.

### **Clasificación General**

| Característica       | Implementación                                         |
| -------------------- | ------------------------------------------------------ |
| Tipo de Aplicación   | React SPA renderizada en cliente                       |
| Lenguaje principal   | TypeScript + React (TSX/JSX)                           |
| Sistema de Build     | **Vite**                                               |
| Routing              | **react-router-dom**                                   |
| Gestor de Paquetes   | **Bun** (con soporte fallback para npm)                |
| Arquitectura Interna | Basada en componentes + módulos de integración externa |

### **Puntos de Entrada**

* `index.html` (carga inicial)
* `src/main.tsx` (bootstrap de React)

---

## 🧱 **Estructura del Sistema**

La aplicación se organiza en:

### **1. Visualización de Producto**

* Módulos de renderizado 3D
* Interacciones del usuario con el modelo
* Integración con librerías y assets gráficos

### **2. Contenido y Presentación**

* Secciones de características, especificaciones y marketing
* Componentes UI reutilizables
* Estilos desacoplados del core lógico

### **3. Sistema de Pre-Orden**

* Formularios de compra
* Manejo de estados y validaciones
* Flujo de pago conectado a servicios externos

### **4. Integraciones Externas**

* Procesador de pagos
* API de backend (si corresponde)
* Configuración a través de claves y endpoints externos

---

## 🛠️ **Tecnologías Utilizadas**

### **Frontend**

* React
* TypeScript
* React Router
* Vite
* CSS moderno / librería UI propia del proyecto

### **Herramientas de Desarrollo**

* Bun / npm
* Scripts de build, dev y producción
* Hot Module Reloading (HMR)
* Tipado estático y linting

---
