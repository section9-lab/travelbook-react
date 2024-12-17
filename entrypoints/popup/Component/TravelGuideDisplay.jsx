import React, { useState } from 'react';
import './TravelGuideDisplay.css';

const TravelGuideDisplay = ({ initialGuide, onSave, onCancel }) => {
  const [guide, setGuide] = useState(initialGuide || {
    title: '',
    about: '',
    startTime:'',
    endTime:'',
    travels: [
      { day: 1, activities: '' }
    ]
  });

  const handleTitleChange = (e) => {
    setGuide(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleAttractionsChange = (e) => {
    setGuide(prev => ({
      ...prev,
      about: e.target.value
    }));
  };

  const handleTravelsChange = (dayIndex, e) => {
    const newTravels = [...guide.travels];

    console.info('====')
    console.info(newTravels)
    newTravels[dayIndex] = {
      ...newTravels[dayIndex],
      travel: e.target.value
    };
    
    setGuide(prev => ({
      ...prev,
      travels: newTravels
    }));
  };

  const addDay = () => {
    setGuide(prev => ({
      ...prev,
      travels: [
        ...prev.travels,
        { 
          day: prev.travels.length + 1, 
          travel: '' 
        }
      ]
    }));
  };

  const removeDay = (dayIndex) => {
    setGuide(prev => ({
      ...prev,
      travels: prev.travels.filter((_, index) => index !== dayIndex)
    }));
  };

  return (
    <div className="travel-guide-display-card">
      <div className="travel-guide-header">
        <input 
          type="text" 
          value={guide.title} 
          onChange={handleTitleChange}
          className="travel-guide-title"
        />
      </div>
      <img 
      src={guide.img_url}
      style={{
        width: "90%",
        height: "100px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
      />
      <div className="travel-guide-content">
        <div className="attractions-section">
          <h3>About</h3>
          <textarea 
            style={{height: '65px'}}
            value={guide.about} 
            onChange={handleAttractionsChange}
            className="attractions-textarea"
            placeholder="Describe interesting about in the area..."
          />
        </div>

        <div className="itinerary-section">
          <h3>Travels</h3>
          {Array.isArray(guide.travels) && guide.travels.map((dayPlan, index) => (
            <div key={index} className="day-plan">
              <div className="day-header">
                <h4>Day {dayPlan.day}</h4>
                {guide.travels.length > 1 && (
                  <button onClick={() => removeDay(index)} className="remove-day-btn">
                    Remove
                  </button>
                )}
              </div>
              <textarea
                value={dayPlan.travel}
                onChange={(e) => handleTravelsChange(index, e)}
                className="day-activities-textarea"
                placeholder={`Describe activities for Day ${dayPlan.day}...`}
              />
            </div>
          ))}
          
          <button onClick={addDay}className="add-day-btn">
            + Add Day
          </button>
        </div>

        <div className="guide-actions">

          <button onClick={() => onSave(guide)} className="save-btn">
            Save Guide
          </button>
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default TravelGuideDisplay;