<?php
namespace App\Repository;

use App\Interfaces\DossierMInterfaces;
use App\Models\Dossier;
use Validator;

class DossierRepository implements DossierMInterfaces
{

    public function get_Dossiers()
    {
        return Dossier::get();
    }
    public function add_Dossier($request)
    {
        return Dossier::create([
            'patient_id' => $request->patient_id,
            'weight' => $request->weight,
            'height' => $request->height,
            'gender' => $request->gender,
            'city' => $request->city,
            'marital_status' => $request->marital_status,
            'date_of_birth' => $request->date_of_birth,
            'family_history' => $request->family_history,
            'medications' => $request->medications,
        ]);
    }
    public function get_DossierId($request)
    {
        return Dossier::find($request);
    }
    public function update_Dossier($dossier)
    {
        return $dossier->save();
    }

    public function delete_Dossier($id)
    {
        $dossier = $this->get_DossierID($id);
        return $dossier->delete();
    }
    public function getDossierMedications($dossierId)
    {
       
        $dossier = $this->get_DossierID($dossierId);
            if (!$dossier) {
            return response()->json(["error" => "Dossier not found"], 404);
        }
        $medications = collect($dossier->medications);
        // Extract medication names from the collection
        // $medicationNames = $medications->pluck('Nom');
        $medicationNames = $medications->pluck('Nom');
        // $medicationNames= $dossier->family_history[0];

        // // Extract medication information from the dossier
        // $medications = $dossier->medications->pluck('Nom');;

        // Return only the medication information as JSON response
        return $medicationNames ;
    }
}











// public function add_Dossier_($request, $Id)
//     {
//         $dossier = Dossier::where('patient_id', '=', (int) $Id)->first();
//         $dossier->height = $request->height;
//         $dossier->weight = $request->weight;
//         $dossier->gender = $request->gender;
//         $dossier->city = $request->city;
//         $dossier->marital_status = $request->marital_status;
//         $dossier->date_of_birth = $request->date_of_birth;
//         $dossier->Antecedent_Familiaux = $request->Antecedent_Familiaux;
//         $dossier->Antecedent_Personelle = $request->Antecedent_Personelle;
//         // Assuming 'family_history' and 'personal_history' are JSON fields
//         $dossier->family_history = $request->family_history;
//         $dossier->personal_history = $request->personal_history;


//         $dossier->save();
//         return response()->json(["result" => "ok"], 201);
//     }



// }

// Now you can access individual elements of the arrays
// For example, if family_history is like {"father": "John", "mother": "Mary"}
// $fatherName = $familyHistory['father']; // Retrieves "John"

// Similarly, for personal_history
// For example, if personal_history is like {"hobbies": ["Reading", "Sports"]}
// $hobbies = $personalHistory['hobbies'];