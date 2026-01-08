-- Create players table
CREATE TABLE players (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    experience INT DEFAULT 0,
    position VARCHAR(50) NOT NULL,
    skill INT NOT NULL CHECK (skill >= 1 AND skill <= 10),
    credits INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create teams table for AI training data
CREATE TABLE teams (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    players JSON NOT NULL,
    total_credits INT DEFAULT 0,
    performance_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);