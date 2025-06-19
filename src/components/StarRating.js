// src/components/StarRating.js
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(null);

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={starValue}>
            <input
              type="radio"
              name="rating"
              value={starValue}
              style={{ display: 'none' }}
              onClick={() => setRating(starValue)}
            />
            <FaStar
              size={28}
              color={starValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
