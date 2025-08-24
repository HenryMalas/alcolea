<?php
class HemerotecaController extends AppController {
    public function index($year='') {
        if ($year) {
            $this->year = (int)$year;
            $this->entries = (new HemerotecaEntries)->find("conditions: year={$this->year}", "order: id DESC");
        } else {
            $this->years = (new HemerotecaEntries)->find("columns: DISTINCT year", "order: year DESC");
        }
    }
}
