<?php

namespace Controllers;

use Libs\Database\DB;
use Libs\Web\Response;

class SectionController {

    public function saveResult()
    {
        $data = $_POST;
        $result = DB::table('results')
                    ->where('lesson_id', $data['lesson_id'])
                    ->where('user_id', auth()['id'])
                    ->where('section_id', $data['section_id'])
                    ->first();

        $data = [
            'user_id' => auth()['id'],
            'lesson_id' => $data['lesson_id'],
            'section_id' => $data['section_id'],
            'total_value' => $data['total_value'],
            'content_object' => $data['content_object'],
            'status' => $data['status']
        ];

        if($result)
        {
            DB::table('results')->where('id',$result['id'])->update($data);
        }
        else
        {
            DB::table('results')->insert($data);
        }

        return Response::json([], 'result saved');
    }
    
}