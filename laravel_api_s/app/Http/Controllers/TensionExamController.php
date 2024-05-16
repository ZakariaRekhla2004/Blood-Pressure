<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\TensionExamService;
use Illuminate\Http\Request;

class TensionExamController extends Controller
{
   
    public TensionExamService $TensionExamService;
    public function __construct(TensionExamService $TensionExamService)
    {
        $this->TensionExamService = $TensionExamService;
        $this->middleware('jwt');
    }
    public function addTensionExam(Request $request)
    {
        if($this->TensionExamService->add_Tension_Exam($request)){;
        return response()->json(['message' => 'Tension_Exam added successfully' , "aaa" => $this->TensionExamService->add_Tension_Exam($request) ], 201);}
        else{ return response()->json(['message' => 'Tension_Exam added successfully'], 401);}
    }
    public function getTensionExam()
    {
        $TensionExam = $this->TensionExamService->get_Tension_Exam();
        return response()->json([
            'TensionExam' => $TensionExam
        ], 201);
    }
    public function getTensionExamId(Request $request)
    {
        $TensionExam = $this->TensionExamService->get_Tension_ExamId($request->id);
        if (!$TensionExam) {
            return response()->json(["error" => "Tension_Exam not found"], 403);
        }
        return response()->json([
            'TensionExam' => $TensionExam
        ], 201);
    }
    public function updateTensionExam(Request $request)
    {
        $tension_Exam = $this->TensionExamService->update_Tension_Exam($request, $request->id);
         return response()->json(["result" => "Tension_Exam updated successfully", "Tension_Exam" => $tension_Exam], 200);
    }
    public function deleteTensionExam(Request $request)
    {
        $this->TensionExamService->delete_Tension_Exam($request->id);
        return response()->json(['message' => 'Tension_Exam deleted successfully.'], 200); 
    }
}
