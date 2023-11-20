import React from 'react';
import Base from '../components/Base';

const AboutPage = () => {
    return (
        <Base>
            <div className="container" style={{ marginTop: '70px' }}>
                <h2>About HR Management System</h2>
                <p>
                    The HR Management System is a comprehensive software solution designed to streamline and automate various HR processes within the organization. It provides a centralized platform for managing employee information, attendance, leaves, policies, and more.
                </p>
                <h3>Key Features</h3>
                <ul>
                    <li>Employee Management: Maintain a database of employees with their personal details, contact information, and employment history.</li>
                    <li>Attendance Tracking: Keep track of employee attendance, including clock-in/out times and attendance reports.</li>
                    <li>Leave Management: Manage employee leave requests, track available leave balances, and generate leave reports.</li>
                    <li>Organization Structure: Define departments, positions, and hierarchies within the organization.</li>
                    <li>Policy Management: Create and manage company policies, including code of conduct, leave policies, and more.</li>
                    <li>Performance Evaluation: Conduct performance appraisals, set goals, and track employee performance over time.</li>
                    <li>Salary and Compensation: Calculate and manage employee salaries, allowances, and deductions.</li>
                    <li>Document Management: Store and organize employee-related documents securely.</li>
                </ul>
                <h3>Benefits of HR Management System</h3>
                <ul>
                    <li>Efficiency: Automate manual HR processes, saving time and effort.</li>
                    <li>Accuracy: Ensure accurate and up-to-date employee data and records.</li>
                    <li>Compliance: Stay compliant with labor laws and regulations.</li>
                    <li>Data Security: Maintain data privacy and protect sensitive employee information.</li>
                    <li>Improved Decision-Making: Access relevant HR data and analytics to make informed decisions.</li>
                    <li>Employee Self-Service: Empower employees to manage their own information, leave requests, and more.</li>
                </ul>
                <p>
                    The HR Management System is designed to enhance HR operations, increase efficiency, and improve overall workforce management within the organization. It enables HR professionals to focus on strategic initiatives and effectively support the needs of employees and the organization.
                </p>
            </div>
        </Base>
    );
};

export default AboutPage;
