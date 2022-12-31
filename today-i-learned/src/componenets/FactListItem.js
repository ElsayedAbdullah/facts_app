import React, { useState } from 'react';
import supabase from '../supabase';

const FactListItem = ({ fact, CATEGORIES, setFacts }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnVlaue) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnVlaue]: fact[columnVlaue] + 1 })
      .eq('id', fact.id)
      .select();

    setIsUpdating(false);

    if (!error) setFacts((facts) => facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)));
    else alert('there is something error 💥');
  }
  return (
    <li className='fact'>
      <p>
        {isDisputed ? <span className='disputed'>[⛔ Disputed]</span> : null}
        {fact.text}
        <a className='source' href={fact.source} rel='noreferrer' target='_blank'>
          (Source)
        </a>
      </p>
      <span className='tag' style={{ backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category).color }}>
        {fact.category}
      </span>
      <div className='vote-buttons'>
        <button onClick={() => handleVote('votesInteresting')} disabled={isUpdating}>
          👍 {fact.votesInteresting}
        </button>
        <button onClick={() => handleVote('votesMindblowing')} disabled={isUpdating}>
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
};

export default FactListItem;
