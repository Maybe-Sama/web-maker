# 📧 Configuración de Email para Formularios

Este documento explica cómo configurar el sistema de email para que los formularios de contacto y presupuestos funcionen correctamente.

## 📋 Formularios Disponibles

### 1. **Formulario de Contacto** (`/contact`)
- Formulario de 7 pasos para solicitudes generales
- Envía emails a través de `/api/contact`

### 2. **Formulario de Presupuesto** (`/create-plan`)
- Configurador de proyectos con servicios personalizables
- Envía solicitudes de presupuesto a través de `/api/budget`
- Incluye detalles completos del proyecto y servicios seleccionados

## 🚀 Opciones Disponibles

### 1. **Gmail (Recomendado para desarrollo)**

#### Configuración paso a paso:

1. **Activa la verificación en 2 pasos** en tu cuenta de Google:
   - Ve a [myaccount.google.com](https://myaccount.google.com)
   - Seguridad → Verificación en 2 pasos → Activar

2. **Genera una contraseña de aplicación**:
   - Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Selecciona "Correo" y tu dispositivo
   - Copia la contraseña generada (16 caracteres)

3. **Crea un archivo `.env.local`** en la raíz del proyecto:
   ```env
   GMAIL_USER=tu-email@gmail.com
   GMAIL_PASS=tu-contraseña-de-aplicación
   GMAIL_TO=tu-email@gmail.com
   ```

### 2. **Resend (Recomendado para producción)**

#### Configuración paso a paso:

1. **Crea una cuenta** en [resend.com](https://resend.com)
2. **Obtén tu API key** desde el dashboard
3. **Configura tu dominio** (opcional pero recomendado)
4. **Añade las variables de entorno**:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   RESEND_FROM=noreply@tu-dominio.com
   RESEND_TO=tu-email@ejemplo.com
   ```

### 3. **Modo Desarrollo (Sin configuración)**

Si no configuras ninguna opción, el sistema funcionará en modo desarrollo y mostrará los emails en la consola del servidor.

## 🔧 Instalación de Dependencias

Las dependencias necesarias ya están instaladas:
- `nodemailer` - Para Gmail
- `@types/nodemailer` - Tipos de TypeScript

Para Resend (opcional):
```bash
npm install @resend/node
```

## 🧪 Probar el Sistema

### Formulario de Contacto
1. **Ve al formulario** en `http://localhost:3000/contact`
2. **Completa los 7 pasos** y envía la solicitud
3. **Verifica los resultados** en consola o email

### Formulario de Presupuesto
1. **Ve al configurador** en `http://localhost:3000/create-plan`
2. **Selecciona servicios** o elige un kit prediseñado
3. **Completa el resumen** y haz clic en "Solicitar Presupuesto"
4. **Rellena el modal** con tus datos y envía
5. **Verifica los resultados** en consola o email

### Scripts de Testing
```bash
# Probar servicio de contacto
node test-email.js

# Probar servicio de presupuestos
node test-budget.js
```

## 🔍 Solución de Problemas

### Error: "Username and Password not accepted"

**Causa**: Credenciales de Gmail incorrectas o configuración de seguridad.

**Solución**:
1. Verifica que la verificación en 2 pasos esté activada
2. Usa una contraseña de aplicación, no tu contraseña normal
3. Asegúrate de que las variables de entorno estén correctas

### Error: "Faltan campos obligatorios"

**Causa**: Variables de entorno no configuradas.

**Solución**:
1. Crea el archivo `.env.local`
2. Añade las variables necesarias
3. Reinicia el servidor de desarrollo

### Error: "Error de conexión"

**Causa**: Problemas de red o servidor no disponible.

**Solución**:
1. Verifica tu conexión a internet
2. Asegúrate de que el servidor esté ejecutándose
3. Revisa la consola del navegador para más detalles

## 📋 Variables de Entorno

### Para Gmail:
```env
GMAIL_USER=tu-email@gmail.com
GMAIL_PASS=tu-contraseña-de-aplicación
GMAIL_TO=tu-email@gmail.com
```

### Para Resend:
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM=noreply@tu-dominio.com
RESEND_TO=tu-email@ejemplo.com
```

## 🎯 Características del Sistema

### Sistema de Contacto
- ✅ **Múltiples proveedores**: Gmail, Resend, modo desarrollo
- ✅ **Validación robusta**: Email, campos obligatorios
- ✅ **Manejo de errores**: Mensajes específicos y útiles
- ✅ **Email HTML**: Diseño profesional y responsive
- ✅ **Logging**: Información detallada en consola
- ✅ **Fallback**: Modo desarrollo automático si no hay configuración

### Sistema de Presupuestos
- ✅ **Configurador visual**: Selección de servicios paso a paso
- ✅ **Kits prediseñados**: Packs optimizados con descuentos
- ✅ **Modal profesional**: Formulario de solicitud elegante
- ✅ **Email detallado**: Incluye configuración completa del proyecto
- ✅ **Validación completa**: Datos del cliente y proyecto
- ✅ **UX mejorada**: Estados de carga y feedback visual

## 🔒 Seguridad

- Las contraseñas de aplicación de Gmail son más seguras que las contraseñas normales
- Las variables de entorno no se suben al repositorio
- Validación de entrada en el servidor
- Sanitización de datos antes del envío

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del servidor para errores
2. Verifica que las variables de entorno estén correctas
3. Prueba el modo desarrollo primero
4. Consulta la documentación de [Nodemailer](https://nodemailer.com/) o [Resend](https://resend.com/docs) 