# Practica 3 - Voz Ciudadana

Software para automatizar el procesamiento de iniciativas legislativas de los ciudadanos. Permite a los colectivos civiles crear propuestas normativas y recolectar firmas de apoyo de la sociedad civil.

## Requisitos Funcionales

- **Propuestas:** El sistema debe permitir a los usuarios crear, editar (en caso aun no se haya enviado el formulario) y publicar iniciativas legislativas, permitiendo adjuntar elementos.

- **Firmas:** El sistema debe permitir a los usuarios emitir una firma digital por iniciativa.

- **Plazos:** El sistema debe iniciar un contador calendario con un plazo maximo de 90 dias en el momento en que se envia el formulario de la iniciativa propuesta.

- **Validacion:** El sistema debe monitorear el conteo de firmas y detectar automaticamente cuando alguna iniciativa alcanze las 25,000 firmas validas.

- **Seguridad:** Al lograr las 25,000 firmas dentro del plazo, el sistema debe congelar criptograficamente el archivo.

- **Transmision:** El sistema debe enviar automaticamente el archivo congelado a la API o buzon electronico de la Oficina del Congreso.

- **Interaccion:** El sistema debe permitir a los usuarios agregar comentarios, firmas, modificaciones y sugerencias a las propuestas en curso.

## Historias de Usuario

- **Historia de Usuario 01:** Como ciudadano, quiero firmar digitalmente una propuestas activa, mostrando mi apoyo cuando debatan la propuesta en el congreso

- **Historia de Usuario 02:** Como auditorio del Congreso, quiero recibir un archivo con verificacion criptografica para asegurar que la propuesta y las firmas no hayan sido alteradas durante su transmision.

## Casos de Prueba

- **Caso de Prueba 01:**
  - _Condicion:_ Propuesta con 21,000 firmas. El reloj del servidor marca el inicio del dia 91. Un usuario intenta firmar.
  - _Resultado Esperado:_ El sistema rechaza la firma, muestra un mensaje de "Plazo vencido" y cambia el estado de la propuesta a "Archivado".

- **Caso de Prueba 01:**
  - _Condicion:_ Un usuario intenta firmar una propuesta que ya firmo anteriormente.
  - _Resultado Esperado:_ El sistema intercepta la peticion y muestra un error indicando que la firma ya fue registrada.

## Patrones de Diseño Estructurales

### 1. Adapter

Este patron permite que interfaces incompatibles trabajen juntas.

En nuestro caso, lo usamos para la validacion de firmas e identidad, ya que necesitaremos conectarnos a un servicio externo (como el servicio de verificacion de identidad de RENIEC). Si en algun momento se cambia el proveedor de identidad, solo creamos un nuevo adaptador sin tocar la logica.

### 2. Facade

Este patron provee una interfaz simplificada para un conjunto de subsistemas complejos.

En nuestro proyeto, lo usamos para el proceso de transmision de la propuesta al congreso. Al alcanzar las 25,000 firmas ocurre lo siguiente: genera un PDF, aplica un congelamiento criptografico, arma el payload y llama a la API del congreso. La fachada se encarga de administrar las clases de criptografia y red por debajo.

### 3. Proxy

Este patron controla el acceso a un objeto mediante un sustituto.

En nuestro caso, lo usamos antes de guardar una firma en la base de datos. El proxy verifica las reglas, y si todo es valido, el proxy lo deja pasar.

### 4. Decorator

Este patron añade responsabilidades a un objeto dinamicamente.

En nuestro proyecto, lo usamos para la extension dinamica de notificaciones o auditoria. Cada vez que se modifique un recurso de soporte, se guarda automaticamente un registro en una tabla de auditoria.
