import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchBox.css';

const SearchBox = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  suggestions = [],
  showSuggestions = true,
  autoFocus = false,
  debounceMs = 300,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(value);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, onSearch, debounceMs]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e) => {
    if (!showSuggestions || !suggestions.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          onChange(suggestions[selectedIndex]);
          setIsFocused(false);
        }
        break;
      case 'Escape':
        setIsFocused(false);
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setIsFocused(false);
    inputRef.current?.focus();
  };

  return (
    <div className="search-box">
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search"
        />
        <FaSearch className="search-icon" aria-hidden="true" />
        {value && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && isFocused && (
        <div
          ref={suggestionsRef}
          className={`search-suggestions ${isFocused ? 'active' : ''}`}
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              {suggestion}
            </div>
          ))}
          {suggestions.length > 0 && (
            <div className="search-footer">
              {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''} available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  showSuggestions: PropTypes.bool,
  autoFocus: PropTypes.bool,
  debounceMs: PropTypes.number,
};

export default SearchBox;
