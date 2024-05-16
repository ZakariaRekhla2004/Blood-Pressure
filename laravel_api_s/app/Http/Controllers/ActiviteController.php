<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ActiviteService;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{  
    public ActiviteService $activiteService;
    public function __construct(ActiviteService $activiteService)
    {
        $this->activiteService = $activiteService;
        // $this->middleware('jwt');
    }
    public function addActivite(Request $request)
    {
        $activite =$this->activiteService->add_activite($request);
        return response()->json(['message' => 'Activite added successfully', 'activite' => $activite], 201);
    }
    
    public function getActivite()
    {
        $Activite = $this->activiteService->get_activite();
        return response()->json([
            'Activite' => $Activite
        ], 201);
    }
    public function getActiviteId(Request $request)
    {
        $Activite = $this->activiteService->get_activiteId($request->id);
        return response()->json([
            'Activite' => $Activite
        ], 201);
    }
    public function updateActivite(Request $request)
    {
        $activite = $this->activiteService->update_activite($request, $request->id);
        return response()->json(["result" => "Activite updated successfully", "Activite" => $activite], 200);
    }
    public function deleteActivite(Request $request)
    {
         if($this->activiteService->delete_activite($request->id)){
        return response()->json(['message' => 'Activite deleted successfully.'], 200);}
        else{ 
            return response()->json(['message' => 'faild.'], 400);}
    }
}
