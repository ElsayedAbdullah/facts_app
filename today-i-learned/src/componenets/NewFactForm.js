import { useState } from 'react';
import supabase from '../supabase';

// check if a string is a URL
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

const NewFactForm = ({ CATEGORIES, setShowForm, setFacts }) => {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  const handleSubmit = async (e) => {
    // 1.prevent browser reload
    e.preventDefault();
    // 2.check the if the data is valid
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      // 3.create new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase.from('facts').insert([{ text, source, category }]).select();
      setIsUploading(false);

      // 4. add the new fact to facts
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      else alert('there is a problem with uploading fact');

      // 5.empty fields
      setText('');
      setSource('');
      setCategory('');

      // 6.hide form
      setShowForm(false);
    }
  };
  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      <input type='text' value={text} placeholder='Share a fact with the world...' onChange={(e) => setText(e.target.value)} maxLength='200' disabled={isUploading} autoFocus />
      <span>{200 - textLength}</span>
      <input type='text' placeholder='https://www.example.com' value={source} onChange={(e) => setSource(e.target.value)} disabled={isUploading} />
      <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={isUploading}>
        <option value=''>Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large' disabled={isUploading}>
        Post
      </button>
    </form>
  );
};

export default NewFactForm;
