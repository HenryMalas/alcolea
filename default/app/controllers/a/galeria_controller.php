<?php
class GaleriaController extends AppController {
    public function index() {
        $this->imagenes = (new Imagen())->find();
    }
}
