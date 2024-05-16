<?php

namespace App\Repository;
use App\Interfaces\MedicamentInterfaces;
use App\Models\Medicament;
use Validator;


class MedicamentRepository implements MedicamentInterfaces {


    public function get_Medicament(){
        return Medicament::get();
    }

    public function add_Medicament($request) {
        $validator = Validator::make($request->all(), [
            "id" => 'nullable|numeric',
            'Nom' => 'required|string',
            'doze' => 'nullable|string',
            'Mg_g' => 'required|numeric',
            'Qr' => 'required|string',
            'Temps' => 'nullable|array',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        // Creating a new instance of Medicament model
        $medicament = new Medicament();
    
        // Assigning values to attributes
        $medicament->id = $request->input('id'); // If not provided, it will be null
        $medicament->Nom = $request->input('Nom');
        $medicament->doze = $request->input('doze');
        $medicament->Mg_g = $request->input('Mg_g');
        $medicament->Qr = $request->input('Qr');
        $medicament->Temps = $request->input('Temps');
        $medicament->save();
        $medicament=Medicament::create($validator->validated());
        return $medicament;
    }
    // public function get_MedicamentID($request){

    // }
    public function get_MedicamentID($id) {
       $medicament= Medicament::where('id', '=', (int)$id)->first();
        if (!$medicament) {
            return response()->json(["error" => "Medicament not found"], 403);
        }
      return response()->json(["medicament" => $medicament], 200);
}

public function update_Medicament($request, $id)
{
    // Check if the medication exists
    $medicament = Medicament::where('id', '=', (int) $id)->first();
    // Validate the request
    $validator = Validator::make($request->all(), [
        'Nom' => 'required|string',
        'doze' => 'nullable|string',
        'Mg_g' => 'required|numeric',
        'Qr' => 'required|string',
        'Temps' => 'nullable|array',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    // Update the medication with the new data
    $medicament->update([
        'Nom' => $request->Nom,
        'doze' => $request->doze,
        'Mg_g' => $request->Mg_g,
        'Qr' => $request->Qr,
        'Temps' => $request->Temps,
        // Assuming other fields you may want to update
        // 'other_field' => $request->other_field,
    ]);

    return response()->json(["result" => "Medicament updated successfully", "medicament" => $medicament], 200);
}
public function delete_Medicament($id){
    // Check if the medication exists
    $medicament = Medicament::where('id', '=', (int) $id)->first();
    if (!$medicament) {
        return response()->json(['message' => 'Medication not found.'], 404);
    }
    $medicament->delete();
    // Return success message
    return response()->json(['message' => 'Medication deleted successfully.'], 200);
}
    }


