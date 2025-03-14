CREATE TABLE Donors (
    DonorID INT PRIMARY KEY AUTO_INCREMENT,
    FName VARCHAR(100) NOT NULL,
    LName VARCHAR(100),
    Address TEXT NOT NULL,
    Contact_Number VARCHAR(20) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Total_Donated_Amount DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE Volunteers (
    VolunteerID INT PRIMARY KEY AUTO_INCREMENT,
    FName VARCHAR(100) NOT NULL,
    LName VARCHAR(100),
    Date_Joined DATE NOT NULL,
    Contact_Number VARCHAR(20) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY AUTO_INCREMENT,
    Project_Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Start_Date DATE NOT NULL,
    End_Date DATE,
    Status ENUM('Ongoing', 'Completed') DEFAULT 'Ongoing',
    Budget_Required DECIMAL(10,2) NOT NULL,
    Budget_Raised DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE Donations (
    DonationID INT PRIMARY KEY AUTO_INCREMENT,
    DonorID INT,
    ProjectID INT,
    Amount DECIMAL(10,2) NOT NULL,
    PayMode ENUM('Online', 'Offline') NOT NULL,
    Donation_Date DATE NOT NULL,
    FOREIGN KEY (DonorID) REFERENCES Donors(DonorID) ON DELETE CASCADE,
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID) ON DELETE CASCADE
);

CREATE TABLE Volunteer_Participation (
    ParticipationID INT PRIMARY KEY AUTO_INCREMENT,
    VolunteerID INT,
    ProjectID INT,
    Hours_Worked INT NOT NULL,
    Role VARCHAR(255),
    Date_Joined DATE NOT NULL,
    FOREIGN KEY (VolunteerID) REFERENCES Volunteers(VolunteerID) ON DELETE CASCADE,
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID) ON DELETE CASCADE
);

CREATE TABLE Volunteer_SkillSet (
    VolunteerID INT,
    SkillSet VARCHAR(255),
    PRIMARY KEY (VolunteerID, SkillSet),
    FOREIGN KEY (VolunteerID) REFERENCES Volunteers(VolunteerID) ON DELETE CASCADE
);
