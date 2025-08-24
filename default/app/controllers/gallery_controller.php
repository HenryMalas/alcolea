<?php
class GalleryController extends AppController {
    public function index() {
        $this->images = (new GalleryImages)->find("order: sort_order ASC, id DESC");
    }
}
