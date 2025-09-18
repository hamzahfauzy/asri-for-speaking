<?php

namespace Controllers;

use Libs\Database\DB;

class LessonItemController {

    function store()
    {
        DB::table('lesson_items')->insert($_POST);

        setAlert('bg-success', 'Data berhasil disimpan', 'Successfully');
        header('location: /lesson-items?lesson_id='.$_POST['lesson_id']);
        die;
    }
    
    function update()
    {
        $id = $_GET['id'];
        DB::table('lesson_items')->where('id', $id)->update($_POST);

        setAlert('bg-success', 'Data berhasil diupdate', 'Successfully');
        header('location: /lesson-items?lesson_id='.$_POST['lesson_id']);
        die;
    }
    
    function delete()
    {
        $id = $_GET['id'];
        $item = DB::table('lesson_items')->where('id', $id)->first();
        DB::table('lesson_items')->where('id', $id)->delete();

        setAlert('bg-success', 'Data berhasil dihapus', 'Successfully');
        header('location: /lesson-items?lesson_id='.$item['lesson_id']);
        die;
    }

    function seedLesson()
    {
        $lessons = [
            1 => ["Type", "Want", "Made", "Key", "Use", "Choose", "Move", "Care", "Answer", "Tell ", "Study ", "Die", "Call", "Success", "Serve", "Require ", "Provide", 
                    "Reduce", "Burn", "Receive", "Run", "Listen", "Written", "Speak", "ead", "Produce", "Make", "Become", "Jump", "Eat", "Drink", "Sleep", "Watch", "Learn ", "Teach", "Work"
                    ,"Play ", "Think", "Sing", "Dance", "Swim", "Drive", "Ride ", "Fly", "Walk", "Buy", "Sell", "Create ", "Visit", "Send"],
            2 => ["Type", "Want", "Made", "Key", "Use", "Choose", "Move", "Care", "Answer ", "Tell ", "Study ", "Die", "Call", "Success", "Serve", "Require", "Provide", 
                    "Reduce", "Burn", "Receive", "Run", "Listen", "Written", "Speak", "Read", "Produce", "Make", "Become", "Jump ", "Eat", "Drink", "Sleep", "Watch", "Learn", "Teach", "Work"
                    ,"Play ", "Think ", "Sing", "Dance", "Swim", "Drive", "Ride ", "Fly", "Walk", "Buy", "Sell", "Create ", "Visit ", "Send"],
            4 => ["Talk", "Dress up", "Wear", "Own", "Risk", "Loss ", "Know ", "Hired", "Fired", "Promote", "Work"
                , "Mean", "Get", "Pack", "Believe", "Laugh", "Cry", "Search", "Live", "Die", "See", "Run", "Caught"
                , "Flow", "Begin", "Do", "Say ", "Look", "Take ", "Seat ", "Give ", "Change ", "Think ", "Hire", "Design"
                , "Waste", "Put", "Impress", "Stand", "Save", "Drive", "Pick up", "Hope", "Find", "Sound", "Read", "Produce"
                , "Make ", "Become", "Fix"],
            5 => ["Guess", "Ask", "Come", "Offer", "Understand", "Pass ", "Value ", "Open ", "Fly ", "Consider ", "Apply"
                , "Pay", "Hear", "Ring", "Interrupt", "Shake", "Touch", "Help", "Appreciate", "Need", "Lift", "Help", "Mention"
                , "Happen", "Impress", "Choose", "Feel ", "Realize", "Take", "Throw", "Pretend ", "Waste ", "Try ", "Arrive", "Worry"
                , "Forget", "Thought", "Close", "Treat", "Tend", "Return", "Guide", "Break", "Start", "Finish", "Enjoy", "Practice"
                , "Build ", "Walk ", "Share"]
        ];

        foreach($lessons as $section_id => $items)
        {
            foreach($items as $description)
            {
                DB::table('lesson_items')->insert([
                    'lesson_id' => 1,
                    'section_id' => $section_id,
                    'description' => $description,
                    'question' => $description,
                ]);
            }
        }
    }
    
}