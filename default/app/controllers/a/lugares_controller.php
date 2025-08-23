<?php
class LugaresController extends AppController {
    public function index() {
        $this->lugares = (new Lugar())->find();
    }

    public function ver($id) {
        $this->lugar = (new Lugar())->find($id);
    }
}
