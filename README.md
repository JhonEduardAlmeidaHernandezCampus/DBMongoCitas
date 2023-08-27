# DBMongoCitas



## MONGODB

Se crea una base de datos para la gestión de citas 



## INSTALACIÓN

1. Para descargar Node.js ve a la siguiente página "[Download | Node.js (nodejs.org)](https://nodejs.org/en/download)".

2. Descarga la versión de Node.js correspondiente a su sistema operativo.

3. Clona este repositorio en tu máquina local.

   - https://github.com/JhonEduardAlmeidaHernandezCampus/DBMongoCitas.git

4. Abre una terminal en el editor de código de tu preferencia, se recomienda "Visual Studio Code".

5. Abra la terminal y ejecute el siguiente comando 

   ```
   cd src
   ```

   1.  Se va a parar dentro de la carpeta src, ahí se encuentra el archivo package.json

6. Ejecuta el siguiente comando para instalar las dependencias:

   `NOTA:` Las dependencias a utilizar ya vienen dentro del proyecto, solo clone el repositorio y abra la terminal e ingrese el siguiente comando.

```
npm install;
```



## CONFIGURACIÓN

1. Asegurarse de tener creada la base de datos, si no cuentas con una base de datos, este proyecto ya trae una por defecto en la ruta

   ```
   db/db.mongodb
   ```

   

2. Crea un archivo .env en donde va a generar sus variables de entorno "Este proyecto ya trae un ejemplo por defecto"

   ```
   .env
   ```

   

3. Define las siguientes variables de entorno:

```
MY_CONFIG = {"hostname": "127.10.10.10", "port": 5010}
MY_CONNECT = {"user": "Jhon", "password": "123", "database": "db_campus_citas"}
MY_JWT = ""
```



4. Una vez instaladas las dependencias y configurado las variables de entorno, tienes que ejecutar el nodemon de la siguiente manera.

```
npm run dev
```



## GENERAR TOKEN ACCESO

Antes de empezar a utilizar las diferentes rutas y endPoints debemos generar un token de acceso a la tabla a la que vamos a consultar, que debemos colocar en nuestro header/Autorization, este token tiene un limite de 30h, en ese rango de tiempo podremos acceder a las rutas y endPoints de nuestra API.

para generar nuestro token, debemos acceder a nuestra extensión de visual estudio llamada **Thunder-Client**, colocar la siguiente ruta:

`POST:` **http://"hostname":"port"/generarToken/usuarios**

**PDTA:** Se genera el token a la tabla a la que vaya a hacer las consultas

```
Tablas: {
	usuarios,
	medicos,
	citas
}
```



```
El token generado se mostrara en la pantalla de resultado de `Thunder-Client`
```



Una vez obtenido nuestro token debemos ingresarlo en la extensión de visual estudio `Thunder-Client` ruta "Headers", una vez dentro, en la casilla de header colocar `Authorization`, y el token generado anteriormente.

- Tener en cuenta que el token solo funciona para esa tabla en especifico, si quiere hacer consultas o algún método de otra tabla, tendrá que generar un token de acceso a esa tabla y enviarlo por el `Header.`





## CONSULTAS



### Consulta 1: 

- *Obtener todos los usuarios alfabéticamente*

#### GET: `http://127.10.10.10:5010/usuarios`

```
[
  {
    "ID": 2,
    "Tipo_Doc": "CC",
    "Nombre_Completo": "Ana Maria Sanchez",
    "Genero": "Mujer",
    "Telefono": "+57 3012345678",
    "Direccion": "Carrera 7 # 14 - 42 Bogota",
    "Email": "anamaria@gmail.com"
  },
  ...
]
```



### Consulta 2: 

- *Obtener todas las citas alfabéticamente*

#### GET: `http://127.10.10.10:5010/citas`

```
[
  {
    "ID_cita": 1,
    "cit_fecha": "2023-08-12",
    "cit_estado_cita": "Cancelada",
    "cit_datos_medico": 1,
    "cit_datos_usuario": 1
  },
  ...
]
```



### Consulta 3: 

- *Obtener todos los médicos de una especialidad específica (por ejemplo, **'Ginecologo'**):* 

#### GET: `http://127.10.10.10:5010/medicos/Ginecologo`

```
[
  {
    "med_num_matricula": 1,
    "med_nombre_completo": "Carlos Villafrades",
    "med_especialidad": {
      "nom_especialidad": "Ginecologo"
    },
    "med_consultorio": {
      "nom_consultorio": "Consultorio de ginecologia"
    }
  }
]
```



### Consulta 4: 

- *Encontrar la próxima cita para un usuario específico (por ejemplo, el paciente con **usu_id 1**):*
  - **"NOTA"**: El estado de la cita tiene que ser "Activa"

#### GET: `http://127.10.10.10:5010/usuarios/3`

```
[
  {
    "usu_id": 3,
    "usu_tipo_doc": "TI",
    "usu_nombre_completo": "Maria Rodriguez",
    "usu_genero": "Mujer",
    "usu_telefono": "+57 3023456789",
    "usu_direccion": "Calle 5 # 20 - 15 Cali",
    "usu_email": "maria@hotmail.com",
    "fk_usuarios_citas": {
      "ID_cita": 3,
      "cit_fecha": "2023-09-01",
      "cit_estado_cita": "Activa",
      "cit_datos_medico": 3
    }
  }
]
```



### Consulta 5: 

- *Encontrar todos los pacientes que tienen citas con un médico específico (por ejemplo, el médico con **med_nroMatriculaProsional 1**)*

#### GET: `http://127.10.10.10:5010/medicos/usuarios/1`

