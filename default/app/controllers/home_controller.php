<?php
class HomeController extends AppController {
    public function index() {
        $this->key_sections = (new Section)->find("conditions: is_visible=1 AND is_key=1", "order: sort_order ASC");
        $this->events = (new Event)->find("conditions: status='published' AND start_date >= CURDATE()", "order: start_date ASC", "limit: 6");
        $this->gallery = (new GalleryImage)->find("order: sort_order ASC, id DESC", "limit: 12");
        $this->establishments = (new Establishment)->find("conditions: is_active=1", "order: name ASC");
        $this->years = (new HemerotecaEntry)->find("columns: DISTINCT year", "order: year DESC");
        $this->menu_extra = (new MenuItem)->find("conditions: is_visible=1", "order: sort_order ASC");
    }
}
