<?php

namespace App\Interfaces;

interface DossierMInterfaces{

    public function add_Dossier($validator);

    public function get_Dossiers();
    public function get_DossierID($request);

    public function update_Dossier($request);

    public function delete_Dossier($id);

}