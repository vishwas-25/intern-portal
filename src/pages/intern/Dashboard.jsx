import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

import Dashboardnavbar from '../../components/Dashboardnavbar';
import { useLanguage } from '../../contexts/LanguageContext'; 

const Dashboard = () => {
  const navbarHeight = 60;
  const { language } = useLanguage();

  
  const content = {
    en: {
      totalEmployees: 'Total Employees',
      joiningThisMonth: 'Joining this Month',
      leavingThisMonth: 'Leaving this Month',
      grade4Ratio: 'Grade 4 Ratio',
      grade3Ratio: 'Grade 3 Ratio',
      remoteWork: 'Remote Work',
      pendingBilling: 'Pending Billing',
      onboardEmployee: 'Onboard Employee',
      alert: 'Alert! (Check Project Section)',
      taskList: 'Task List',
      tasks: [
        { label: 'Procure materials for prototype', badge: 'TBT-1', badgeClass: 'bg-primary' },
        { label: 'Share out R&D test results', badge: 'TBT-2', badgeClass: 'bg-warning text-dark' },
        { label: 'Finalize Q3 development budget', badge: 'TBT-13', badgeClass: 'bg-success' },
      ],
    },
    hi: {
      totalEmployees: 'कुल कर्मचारी',
      joiningThisMonth: 'इस महीने शामिल हो रहे हैं',
      leavingThisMonth: 'इस महीने छोड़ रहे हैं',
      grade4Ratio: 'ग्रेड 4 अनुपात',
      grade3Ratio: 'ग्रेड 3 अनुपात',
      remoteWork: 'रिमोट कार्य',
      pendingBilling: 'लंबित बिलिंग',
      onboardEmployee: 'बोर्ड कर्मचारी',
      alert: 'चेतावनी! (परियोजना अनुभाग देखें)',
      taskList: 'कार्य सूची',
      tasks: [
        { label: 'प्रोटोटाइप के लिए सामग्री प्राप्त करें', badge: 'TBT-1', badgeClass: 'bg-primary' },
        { label: 'आर एंड डी परीक्षण परिणाम साझा करें', badge: 'TBT-2', badgeClass: 'bg-warning text-dark' },
        { label: 'Q3 विकास बजट को अंतिम रूप दें', badge: 'TBT-13', badgeClass: 'bg-success' },
      ],
    }
  };

  const lang = content[language];

  return (
    <>
      <div>
        <Dashboardnavbar />
       
      </div>

      <div
        className="dashboard-wrapper container-fluid"
        style={{ paddingTop: navbarHeight }}
      >
        <div className="row">
          {/* LEFT COLUMN */}
          <div className="col-md-8 d-flex flex-column align-items-start p-4 gap-4">
            {/* Total Employees */}
            <div className="total-employees card text-center p-4 w-100">
              <h2>
                {lang.totalEmployees.split(' ').map((word, idx) => (
                  <React.Fragment key={idx}>
                    {word}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
              <h1>5</h1>
            </div>

            {/* Info Cards Grid */}
            <div className="cards-grid d-flex flex-wrap gap-3 w-100">
              {[
                [lang.joiningThisMonth, '0'],
                [lang.leavingThisMonth, '1'],
                [lang.grade4Ratio, '20%'],
                [lang.grade3Ratio, '20%'],
                [lang.remoteWork, '3'],
                [lang.pendingBilling, '3'],
                [lang.onboardEmployee, '1'],
                [lang.alert, ''],
              ].map(([label, value], idx) => (
                <div
                  key={idx}
                  className={`info-card card text-center p-3 ${
                    label.startsWith(lang.alert.split(' ')[0]) ? 'text-white bg-danger' : ''
                  }`}
                  style={{ flex: '0 0 calc(25% - 12px)' }}
                >
                  {label}
                  <br />
                  {value && <strong>{value}</strong>}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-md-4 p-4">
            <div className="card shadow p-3">
              <h5 className="mb-3">{lang.taskList}</h5>
              <ul className="list-group">
                {lang.tasks.map(({ label, badge, badgeClass }, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {label}
                    <span className={`badge ${badgeClass}`}>{badge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;





