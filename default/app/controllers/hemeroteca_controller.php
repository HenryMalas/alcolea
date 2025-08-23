<?php
class HemerotecaController extends AppController
{
    public function index($year = '')
    {
        if ($year) {
            $this->year = (int)$year;
            $this->entries = (new HemerotecaEntry)->find("conditions: year={$this->year}", "order: id DESC");
        } else {
            $this->years = (new HemerotecaEntry)->find("columns: DISTINCT year", "order: year DESC");
        }
    }
}