```
[
  {
    "usu_id": 1,
    "usu_nombre_completo": "Jhon Eduard Almeida Hernandez",
    "usu_telefono": "+57 3005559677",
    "usu_direccion": "Calle 11B # 1A - 20 Piedecuesta",
    "fk_usuarios_citas": [
      {
        "ID_cita": 1,
        "cit_fecha": "2023-08-12",
        "cit_estado_cita": "Cancelada"
      }
    ],
    "fk_citas_medicos": [
      {
        "med_num_matricula": 1,
        "med_nombre_completo": "Carlos Villafrades",
        "med_especialidad": {
          "nom_especialidad": "Ginecologo"
        }
      }
    ]
  }
]
```



### Consulta 6: 

- *Obtener las consultorías para un paciente específico (por ejemplo, paciente **con usu_id 1**)*

#### GET: `http://127.10.10.10:5010/citas/citas_usuario/1`

```
[
  {
    "usu_id": 1,
    "usu_tipo_doc": "CC",
    "usu_nombre_completo": "Jhon Eduard Almeida Hernandez",
    "usu_genero": "Hombre",
    "usu_telefono": "+57 3005559677",
    "usu_direccion": "Calle 11B # 1A - 20 Piedecuesta",
    "usu_email": "jhonhernandez.1899@gmail.com",
    "fk_usuarios_citas": [
      {
        "ID_cita": 1,
        "cit_fecha": "2023-08-12",
        "cit_estado_cita": "Cancelada",
        "cit_datos_medico": 1
      }
    ]
  }
]
```



### Consulta 7: 

- *Encontrar todas las citas para un día específico (por ejemplo, **'2023-08-12'**)*

#### GET: `http://127.10.10.10:5010/citas/dia_especifico/2023-08-12`

```
[
  {
    "ID_cita": 1,
    "cit_fecha": "2023-08-12",
    "cit_estado_cita": "Cancelada",
    "cit_datos_medico": 1,
    "cit_datos_usuario": 1
  }
]
```



### Consulta 8: 

- *Obtener los médicos y sus consultorios*

#### GET: `http://127.10.10.10:5010/medicos/medico/consultorios`

```
[
  {
    "med_nombre_completo": "Carlos Villafrades",
    "med_consultorio": {
      "nom_consultorio": "Consultorio de ginecologia"
    }
  },
  ...
]
```



### Consulta 9: 

- *Contar el número de citas que un médico tiene en un día específico (por ejemplo, el médico con **med_nroMatriculaProsional 1 en '2023-07-12'**)*

#### GET: `http://127.10.10.10:5010/citas/medico/1/fecha/2023-08-12`

```
[
  {
    "med_num_matricula": 1,
    "med_nombre_completo": "Carlos Villafrades",
    "med_especialidad": {
      "nom_especialidad": "Ginecologo"
    },
    "med_consultorio": {
      "nom_consultorio": "Consultorio de ginecologia"
    },
    "fk_medicos_citas": [
      {
        "ID_cita": 1,
        "cit_fecha": "2023-08-12",
        "cit_estado_cita": "Cancelada",
        "cit_datos_medico": 1,
        "cit_datos_usuario": 1
      }
    ]
  }
]
```



### Consulta 10: 

- *Obtener los consultorio donde se aplicó las citas de un paciente*

#### GET: `http://127.10.10.10:5010/medicos/consultorios/citas/1`

```
[
  {
    "usu_id": 1,
    "usu_nombre_completo": "Jhon Eduard Almeida Hernandez",
    "fk_citas_medicos": [
      {
        "med_nombre_completo": "Carlos Villafrades",
        "med_consultorio": {
          "nom_consultorio": "Consultorio de ginecologia"
        }
      }
    ]
  }
]
```



### Consulta 11: 

- *Obtener todas las citas realizadas por los pacientes de un genero si su estado de la cita fue atendida*

#### GET: `http://127.10.10.10:5010/citas/genero/Mujer`

```
[
  {
    "usu_id": 3,
    "usu_tipo_doc": "TI",
    "usu_nombre_completo": "Maria Rodriguez",
    "usu_genero": "Mujer",
    "usu_telefono": "+57 3023456789",
    "usu_direccion": "Calle 5 # 20 - 15 Cali",
    "usu_email": "maria@hotmail.com",
    "fk_usuarios_citas": {
      "ID_cita": 3,
      "cit_fecha": "2023-09-01",
      "cit_estado_cita": "Activa",
      "cit_datos_medico": 3
    }
  }
]
```



### Consulta 12: 

- *Mostrar todas las citas que fueron rechazadas y en un mes específico, mostrar la fecha de la cita, el nombre del usuario y el médico.*
  - **"NOTA"**: Solo pasar el mes en el header


#### GET: `http://127.10.10.10:5010/citas/rechazadas/08`

```
[
  {
    "usu_nombre_completo": "Laura Garcia",
    "fk_usuarios_citas": {
      "cit_fecha": "2023-08-21",
      "cit_estado_cita": "Rechazada"
    },
    "fk_citas_medicos": [
      {
        "med_nombre_completo": "Pedro Ramírez"
      }
    ]
  }
]
```



## DEPENDECIAS QUE SE IMPLEMENTARON

- "class-transformer": "0.5.1",
- "class-validator": "0.14.0",
- "dotenv": "16.3.1",
- "express": "4.18.2",
- "express-rate-limit": "6.8.1",
- "express-validator": "7.0.1",
- "jose": "4.14.4",
- "mongodb": "5.7.0",
- "nodemon": "3.0.1",
- "reflect-metadata": "0.1.13",
- "typescript": "5.1.6"

**------------------------------**

# NOTA

En tal caso de presentar algún error el código, comunicarse con el desarrollador.

`EMAIL:` [Jhonhernandez.1899@gmail.com](mailto:Jhonhernandez.1899@gmail.com)
