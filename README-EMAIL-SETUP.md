# 📧 Configuración de Email para el Formulario de Contacto

Este documento explica cómo configurar el sistema de email para que el formulario de contacto funcione correctamente.

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

1. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

2. **Ve al formulario de contacto** en `http://localhost:3000/contact`

3. **Completa el formulario** y envía la solicitud

4. **Verifica los resultados**:
   - **Gmail**: Revisa tu bandeja de entrada
   - **Resend**: Revisa el dashboard de Resend
   - **Modo desarrollo**: Revisa la consola del servidor

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

- ✅ **Múltiples proveedores**: Gmail, Resend, modo desarrollo
- ✅ **Validación robusta**: Email, campos obligatorios
- ✅ **Manejo de errores**: Mensajes específicos y útiles
- ✅ **Email HTML**: Diseño profesional y responsive
- ✅ **Logging**: Información detallada en consola
- ✅ **Fallback**: Modo desarrollo automático si no hay configuración

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