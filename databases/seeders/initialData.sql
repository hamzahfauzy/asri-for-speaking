INSERT INTO lessons (name, description, icon) VALUES 
    ('Lesson 1', 'Verb', 'fas fa-running fa-fw lesson-number'),
    ('Lesson 2', 'Noun', 'fas fa-cube fa-fw lesson-number'),
    ('Lesson 3', 'Adjective', 'fas fa-paint-brush fa-fw lesson-number'),
    ('Lesson 4', 'Adverb', 'fas fa-bolt fa-fw lesson-number');

INSERT INTO sections (name, description, icon, number_of_session, record_type) VALUES 
    ('Identification of verb', 'Listening', 'fas fa-volume-up step-icon', 1, 'listening'),
    ('Notification of verb', 'Speaking', 'fas fa-microphone-alt step-icon', 1, 'speaking'),
    ('Description of verb', 'Explanation & speaking guide', 'fas fa-info-circle step-icon', 1, 'explanation'),
    ('Application of verb', 'Practice Task', 'fas fa-running step-icon', 1, 'practice'),
    ('Harmonization of verb', 'Final Practice', 'fas fa-file-invoice step-icon', 2, 'final practice');