<?php
class EventsController extends AppController {
    public function index() {
        $this->events = (new Events)->find("conditions: status='published'", "order: start_date DESC");
    }
}
