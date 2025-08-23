<?php
/**
 * Controller por defecto si no se usa el routes
 */
class IndexController extends AppController
{
    public function index()
    {
        $this->imagenes = (new Imagen())->find();
        $this->eventos = (new Evento())->find("order: fecha asc");
    }
}
