-- Insert Donors
INSERT INTO Donors (FName, LName, Address, Contact_Number, Email, Total_Donated_Amount) 
VALUES 
('John', 'Doe', 'New York', '9876543210', 'john.doe@example.com', 5000.00),
('Jane', 'Smith', 'California', '9876543211', 'jane.smith@example.com', 3000.00),
('Amit', 'Sharma', 'Mumbai', '9876543212', 'amit.sharma@example.com', 7000.00),
('Priya', 'Verma', 'Delhi', '9876543213', 'priya.verma@example.com', 4000.00),
('Rahul', 'Gupta', 'Bangalore', '9876543214', 'rahul.gupta@example.com', 6000.00),
('Sophia', 'Lee', 'Chicago', '9876543215', 'sophia.lee@example.com', 8000.00);

-- Insert Volunteers
INSERT INTO Volunteers (FName, LName, Date_Joined, Contact_Number, Email) 
VALUES 
('Michael', 'Johnson', '2023-01-10', '9876543216', 'michael.j@example.com'),
('Emma', 'Brown', '2023-02-15', '9876543217', 'emma.b@example.com'),
('Raj', 'Kumar', '2023-05-20', '9876543218', 'raj.kumar@example.com'),
('Neha', 'Singh', '2023-06-25', '9876543219', 'neha.singh@example.com'),
('David', 'Miller', '2023-07-30', '9876543220', 'david.miller@example.com'),
('Sara', 'Wilson', '2023-09-10', '9876543221', 'sara.wilson@example.com');

-- Insert Projects
INSERT INTO Projects (Project_Name, Description, Start_Date, End_Date, Status, Budget_Required, Budget_Raised) 
VALUES 
('Education for All', 'Providing free education to underprivileged children.', '2024-01-15', '2024-12-31', 'Ongoing', 500000.00, 200000.00),
('Healthcare Support', 'Free medical camps in rural areas.', '2024-03-10', '2025-03-10', 'Ongoing', 700000.00, 300000.00),
('Women Empowerment', 'Supporting women’s self-employment programs.', '2024-05-01', '2024-11-30', 'Ongoing', 600000.00, 250000.00),
('Environmental Awareness', 'Tree planting and sustainability initiatives.', '2024-06-15', '2025-06-15', 'Ongoing', 400000.00, 150000.00),
('Food for All', 'Providing meals for homeless and needy individuals.', '2024-08-01', '2025-07-31', 'Ongoing', 550000.00, 200000.00),
('Disaster Relief', 'Immediate aid for disaster-affected regions.', '2024-09-10', '2025-08-10', 'Ongoing', 750000.00, 300000.00);

-- Insert Donations
INSERT INTO Donations (DonorID, ProjectID, Amount, PayMode, Donation_Date) 
VALUES 
(1, 1, 2000.00, 'Online', '2024-02-01'),
(2, 2, 1500.00, 'Offline', '2024-03-01'),
(3, 3, 2500.00, 'Online', '2024-04-15'),
(4, 4, 1800.00, 'Offline', '2024-05-20'),
(5, 5, 3000.00, 'Online', '2024-06-10'),
(6, 6, 3500.00, 'Offline', '2024-07-05');

-- Insert Volunteer Participation
INSERT INTO Volunteer_Participation (VolunteerID, ProjectID, Hours_Worked, Role, Date_Joined) 
VALUES 
(1, 1, 100, 'Teacher', '2023-07-01'),
(2, 2, 80, 'Medical Assistant', '2023-09-05'),
(3, 3, 90, 'Trainer', '2023-10-12'),
(4, 4, 120, 'Coordinator', '2023-11-20'),
(5, 5, 110, 'Cook', '2023-12-15'),
(6, 6, 130, 'Rescue Worker', '2024-01-10');

-- Insert into Volunteer_SkillSet (Multivalued Table)
INSERT INTO Volunteer_SkillSet (VolunteerID, SkillSet) 
VALUES 
(1, 'Teaching'),
(1, 'Public Speaking'),
(2, 'Medical Assistance'),
(2, 'First Aid'),
(3, 'Training'),
(3, 'Counseling'),
(4, 'Event Coordination'),
(4, 'Sponsorship Management'),
(5, 'Cooking'),
(5, 'Logistics'),
(6, 'Rescue Operations'),
(6, 'Disaster Management');
