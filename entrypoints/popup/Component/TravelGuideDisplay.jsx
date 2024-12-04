import React, { useState } from 'react';
import './TravelGuideDisplay.css';

const TravelGuideDisplay = ({ initialGuide, onSave, onCancel }) => {
  const [guide, setGuide] = useState(initialGuide || {
    title: 'My Travel Guide',
    attractions: '',
    itinerary: [
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
      attractions: e.target.value
    }));
  };

  const handleItineraryChange = (dayIndex, e) => {
    const newItinerary = [...guide.itinerary];
    newItinerary[dayIndex] = {
      ...newItinerary[dayIndex],
      activities: e.target.value
    };
    
    setGuide(prev => ({
      ...prev,
      itinerary: newItinerary
    }));
  };

  const addDay = () => {
    setGuide(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { 
          day: prev.itinerary.length + 1, 
          activities: '' 
        }
      ]
    }));
  };

  const removeDay = (dayIndex) => {
    setGuide(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, index) => index !== dayIndex)
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
      <div className="travel-guide-content">
        <div className="attractions-section">
          <h3>Attractions</h3>
          <textarea 
            value={guide.attractions} 
            onChange={handleAttractionsChange}
            className="attractions-textarea"
            placeholder="Describe interesting attractions in the area..."
          />
        </div>

        <div className="itinerary-section">
          <h3>Itinerary</h3>
          {guide.itinerary.map((dayPlan, index) => (
            <div key={index} className="day-plan">
              <div className="day-header">
                <h4>Day {dayPlan.day}</h4>
                {guide.itinerary.length > 1 && (
                  <button 
                    onClick={() => removeDay(index)}
                    className="remove-day-btn"
                  >
                    Remove Day
                  </button>
                )}
              </div>
              <textarea
                value={dayPlan.activities}
                onChange={(e) => handleItineraryChange(index, e)}
                className="day-activities-textarea"
                placeholder={`Describe activities for Day ${dayPlan.day}...`}
              />
            </div>
          ))}
          
          <button 
            onClick={addDay}
            className="add-day-btn"
          >
            + Add Day
          </button>
        </div>

        <div className="guide-actions">
          <button 
            onClick={() => onSave(guide)}
            className="save-btn"
          >
            Save Guide
          </button>
          <button 
            onClick={onCancel}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelGuideDisplay;