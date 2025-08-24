<?php
class HomeController extends AppController {
    public function index() {
        $this->key_sections = (new Sections)->find("conditions: is_visible=1 AND is_key=1", "order: sort_order ASC");
        $this->events = (new Events)->find("conditions: status='published' AND start_date >= CURDATE()", "order: start_date ASC", "limit: 6");
        $this->gallery = (new GalleryImages)->find("order: sort_order ASC, id DESC", "limit: 12");
        $this->establishments = (new Establishments)->find("conditions: is_active=1", "order: name ASC");
        $this->years = (new HemerotecaEntries)->find("columns: DISTINCT year", "order: year DESC");
        $this->menu_extra = (new MenuItems)->find("conditions: is_visible=1", "order: sort_order ASC");
    }
}
