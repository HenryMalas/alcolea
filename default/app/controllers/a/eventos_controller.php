<?php
class EventosController extends AppController {
    public function index() {
        $this->eventos = (new Evento())->find("order: fecha asc");
    }

    public function ver($id) {
        $this->evento = (new Evento())->find($id);
    }
}
