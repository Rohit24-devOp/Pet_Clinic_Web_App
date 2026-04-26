CREATE TABLE IF NOT EXISTS owners (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS pets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    breed VARCHAR(255),
    species VARCHAR(50),
    last_fed_at DATETIME,
    owner_id BIGINT,
    dtype VARCHAR(31) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dog (
    id BIGINT PRIMARY KEY,
    walk_schedule VARCHAR(255),
    training_notes TEXT,
    FOREIGN KEY (id) REFERENCES pets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cat (
    id BIGINT PRIMARY KEY,
    is_indoor BOOLEAN,
    grooming_schedule VARCHAR(255),
    FOREIGN KEY (id) REFERENCES pets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bird (
    id BIGINT PRIMARY KEY,
    cage_size VARCHAR(255),
    daily_flying_minutes INT,
    FOREIGN KEY (id) REFERENCES pets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS health_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pet_id BIGINT NOT NULL,
    type VARCHAR(50),
    date DATE,
    notes TEXT,
    next_due_date DATE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vet_appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pet_id BIGINT NOT NULL,
    date_time DATETIME,
    vet_name VARCHAR(255),
    reason TEXT,
    status VARCHAR(50),
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);
