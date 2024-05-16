<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\MedicamentService;
use Illuminate\Http\Request;

class MedicamentController extends Controller
{
    public MedicamentService $medicamentService;
    public function __construct(MedicamentService $medicamentService)
    {
        $this->medicamentService = $medicamentService;
        // $this->middleware('jwt');
    }
    public function addMedicament(Request $request)
    {


        return $this->medicamentService->add_Medicament($request);
    }
    public function getMedicament()
    {
        $medicament = $this->medicamentService->get_Medicament();
        return response()->json([
            'medicament' => $medicament
        ], 201);
    }
    public function getMedicamentId(Request $request)
    {
        $medicament = $this->medicamentService->get_MedicamentId($request->id);
        return response()->json([
            'medicament' => $medicament
        ], 201);
    }
    public function updateMedicament(Request $request)
    {
        return $this->medicamentService->update_Medicament($request, $request->id);
    }
    public function deleteMedicament(Request $request)
    {
        return $this->medicamentService->delete_Medicament($request->id);
    }
}

