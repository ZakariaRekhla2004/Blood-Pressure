<?php

namespace App\Services;
use App\Models\Medicament;
use App\Repository\MedicamentRepository;
use Validator;
class MedicamentService{
    public MedicamentRepository $medicamentRepository;

        public function __construct(MedicamentRepository $medicamentRepository)
    {
        $this->medicamentRepository=$medicamentRepository;
    }
    public function get_Medicament(){
        return $this->medicamentRepository->get_Medicament();
    }
    public function add_Medicament( $request) {
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
    
        return response()->json(['message' => 'Medicament added successfully',"medicament"=> $medicament], 201);
    }
    public function  update_Medicament($request , $id)
        {
            return $this->medicamentRepository->update_Medicament($request ,$id);
        }
        public function  delete_Medicament($id)
        {
            return $this->medicamentRepository->delete_Medicament($id);
        }
        public function get_MedicamentId($request) {
            return $this->medicamentRepository->get_MedicamentID($request);
        }

}