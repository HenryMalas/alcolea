<?php
/**
 * KumbiaPHP Web Framework
 * Parámetros de conexión a la base de datos
 */
return [
    'development' => [
        'type' => 'sqlite',
        'dsn'  => 'data/alcolea.sqlite',
        'pdo'  => 'On',
    ],
    'production' => [
        'type' => 'sqlite',
        'dsn'  => 'data/alcolea.sqlite',
        'pdo'  => 'On',
    ],
];
