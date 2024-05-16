<?php

namespace App\Services;
use App\Models\Tension_Exam;
use App\Repository\TensionExamRepository;
use Validator;

class TensionExamService
{
    public TensionExamRepository $tension_ExamRepository;

    public function __construct(TensionExamRepository $tension_ExamRepository)
    {
        $this->tension_ExamRepository = $tension_ExamRepository;
    }
    public function get_Tension_Exam()
    {
        return $this->tension_ExamRepository->get_Tension_Exam();
    }
    public function add_Tension_Exam($request)
    {
        $validator = Validator::make($request->all(), [
            "user_id" => 'required',
            'Systolique' => 'required|numeric',
            'Diastolique' => 'required|numeric',
            'date_Examen' => 'required|date',
            'heure_Examen' => 'required|date_format:H:i',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $tension_exam = new Tension_Exam();

        $tension_exam->id = $request->input('user_id');
        $tension_exam->Systolique = $request->input('Systolique');
        $tension_exam->Diastolique = $request->input('Diastolique');
        $tension_exam->date_Examen = $request->input('date_Examen');
        $tension_exam->heure_Examen = $request->input('heure_Examen');

        return $this->tension_ExamRepository->add_Tension_Exam($tension_exam);
    }
    public function update_Tension_Exam($request, $id)
    {
        $tension_Exam = Tension_Exam::where('_id', '=',  $id);
        if (!$tension_Exam) {
            return response()->json(["error" => "Tension_Exam not found"], 404);
        }
        $validator = Validator::make($request->all(), [

            'Systolique' => 'required|numeric',
            'Diastolique' => 'required|numeric',
            'date_Examen' => 'required|date',
            'heure_Examen' => 'required|date_format:H:i',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        return $this->tension_ExamRepository->update_Tension_Exam($request, $tension_Exam);
    }
    public function delete_Tension_Exam($id)
    {
        $tension_Exam = Tension_Exam::where('_id', '=',$id)->first();
        if (!$tension_Exam) {
            return response()->json(['message' => 'Tension_Exam not found.'], 404);
        }
        return $this->tension_ExamRepository->delete_Tension_Exam($tension_Exam);
    }
    public function get_Tension_ExamId($request)
    {
        return $this->tension_ExamRepository->get_Tension_ExamID($request);
    }
}

