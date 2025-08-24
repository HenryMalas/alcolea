<?php
class EventsController extends AppController {
    public function index() {
        $this->events = (new Event)->find("conditions: status='published'", "order: start_date DESC");
    }
}
