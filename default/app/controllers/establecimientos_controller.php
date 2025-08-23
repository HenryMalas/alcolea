<?php
class EstablecimientosController extends AppController {
    public function index() {
        $this->establecimientos = (new Establecimiento())->find();
    }

    public function ver($id) {
        $this->establecimiento = (new Establecimiento())->find($id);
    }
}
