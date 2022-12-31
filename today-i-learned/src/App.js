import { useEffect, useState } from 'react';
import CategoryFilter from './componenets/CategoryFilter';
import FactsList from './componenets/FactsList';
import Header from './componenets/Header';
import Loader from './componenets/Loader';
import NewFactForm from './componenets/NewFactForm';
import './style.css';
import supabase from './supabase';

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' }
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(() => {
    // load data from API
    async function loadFacts() {
      try {
        setIsLoading(true);
        let query = supabase.from('facts').select('*');
        if (currentCategory !== 'all') query = query.eq('category', currentCategory);

        const { data: facts, error } = await query.order('votesInteresting', { ascending: false }).limit(1000);
        if (!error) setFacts(facts);
        else alert('There was a problem of getting data');
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadFacts();
  }, [currentCategory]);

  return (
    <div className='container'>
      <Header setIsShowForm={setShowForm} showForm={showForm} />
      {showForm && <NewFactForm CATEGORIES={CATEGORIES} setShowForm={setShowForm} setFacts={setFacts} />}
      <main className='main'>
        <CategoryFilter CATEGORIES={CATEGORIES} setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <FactsList facts={facts} CATEGORIES={CATEGORIES} setFacts={setFacts} />}
      </main>
    </div>
  );
}

export default App;
