import React from 'react';
import HolidayForm from '../components/HolidayForm';

import { Link } from 'react-router-dom';
import { addHoliday } from '../Utility/HolidayService';

class HolidayFormPage extends React.Component {
    render() {
        return (
            <div>
                
                <nav>
                    <ul>
                        <li>
                            <Link to="/holiday" className="nav-link text-white px-0 align-middle">
                                <i className="fs-4 bi-calendar"></i> <span className="fs-5 fw-bolder d-none d-sm-inline">Holiday</span>
                            </Link>

                        </li>
                    </ul>
                </nav>
                <main>
                    <section>
                        <HolidayForm />
                    </section>
                    <section>
                        {/* Add other content here */}
                    </section>
                </main>
                <footer>
                    <p>&copy; {new Date().getFullYear()} Your Company</p>
                </footer>
            </div>
        );
    }
}

export default HolidayFormPage;