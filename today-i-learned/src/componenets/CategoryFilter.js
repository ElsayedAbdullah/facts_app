import React from 'react';

const CategoryFilter = ({ CATEGORIES, setCurrentCategory }) => {
  return (
    <aside>
      <ul>
        <li className='category'>
          <button onClick={() => setCurrentCategory('all')} className='btn btn-all-categories'>
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li className='category' key={cat.name}>
            <button onClick={() => setCurrentCategory(cat.name)} className='btn btn-category' style={{ backgroundColor: cat.color }}>
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryFilter;
