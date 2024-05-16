<?php

namespace App\Interfaces;

interface TensionExamInterfaces{

    public function add_Tension_Exam($request);
    public function get_Tension_Exam();

     public function get_Tension_ExamID($request);

    public function update_Tension_Exam($request , $Id);

    public function delete_Tension_Exam($id);
}