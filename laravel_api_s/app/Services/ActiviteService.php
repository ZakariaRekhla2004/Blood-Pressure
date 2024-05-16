<?php

namespace App\Services;

use App\Models\Activite;
use App\Repository\ActiviteRepository;
use Validator;

class ActiviteService
{
    public ActiviteRepository $activiteRepository;

    public function __construct(ActiviteRepository $activiteRepository)
    {
        $this->activiteRepository = $activiteRepository;
    }
    public function get_activite()
    {
        return $this->activiteRepository->get_activite();
    }
    public function add_activite($request)
    {
        $validator = Validator::make($request->all(), [
            "id" => 'nullable|numeric',
            "Poids" => 'required|numeric',
            'Taille' => 'required|numeric',
            'dateExam' => 'required|date',
        ]);
        // If validation fails, return errors
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $poids = $request->input('Poids');
        $taille = $request->input('Taille');
        $imc = $poids / ($taille * $taille);
        $activite = new Activite();
        // Assign values to attributes
        $activite->id = $request->input('id');
        $activite->Poids = $request->input('Poids');
        $activite->Taille = $request->input('Taille'); 
        $activite->Imc = $imc;
        $activite->dateExam = $request->input('dateExam');

        return $this->activiteRepository->add_activite($activite);
    }
    public function update_activite($request, $id)
    {
        // Check if the activite exists
        $activite = Activite::findOrFail($id);
        if (!$activite) {
            return response()->json(["error" => "Activite not found"], 404);
        }
        // Validate the request
        $validator = Validator::make($request->all(), [
            'Poids' => 'required|numeric',
            'Taille' => 'required|numeric',
            'dateExam' => 'required|date',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        return $this->activiteRepository->update_activite($request, $activite);
    }
    public function delete_activite($id)
    {
        return $this->activiteRepository->delete_activite($id);
    }
    public function get_activiteId($request)
    {
        return $this->activiteRepository->get_activiteID($request);
    }
}

