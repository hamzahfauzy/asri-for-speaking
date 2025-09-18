-- Tabel Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    phone VARCHAR(20) DEFAULT NULL,
    gender ENUM('male', 'female') DEFAULT 'male',
    email VARCHAR(100) DEFAULT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    level ENUM('admin', 'teacher', 'student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Lessons
CREATE TABLE lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    icon VARCHAR(255)
);

-- Tabel Sections
CREATE TABLE sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    number_of_session INT DEFAULT 0,
    record_type ENUM('listening', 'speaking', 'explanation', 'practice', 'final practice') DEFAULT 'listening'
);

-- Tabel Lesson Items
CREATE TABLE lesson_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id INT NOT NULL,
    description TEXT,
    section_id INT,
    question TEXT,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL
);

-- Tabel Results
CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    section_id INT,
    total_value DECIMAL(10,2) DEFAULT 0,
    content_object JSON,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL
);
