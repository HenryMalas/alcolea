<?php

/**
 * KumbiaPHP Web Framework
 * Parámetros de conexión a la base de datos
 */
return [
    'development' => [
        'host'     => 'localhost',
        'username' => 'root', //no es recomendable usar el usuario root
        'password' => '',
        'name'     => 'turismo_alcolea',
        'type'     => 'mysql',
        'charset'  => 'utf8',
    ],

    'production' => [
        'host'     => 'localhost',
        'username' => 'root', //no es recomendable usar el usuario root
        'password' => '',
        'name'     => 'turismo_alcolea',
        'type'     => 'mysql',
        'charset'  => 'utf8',
    ],
];

/**
 * Ejemplo de SQLite
 */
/*'development' => [
    'type' => 'sqlite',
    'dsn' => 'temp/data.sq3',
    'pdo' => 'On',
] */

/*
<?php

/**
 * KumbiaPHP Web Framework
 * Parámetros de conexión a la base de datos
 */
//Quiero imprimir el path de donde se esta ejecutando este fichero para poder saber donde creo el alcolea.sqlite y para ello finalizo con un exit.

/* echo __DIR__ . '/data/alcolea.sqlite';
exit; */



/**
 * KumbiaPHP Web Framework
 * Parámetros de conexión a la base de datos
 */
return [
    'development' => [
        'type' => 'sqlite',
        'dsn' => 'config/data/alcolea.sqlite',
        'pdo' => 'On',
    ],
    'production' => [
        /**
         * host: ip o nombre del host de la base de datos
         */
        'host'     => 'localhost',
        /**
         * username: usuario con permisos en la base de datos
         */
        'username' => 'root', //no es recomendable usar el usuario root
        /**
         * password: clave del usuario de la base de datos
         */
        'password' => '',
        /**
         * test: nombre de la base de datos
         */
        'name'     => 'binance',
        /**
         * type: tipo de motor de base de datos (mysql, pgsql o sqlite)
         */
        'type'     => 'mysql',
        /**
         * charset: Conjunto de caracteres de conexión, por ejemplo 'utf8'
         */
        'charset'  => 'utf8',
        /**
     * dsn: cadena de conexión a la base de datos
     */
        //'dsn' => '',
        /**
     * pdo: activar conexiones PDO (OnOff); descomentar para usar
     */
        //'pdo' => 'On',
    ],
];

/**
 * Ejemplo de SQLite
 */
/*'development' => [
    'type' => 'sqlite',
    'dsn' => 'temp/data.sq3',
    'pdo' => 'On',
] */


return [
    'development' => [
        'type' => 'sqlite',
        'dsn' => 'sqlite:' . APP_PATH . 'config/data/alcolea.sqlite',
        //'dsn'  => '/var/www/html/alcolea/app/db/alcolea.sqlite', // 'data/alcolea.sqlite',
        'pdo'  => 'On',
    ],
    'production' => [
        'type' => 'sqlite',
        'dsn' => 'sqlite:' . APP_PATH . 'config/data/alcolea.sqlite',
        //'dsn'  => '/var/www/html/alcolea/app/db/alcolea.sqlite', // 'data/alcolea.sqlite',
        'pdo'  => 'On',
    ],
];
