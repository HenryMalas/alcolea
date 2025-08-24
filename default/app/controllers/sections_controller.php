<?php
class SectionsController extends AppController {
    public function show($slug) {
        $this->section = (new Section)->find_first("conditions: slug = '$slug' AND is_visible=1");
        if (!$this->section) { Flash::error('Sección no encontrada'); return Router::redirect('/'); }
        $this->images = (new GalleryImage)->find("conditions: section_id = {$this->section->id}", "order: sort_order ASC, id DESC");
        $this->events = (new Event)->find("conditions: status='published' AND section_id = {$this->section->id}", "order: start_date ASC");
    }
}
