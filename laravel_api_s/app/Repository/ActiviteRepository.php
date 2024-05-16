<?php

namespace App\Repository;

use App\Interfaces\ActiviteInterfaces;
use App\Models\Activite;
use Validator;


class ActiviteRepository implements ActiviteInterfaces
{


    public function get_Activite()
    {
        return Activite::get();
    }
    public function add_Activite($request)
    {
        // Validate the request data
        return $request->save();
    }
    public function get_ActiviteID($id)
    {
       return Activite::where('_id', '=', $id)->first();
    
    }

    public function update_Activite($request, $activite)
    {
        return  $activite->update([
            'Poids' => $request->input('Poids'),
            'Taille' => $request->input('Taille'),
            'Imc' =>  $request->input('Poids') / ($request->input('Taille') *$request->input('Taille')),
            'dateExam' => $request->input('dateExam'),
        ]);
    }
    public function delete_Activite($id)
    {
        $activite = $this->get_ActiviteID($id);
        return $activite->delete();
        // Return success message
    }
}


