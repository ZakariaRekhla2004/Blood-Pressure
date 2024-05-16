<?php

namespace App\Interfaces;

interface MedicamentInterfaces{

    public function add_Medicament($request);
    public function get_Medicament();

     public function get_MedicamentID($request);

    public function update_Medicament($request , $Id);

    public function delete_Medicament($id);
}