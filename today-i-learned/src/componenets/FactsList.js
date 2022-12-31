import React from 'react';
import FactListItem from './FactListItem';

const FactsList = ({ facts, CATEGORIES, setFacts }) => {
  if (facts.length === 0) {
    return <p className='message'>No facts for this category yet! create the first one 👌</p>;
  }
  return (
    <section className='facts-section'>
      <ul className='facts-list'>
        {facts.map((fact) => {
          return <FactListItem key={fact.id} fact={fact} setFacts={setFacts} CATEGORIES={CATEGORIES} />;
        })}
      </ul>
    </section>
  );
};

export default FactsList;
