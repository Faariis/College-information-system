-- Students table
CREATE TABLE Students (
    StudentID INT AUTO_INCREMENT PRIMARY KEY,
    RegistrationYear INT,
    Semester INT,
    IndexNumber VARCHAR(20) UNIQUE,
    JMBG VARCHAR(13),
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Gender VARCHAR(10),
    Email VARCHAR(100),
    Phone VARCHAR(20),
    DateOfBirth DATE,
    PlaceOfBirth VARCHAR(100),
    Address VARCHAR(200),
    UserType VARCHAR(20) DEFAULT 'student', 
    Password VARCHAR(255) 
);

-- Courses table
CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseCode VARCHAR(20) UNIQUE,
    CourseName VARCHAR(100),
    ECTSCredits INT
);

-- Enrollments table
CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY,
    StudentID INT,
    CourseID INT,
    Grade INT,
    ExamDate DATE,
    Semester INT,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- Announcements table
CREATE TABLE Announcements (
    AnnouncementID INT PRIMARY KEY,
    Title VARCHAR(100),
    Content TEXT,
    Date DATE
);

-- StudentsCourses junction table
CREATE TABLE StudentsCourses (
    StudentID INT,
    CourseID INT,
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- AdminsTeachers table
CREATE TABLE Admins (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    UserType VARCHAR(20) DEFAULT 'admin' NOT NULL
);
