-- Create pricing rules table for dynamic weather-based pricing
CREATE TABLE pricing_rules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    turf_id BIGINT NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 1000.00,
    weather_condition ENUM('perfect', 'normal', 'cloudy', 'rainy', 'hot', 'cold') NOT NULL,
    price_multiplier DECIMAL(3, 2) NOT NULL DEFAULT 1.00,
    time_slot VARCHAR(20) NOT NULL, -- e.g., 'morning', 'afternoon', 'evening'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (turf_id) REFERENCES Turf(id) ON DELETE CASCADE
);

-- Insert sample pricing rules
INSERT INTO pricing_rules (turf_id, base_price, weather_condition, price_multiplier, time_slot) VALUES
(1, 1000.00, 'perfect', 1.20, 'morning'),
(1, 1000.00, 'normal', 1.00, 'morning'),
(1, 1000.00, 'cloudy', 0.90, 'morning'),
(1, 1000.00, 'rainy', 0.70, 'morning'),
(1, 1000.00, 'hot', 0.80, 'afternoon'),
(1, 1000.00, 'cold', 0.80, 'evening');

-- Create booking slots table with dynamic pricing
CREATE TABLE booking_slots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    turf_id BIGINT NOT NULL,
    date DATE NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    original_price DECIMAL(10, 2) NOT NULL,
    dynamic_price DECIMAL(10, 2) NOT NULL,
    weather_condition VARCHAR(20),
    is_booked BOOLEAN DEFAULT FALSE,
    booked_by BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (turf_id) REFERENCES Turf(id) ON DELETE CASCADE
);