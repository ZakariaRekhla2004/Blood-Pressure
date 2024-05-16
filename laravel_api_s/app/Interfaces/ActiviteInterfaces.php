<?php

namespace App\Interfaces;

interface ActiviteInterfaces{

    public function add_Activite($request);
    public function get_Activite();
     public function get_ActiviteID($request);
    public function update_Activite($request , $Id);
    public function delete_Activite($id);
}