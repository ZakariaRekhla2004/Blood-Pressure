<?php

namespace App\Repository;

use App\Interfaces\TensionExamInterfaces;
use App\Models\Tension_Exam;
use Validator;


class TensionExamRepository implements TensionExamInterfaces
{


    public function get_Tension_Exam()
    {
        return Tension_Exam::get();
    }

    public function add_Tension_Exam($request)
    {
        return $request->save();
    }
    // public function get_Tension_ExamID($request){

    // }
    public function get_Tension_ExamID($id)
    {
        return Tension_Exam::where('_id', '=', $id)->first();
        // $tension_Exam = Tension_Exam::find($id ,'_id');
        
    //     return response()->json(["Tension_Exam" => $tension_Exam], 200);
    }

    public function update_Tension_Exam($request, $tension_Exam)
    {
        
        return $tension_Exam->update([
            'Systolique' => $request->input('Systolique'),
            'Diastolique' => $request->input('Diastolique'),
            'date_Examen' => $request->input('date_Examen'),
            'heure_Examen' => $request->input('heure_Examen'),
        ]);
    }
    public function delete_Tension_Exam($tension_Exam)
    {
        
        return  $tension_Exam->delete(); 
    }
}


