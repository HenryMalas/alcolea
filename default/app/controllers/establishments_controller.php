<?php
class EstablishmentsController extends AppController {
    public function index($category='') {
        $cond = "is_active=1";
        if ($category) { $cond .= " AND category='".addslashes($category)."'"; }
        $this->category = $category;
        $this->establishments = (new Establishments)->find("conditions: $cond", "order: name ASC");
    }
}
