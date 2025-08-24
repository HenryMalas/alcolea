<?php
class GalleryController extends AppController {
    public function index() {
        $this->images = (new GalleryImage)->find("order: sort_order ASC, id DESC");
    }
}
